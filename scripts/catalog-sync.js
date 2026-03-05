const fs = require("fs");
const path = require("path");
const cp = require("child_process");

const WORKSPACE_DIR = path.resolve(__dirname, "..");
const PNPM_WORKSPACE_YAML = path.join(WORKSPACE_DIR, "pnpm-workspace.yaml");

const directoriesToScan = ["apps", "packages"];

function getPackageJsonPaths() {
  const paths = [];
  for (const dirName of directoriesToScan) {
    const dirPath = path.join(WORKSPACE_DIR, dirName);
    if (!fs.existsSync(dirPath)) continue;

    const items = fs.readdirSync(dirPath);
    for (const item of items) {
      const itemPath = path.join(dirPath, item);
      if (fs.statSync(itemPath).isDirectory()) {
        const pkgJsonPath = path.join(itemPath, "package.json");
        if (fs.existsSync(pkgJsonPath)) {
          paths.push(pkgJsonPath);
        }
      }
    }
  }
  return paths;
}

function run() {
  console.log("Scanning for hardcoded dependencies in apps/ and packages/ ...");
  const pkgPaths = getPackageJsonPaths();

  let yamlContent = fs.readFileSync(PNPM_WORKSPACE_YAML, "utf8");

  // Very simplistic parsing to find existing catalog items just so we don't accidentally add duplicates
  // This extracts the lines under 'catalog:'
  const existingCatalogLines = yamlContent.split("\n");
  const existingDeps = new Set();
  let inCatalog = false;

  for (const line of existingCatalogLines) {
    if (line.startsWith("catalog:")) {
      inCatalog = true;
      continue;
    }
    // if an unindented line is found, we might be out of catalog block, but let's just grab anything that looks like a mapped key
    if (
      (inCatalog && line.trim().startsWith('"')) ||
      (inCatalog && line.includes(":") && line.startsWith("  "))
    ) {
      const parts = line.split(":");
      let key = parts[0].trim();
      if (key.startsWith('"') && key.endsWith('"')) {
        key = key.slice(1, -1);
      } else if (key.startsWith("'") && key.endsWith("'")) {
        key = key.slice(1, -1);
      }
      existingDeps.add(key);
    }
  }

  const newCatalogEntries = {};
  let packageJsonUpdates = 0;

  for (const pkgPath of pkgPaths) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
    let changed = false;

    for (const depType of [
      "dependencies",
      "devDependencies",
      "peerDependencies",
    ]) {
      if (!pkg[depType]) continue;

      for (const [name, version] of Object.entries(pkg[depType])) {
        // Skip workspace references, file references, or if it's already using catalog
        if (
          version.startsWith("workspace:") ||
          version.startsWith("file:") ||
          version.startsWith("github:") ||
          version === "catalog:"
        ) {
          continue;
        }

        // We found a hardcoded dependency!
        console.log(
          `Found hardcoded dependency in ${path.relative(WORKSPACE_DIR, pkgPath)}: ${name}@${version}`
        );

        // Add to our new entries map (always take the latest one encountered for simplicity if multiple)
        if (!existingDeps.has(name) || !yamlContent.includes(`"${name}":`)) {
          newCatalogEntries[name] = version;
        }

        // Overwrite to use catalog:
        pkg[depType][name] = "catalog:";
        changed = true;
      }
    }

    if (changed) {
      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
      packageJsonUpdates++;
    }
  }

  const entriesCount = Object.keys(newCatalogEntries).length;

  if (entriesCount > 0) {
    console.log(
      `\nAdding ${entriesCount} new dependencies to pnpm-workspace.yaml...`
    );

    // Find where the catalog: block starts and append to it
    // For a simple script, we just assume `catalog:` is at the end or we can just append if it's the last section.
    // To be safe, let's inject it right after the `catalog:` line.

    const lines = yamlContent.split("\n");
    const catalogIndex = lines.findIndex((l) => l.trim() === "catalog:");

    if (catalogIndex !== -1) {
      const sortedNames = Object.keys(newCatalogEntries).sort();
      const insertLines = sortedNames.map((name) => {
        let val = newCatalogEntries[name];
        if (val.includes("*") || val.includes("^") || val.includes("~")) {
          val = `"${val}"`;
        }
        return `  "${name}": ${val}`;
      });

      lines.splice(catalogIndex + 1, 0, ...insertLines);
      fs.writeFileSync(PNPM_WORKSPACE_YAML, lines.join("\n"));
    } else {
      console.error(
        'Could not find "catalog:" block in pnpm-workspace.yaml. Please ensure it exists.'
      );
    }
  } else {
    console.log("\nNo new dependencies to add to catalog.");
  }

  if (packageJsonUpdates > 0) {
    console.log(`\nFixed ${packageJsonUpdates} package.json files.`);
    console.log("Running pnpm install to apply changes...\n");
    try {
      cp.execSync("pnpm install", { cwd: WORKSPACE_DIR, stdio: "inherit" });
      console.log("\n✅ Sync complete!");
    } catch (err) {
      console.error("Failed to run pnpm install", err);
    }
  } else {
    console.log("\n✅ Everything is already synced!");
  }
}

try {
  run();
} catch (err) {
  console.error(err);
  process.exit(1);
}
