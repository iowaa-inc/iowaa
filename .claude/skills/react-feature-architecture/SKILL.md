---
name: react-feature-architecture
description: >
  Enforces feature-based architecture and clean component patterns for React/Next.js projects.
  Use this skill whenever you are working on any React or Next.js project — creating components,
  planning folder structure, scaffolding features, organizing files, or writing any .tsx/.jsx files.
  Trigger even for small tasks like "add a button" or "create a form", since correct classification
  (feature vs shared component) affects where the file goes and how it's structured. Also trigger
  when the user asks "where should I put this?", "how should I structure X?", or "is this a feature
  or a component?". Do NOT skip this skill just because the task seems simple — consistent
  architecture decisions compound over time and bad early choices are costly to fix.
---

# React Feature-Based Architecture

## Core Principle
Organize files by **what they do** (feature/domain), not **what they are** (file type).

---

## Folder Structure

```
src/
├── app/                        # Next.js App Router — URL structure only
│   ├── layout.tsx
│   ├── page.tsx
│   ├── (marketing)/            # Route groups — parentheses = no URL segment
│   │   ├── about/
│   │   └── pricing/
│   ├── (app)/                  # Protected/dashboard routes
│   │   ├── dashboard/
│   │   │   └── _components/    # Private route-level components
│   │   └── settings/
│   └── (auth)/
│       ├── login/
│       └── register/
│
├── components/                 # Shared "Lego blocks" — used everywhere
│   ├── ui/                     # Generic: Button, Input, Modal, Badge, Card
│   └── layout/                 # Header, Footer, Sidebar
│
├── features/                   # Feature modules — the heart of the app
│   ├── auth/
│   │   ├── components/         # LoginForm, SignupForm
│   │   ├── hooks/              # useAuth
│   │   ├── actions.ts          # Server actions
│   │   └── index.ts            # Barrel export (public API)
│   ├── billing/
│   │   ├── components/         # PricingTable, CreditCardForm
│   │   └── types.ts
│   └── [feature-name]/         # Add new features here — never pollute existing folders
│
├── hooks/                      # Shared global hooks (useTheme, useWindowSize)
├── lib/                        # Global utilities
│   ├── db.ts
│   └── utils.ts
└── styles/
```

---

## Feature vs. Shared Component — Decision Rules

### Put it in `features/` if ANY of these are true:
1. **Delete Test**: Deleting it leaves the rest of the app functional (it's optional business logic)
2. **Noun Test**: Named after a business concept (`Cart`, `Profile`, `Search`) not a technical term (`Forms`, `Hooks`)
3. **Complexity Test**: Needs its own API call + UI component + hook (multiple moving parts)
4. **Page Section Test**: Dominates a page or IS a page (Login Form, Pricing Table)
5. **Team Test**: You could tell a freelancer "work exclusively on the X" with clear scope

### Put it in `components/ui` if:
- It's generic and reusable across any feature (Button, Modal, Card, Badge)
- It only handles appearance — no business logic, no data fetching
- It doesn't know what's inside it (a Modal doesn't know its content)

### Quick Cheat Sheet

| Item | Where | Why |
|------|-------|-----|
| "Add to Cart" Button | `features/cart/` | Contains cart-specific logic |
| Blue Submit Button | `components/ui/` | Dumb — just styling, no logic |
| User Settings Form | `features/settings/` | Knows user data + how to save |
| Modal / Pop-up | `components/ui/` | Container only — no business logic |
| Comment Section | `features/comments/` | Fetches, displays, allows replies |

**Summary Rule:**
- Handles **data** (fetching, saving, business logic) → `features/`
- Handles **looks** (styling, layout, animation only) → `components/`

---

## Component Implementation Patterns

### Pattern 1: Hooks as Logic (Required)
Extract all complex logic into custom hooks. JSX describes *what* to render, hooks handle *how*.

```tsx
// ❌ WRONG — mixed logic and UI
const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('/api/user').then(d => d.json()).then(data => {
      setUser(data); setLoading(false);
    });
  }, []);
  if (loading) return <div>Loading...</div>;
  return <div>{user.name}</div>;
};

// ✅ CORRECT — logic in hook, JSX stays clean
import { useUser } from './hooks/useUser';
const UserProfile = () => {
  const { user, isLoading, isError } = useUser();
  if (isLoading) return <Spinner />;
  if (isError) return <ErrorMessage />;
  return <div className="profile-card">{user.name}</div>;
};
```

### Pattern 2: Clean Component File Structure
```tsx
// 📁 src/features/products/components/ProductCard.tsx

import { memo } from 'react';
import { formatCurrency } from '@/utils/currency';
import { useAddToCart } from '../hooks/useAddToCart';

// 1. Define props interface
interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

// 2. Named export (not default)
export const ProductCard = memo(({ id, name, price, imageUrl }: ProductCardProps) => {
  // 3. Logic from hooks only
  const { addToCart, isAdding } = useAddToCart(id);

  // 4. Handler functions named handleX
  const handleAddToCart = () => { addToCart(); };

  return (
    <div className="product-card">
      <img src={imageUrl} alt={name} loading="lazy" />
      <h3>{name}</h3>
      <span>{formatCurrency(price)}</span>
      <button onClick={handleAddToCart} disabled={isAdding}>
        {isAdding ? 'Adding...' : 'Add to Cart'}
      </button>
    </div>
  );
});

// 5. Display name for debugging
ProductCard.displayName = 'ProductCard';
```

### Pattern 3: Barrel Exports (Public API)
Each feature exposes only what others need via `index.ts`:

```ts
// src/features/auth/index.ts
export { LoginForm } from './components/LoginForm';
export { useAuth } from './hooks/useAuth';
export type { User, AuthState } from './types';
// Internal helpers are NOT exported — they stay private to the feature
```

Usage:
```ts
// ✅ Clean import via barrel
import { LoginForm, useAuth } from '@/features/auth';

// ❌ Avoid deep imports into a feature's internals
import { LoginForm } from '@/features/auth/components/LoginForm';
```

---

## Clean Code Checklist

Apply when writing or reviewing any component:

- [ ] **One responsibility**: Component renders one logical thing
- [ ] **Logic in hooks**: No `useEffect`/`fetch` directly in component body
- [ ] **Named export**: `export const X` not `export default X`
- [ ] **Props destructured** in function signature
- [ ] **No nested ternaries**: Use guard clauses (early returns) instead
- [ ] **Event props**: named `onAction` (e.g. `onClick`, `onSubmit`)
- [ ] **Event handlers**: named `handleAction` (e.g. `handleClick`, `handleSubmit`)
- [ ] **Boolean shorthand**: `<Card isActive />` not `<Card isActive={true} />`
- [ ] **No prop drilling 3+ levels**: Use Context or composition (`children`) instead
- [ ] **`memo()` for expensive pure components**
- [ ] **`displayName` set** on memoized components

---

## Adding a New Feature — Step-by-Step

1. Create `src/features/[feature-name]/` folder
2. Add subfolders as needed: `components/`, `hooks/`, `actions.ts`, `types.ts`
3. Build components following the clean component pattern above
4. Create `index.ts` barrel to expose the public API
5. Import from the barrel in route files under `app/`
6. Never reach into another feature's internals — only use its barrel export

---

## Route Groups (Next.js App Router)

Folders wrapped in `()` organize code without affecting URLs:
- `(marketing)/about/` → URL: `/about`
- `(app)/dashboard/` → URL: `/dashboard`
- `(auth)/login/` → URL: `/login`

Private components for a single route live in `_components/` inside that route folder.
They are NOT shared — if reused elsewhere, move them to `features/`.