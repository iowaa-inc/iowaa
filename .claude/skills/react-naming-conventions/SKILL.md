---
name: react-naming-conventions
description: Enforces industry-standard React component naming patterns to avoid "naming fatigue" (excessively long names like `UserDashboardSettingsProfileCard.tsx`). Use this skill whenever you are naming, creating, organizing, or refactoring React components in any active project — even for small tasks like "add a component" or "create a modal". Trigger especially when file/folder structure is being discussed, when component names feel long or repetitive, or when the user asks how to organize their components. The golden rule is clarity over brevity, but this skill provides 4 concrete strategies to achieve both.
---

# React Component Naming Conventions

The **Golden Rule**: Clarity over brevity — a long name is better than a vague one. But use the 4 strategies below to keep names both clear *and* short.

---

## Strategy 1: Directory as Namespace (Index Files)

Use folder structure to provide context instead of cramming it into filenames.

```text
// ❌ Before
components/
  └── UserProfileDashboardCard.tsx

// ✅ After
components/
  └── UserProfile/
      ├── index.tsx         ← public export (re-exports UserProfile.tsx)
      ├── UserProfile.tsx   ← main component (named file avoids confusing tabs)
      ├── Header.tsx        ← short name, scoped to this folder
      ├── Avatar.tsx        ← short name, scoped to this folder
      └── hooks.ts
```

**When to use:** Complex widgets or feature components with multiple sub-parts.

**Trade-off:** 50 files named `index.tsx` confuses editor tabs. Fix: use `UserProfile.tsx` inside the folder, re-export from `index.tsx`.

---

## Strategy 2: Compound Components (Dot Notation)

Bundle related sub-components as properties of the main component. Best for reusable UI library components.

```tsx
// ❌ Before — pollutes global namespace
<ModalHeader />
<ModalBody />
<ModalFooter />

// ✅ After — one import, dot notation
<Modal>
  <Modal.Header>Title</Modal.Header>
  <Modal.Body>Content</Modal.Body>
  <Modal.Footer>...</Modal.Footer>
</Modal>
```

**Implementation:**
```tsx
const Modal = ({ children }) => <div className="modal">{children}</div>;
Modal.Header = ({ children }) => <header>{children}</header>;
Modal.Body   = ({ children }) => <main>{children}</main>;
export default Modal;
```

**When to use:** Buttons, Cards, Modals, Tables, Tabs — any reusable UI component with sub-parts.

---

## Strategy 3: Feature-Scoped Colocation (Containers)

Keep page-specific components inside their page folder using a `_components/` directory. This allows short names without global collisions.

```text
app/
  └── dashboard/
      ├── page.tsx                  ← container/page
      └── _components/              ← private to this feature
          ├── StatsGrid.tsx         ← short name, safe because colocated
          └── RecentActivity.tsx
```

**When to use:** Any component only used by a single page or feature. If it's only used in Dashboard, it should NOT live in the global `components/` folder.

**Why it works:** `StatsGrid` is fine here because it's isolated. In the global folder, it would need to be `DashboardStatsGrid` to avoid collisions.

---

## Strategy 4: Suffix Standardization

When you must differentiate between a component's logic and its UI:

| Type | Convention | Example |
|------|-----------|---------|
| Container (Logic) | `[Entity]Container` or just `[Entity]` | `UserProfile.tsx` |
| Presentational (UI) | `[Entity]View` or `[Entity]Layout` | `UserProfileView.tsx` |
| Base/Primitive UI | `Base[Name]` or `[Name]Base` | `BaseButton.tsx` |

---

## Quick Reference: Which Strategy to Use

| What you're building | Strategy |
|---------------------|----------|
| UI Library (Buttons, Modals, Cards) | **Compound Components** — `Card.Title` not `CardTitle` |
| Page-specific feature component | **Colocation** — put it in `app/feature/_components/` |
| Complex widget with many parts | **Directory Namespace** — `VideoPlayer/Controls.tsx` |
| Logic vs. UI split needed | **Suffix** — `UserProfileView.tsx` |

---

## Enforcement Checklist

When naming or organizing a component, ask:

1. **Is this only used in one feature/page?** → Colocate it in `_components/`
2. **Does it have multiple sub-parts that are always used together?** → Consider Compound Pattern
3. **Is the name getting long (3+ words)?** → Extract to a folder, shorten filename
4. **Is this a global UI primitive?** → Use `Base` prefix or Compound pattern
5. **Never** create `UserDashboardSettingsProfileCard.tsx` — break it up first