---
name: react-naming-conventions
description: "Enforces strict naming conventions for React.js and Next.js projects: kebab-case for all file and folder names, and SCREAMING_SNAKE_CASE for environment variables and constants. Use this skill whenever you are creating, editing, scaffolding, reviewing, or refactoring any files in a React or Next.js project — even for small tasks like 'add a component', 'create a utility function', 'add an env variable', or 'set up a constants file'. Also trigger when the user asks about naming files, folders, constants, or env vars in any React/Next.js context. Do NOT let incorrect naming slip through; always correct violations proactively."
---

# React / Next.js Naming Conventions Skill

This skill enforces two core naming conventions throughout React and Next.js projects:

1. **kebab-case** — for all files and folders
2. **SCREAMING_SNAKE_CASE** — for environment variables and constants

Always apply these rules. Proactively flag and correct violations without waiting to be asked.

---

## Convention 1: kebab-case for Files & Folders

### Rule

Every file and folder in the project **must** use `kebab-case`:

- All lowercase letters
- Words separated by hyphens (`-`)
- No spaces, underscores, PascalCase, or camelCase in file/folder names

### Applies To

| Type             | Correct ✅                  | Incorrect ❌                                                      |
| ---------------- | --------------------------- | ----------------------------------------------------------------- |
| React components | `user-profile.tsx`          | `UserProfile.tsx`, `userProfile.tsx`                              |
| Pages (Next.js)  | `about-us.tsx`              | `AboutUs.tsx`, `about_us.tsx`                                     |
| Hooks            | `use-auth.ts`               | `useAuth.ts`, `UseAuth.ts`                                        |
| Utilities        | `format-date.ts`            | `formatDate.ts`, `FormatDate.ts`                                  |
| Context files    | `auth-context.tsx`          | `AuthContext.tsx`                                                 |
| API routes       | `get-user.ts`               | `getUser.ts`                                                      |
| Stylesheets      | `button-styles.css`         | `ButtonStyles.css`, `buttonStyles.css`                            |
| Test files       | `user-card.test.tsx`        | `UserCard.test.tsx`                                               |
| Config files     | `next-config.js`            | `nextConfig.js` _(follow framework default for `next.config.js`)_ |
| Folders/dirs     | `components/user-settings/` | `components/UserSettings/`                                        |
| Index files      | `index.ts`                  | _(no change needed)_                                              |

### Special Cases

- **`next.config.js`**, **`tailwind.config.js`**, **`jest.config.js`** — framework-mandated filenames are exempt. Don't rename them.
- **`README.md`**, **`LICENSE`** — uppercase convention is standard; leave them.
- **`_app.tsx`**, **`_document.tsx`** — Next.js Pages Router special files with underscores are exempt.
- **Dynamic route segments** in Next.js App Router like `[slug]` or `(auth)` — keep brackets/parens but use kebab-case inside: `[user-id]`, `(auth-group)`.

### Component Name vs. File Name

The **file** uses kebab-case, but the **exported React component** inside uses PascalCase. This is intentional and correct:

```tsx
// ✅ File: user-profile-card.tsx
export default function UserProfileCard() {
  return <div>...</div>;
}
```

```tsx
// ❌ File: UserProfileCard.tsx  ← wrong file name
export default function UserProfileCard() { ... }
```

### Import Paths

When importing, use the kebab-case path:

```tsx
// ✅ Correct
import UserProfileCard from "@/components/user-profile-card";
import { formatDate } from "@/utils/format-date";

// ❌ Incorrect
import UserProfileCard from "@/components/UserProfileCard";
```

---

## Convention 2: SCREAMING_SNAKE_CASE for Env Vars & Constants

### Rule

All environment variables and module-level constants **must** use `SCREAMING_SNAKE_CASE`:

- All uppercase letters
- Words separated by underscores (`_`)
- No camelCase, PascalCase, or kebab-case

### Environment Variables

```bash
# ✅ .env / .env.local — Correct
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_STRIPE_KEY=pk_live_...
DATABASE_URL=postgresql://...
AUTH_SECRET=supersecretkey
REDIS_HOST=localhost
MAX_RETRY_ATTEMPTS=3

# ❌ Incorrect
nextPublicApiUrl=https://api.example.com
next-public-api-url=https://api.example.com
NextPublicApiUrl=https://api.example.com
```

**Next.js prefix rule**: Public env vars must still start with `NEXT_PUBLIC_`. The SCREAMING_SNAKE_CASE rule applies to the whole name including the prefix.

### Constants in Code

```ts
// ✅ File: constants/api-config.ts — Correct
export const MAX_RETRIES = 3;
export const API_TIMEOUT_MS = 5000;
export const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
export const DEFAULT_PAGE_SIZE = 20;
export const SUPPORTED_LOCALES = ["en", "fr", "de"] as const;

// ❌ Incorrect
export const maxRetries = 3;
export const apiTimeoutMs = 5000;
export const baseApiUrl = process.env.NEXT_PUBLIC_API_URL ?? "";
```

```ts
// ✅ Feature flags, status codes, roles
export const USER_ROLES = {
  ADMIN: "admin",
  EDITOR: "editor",
  VIEWER: "viewer",
} as const;

export const HTTP_STATUS = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
} as const;

// ❌ Incorrect
export const userRoles = { admin: "admin" };
export const HttpStatus = { ok: 200 };
```

### Where Constants Live

Place shared constants in a dedicated file using kebab-case naming (applying Convention 1):

```
src/
  constants/
    api-config.ts        ✅
    auth-constants.ts    ✅
    route-paths.ts       ✅
    ApiConfig.ts         ❌
    authConstants.ts     ❌
```

### What Counts as a "Constant"

Apply SCREAMING_SNAKE_CASE to:

- Module-level `const` values that are fixed/static (not derived at runtime per call)
- Named regex patterns used as constants: `const EMAIL_REGEX = /^.../`
- String literals used as identifiers or keys: `const COOKIE_NAME = 'session'`
- Numeric thresholds/limits: `const MAX_FILE_SIZE_MB = 10`

Do **not** apply SCREAMING_SNAKE_CASE to:

- Regular variables inside functions (use camelCase)
- React component props or state (use camelCase)
- Object keys in general (unless they represent status/enum values)
- TypeScript type/interface names (use PascalCase)

---

## Enforcement Checklist

When writing or reviewing any React/Next.js code, run through this checklist:

### Files & Folders

- [ ] All new files use kebab-case
- [ ] All new folders use kebab-case
- [ ] Component file names are kebab-case even though the component export is PascalCase
- [ ] Import paths reflect the kebab-case file names
- [ ] Framework-mandated filenames (next.config.js, etc.) are left unchanged

### Env Vars & Constants

- [ ] All `.env*` variable names are SCREAMING_SNAKE_CASE
- [ ] All module-level constants in `.ts`/`.tsx` files are SCREAMING_SNAKE_CASE
- [ ] Constants are grouped into dedicated `constants/` files with kebab-case names
- [ ] `NEXT_PUBLIC_` prefix is used for client-accessible env vars, still in SCREAMING_SNAKE_CASE

---

## Common Violations & Fixes

| Violation                     | Fix                              |
| ----------------------------- | -------------------------------- |
| `components/UserCard.tsx`     | → `components/user-card.tsx`     |
| `hooks/useAuth.ts`            | → `hooks/use-auth.ts`            |
| `utils/formatDate.ts`         | → `utils/format-date.ts`         |
| `const apiBaseUrl = '...'`    | → `const API_BASE_URL = '...'`   |
| `NEXT_PUBLIC_apiKey=...`      | → `NEXT_PUBLIC_API_KEY=...`      |
| `export const maxRetries = 3` | → `export const MAX_RETRIES = 3` |
| `pages/AboutUs.tsx`           | → `pages/about-us.tsx`           |
| `store/authSlice.ts`          | → `store/auth-slice.ts`          |

---

## Example: Correct Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── sign-up/
│   │       └── page.tsx
│   ├── dashboard/
│   │   └── page.tsx
│   └── layout.tsx
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── input-field.tsx
│   │   └── modal-dialog.tsx
│   ├── user-profile-card.tsx
│   └── navigation-bar.tsx
├── hooks/
│   ├── use-auth.ts
│   ├── use-debounce.ts
│   └── use-local-storage.ts
├── lib/
│   ├── api-client.ts
│   └── auth-helpers.ts
├── constants/
│   ├── api-config.ts          ← contains MAX_RETRIES, API_TIMEOUT_MS, etc.
│   ├── route-paths.ts         ← contains DASHBOARD_ROUTE, LOGIN_ROUTE, etc.
│   └── auth-constants.ts      ← contains SESSION_COOKIE_NAME, TOKEN_EXPIRY_MS, etc.
├── utils/
│   ├── format-date.ts
│   └── validate-email.ts
└── types/
    └── user-types.ts

.env.local:
  NEXT_PUBLIC_API_URL=...
  NEXT_PUBLIC_STRIPE_KEY=...
  DATABASE_URL=...
  AUTH_SECRET=...
```

---

## Quick Reference

| Context                   | Convention           | Example                  |
| ------------------------- | -------------------- | ------------------------ |
| File names                | kebab-case           | `user-profile-card.tsx`  |
| Folder names              | kebab-case           | `user-settings/`         |
| React component (export)  | PascalCase           | `UserProfileCard`        |
| Function/variable (local) | camelCase            | `const userName = ...`   |
| Module-level constant     | SCREAMING_SNAKE_CASE | `const MAX_RETRIES = 3`  |
| Environment variable      | SCREAMING_SNAKE_CASE | `NEXT_PUBLIC_API_URL`    |
| TypeScript type/interface | PascalCase           | `type UserProfile = ...` |
