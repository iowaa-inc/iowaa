---
name: react-component-architecture
description: >
  Enforces a structured mental model for classifying and building React components in modern projects,
  especially Next.js (App Router). Use this skill whenever you are working on any React or Next.js
  project — creating components, reviewing architecture, planning features, structuring folders,
  or writing any .tsx/.jsx files. Trigger even for small tasks like "add a button" or "create a form",
  since correct classification (Server vs Client, Presentational vs Container, Identity vs Strategy)
  affects implementation decisions. Do not skip this skill just because the task seems simple.
---

# React Component Architecture

Every component you write or review must be classified along **three axes**. Apply this mental model before writing any code.

---

## Axis 1: Construct (How it's built)

| Type | Description | Marker |
|---|---|---|
| **Functional Component** | JS/TS function returning JSX, uses Hooks | Default in all React apps |
| **Server Component (RSC)** | Renders on server only. Can access DB/filesystem. No hooks, no browser events. | Default in Next.js 13+ App Router |
| **Client Component** | Renders in browser. Can use hooks, event listeners. | Must have `'use client'` at top of file |

**Rule:** In Next.js App Router, assume Server Component unless the component needs interactivity, hooks, or browser APIs — then add `'use client'`.

---

## Axis 2: Purpose (What it does)

- **Presentational ("Dumb")** — Only renders UI. Receives everything via props. No fetching, no logic. Examples: `Button`, `Card`, `Navbar`.
- **Container ("Smart")** — Fetches data, manages state, handles logic. Passes data down to Presentational components. Example: `UserProfileContainer`.
- **Next.js Page (`page.tsx`)** — Entry point for a route (e.g. `/dashboard`). One per URL.
- **Next.js Layout (`layout.tsx`)** — Shared UI wrapping multiple pages. Preserves state on navigation.

---

## Axis 3: Identity (What it represents)

- **Identity / Entity Component** — Owns the state of a domain object. If it unmounts, that state is gone (unless persisted globally). Example: `RegistrationForm` owns the user's in-progress sign-up.
- **Strategy / Behavioral Component** — Stateless "lens". Pure function: same input always gives same output. Doesn't care *what* data it shows, only *how*. Examples: `PriceFormatter`, `DataGrid`.

---

## The Next.js Mental Model (combine all three)

> A **Functional Server Component** (Construct) acts as a **Container** (Purpose) — it fetches data and passes it down to a **Functional Client Component** (Construct) which acts as a **Presentational** element (Purpose) to handle interactive UI.

```
app/
└── dashboard/
    ├── page.tsx              ← Server Component + Container (fetches data)
    └── DashboardClient.tsx   ← 'use client' + Presentational (renders UI)
```

---

## Checklist Before Writing Any Component

1. **Construct**: Server or Client? (Does it need hooks/events? → Client. Otherwise → Server)
2. **Purpose**: Container or Presentational? (Does it fetch/manage state? → Container. Only renders? → Presentational)
3. **Identity**: Entity or Strategy? (Does it own specific domain state? → Entity. Pure display logic? → Strategy)
4. **Placement**: Is this a `page.tsx`, `layout.tsx`, or a reusable component?

---

## Common Patterns

### Data Fetching Page (Next.js)
```tsx
// app/users/page.tsx — Server Component + Container
import UserList from './UserList'

export default async function UsersPage() {
  const users = await fetch('/api/users').then(r => r.json())
  return <UserList users={users} />
}
```

### Interactive UI Component (Next.js)
```tsx
// components/UserList.tsx — Client Component + Presentational
'use client'

export default function UserList({ users }) {
  return users.map(u => <div key={u.id}>{u.name}</div>)
}
```

### Identity Component (owns form state)
```tsx
// components/RegistrationForm.tsx — Client Component + Identity
'use client'
import { useState } from 'react'

export default function RegistrationForm() {
  const [email, setEmail] = useState('') // owns the entity state
  // ...
}
```

### Strategy Component (pure display)
```tsx
// components/PriceFormatter.tsx — Presentational + Strategy
export default function PriceFormatter({ amount, currency }) {
  return <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount)}</span>
}
```

---

## Anti-Patterns to Avoid

- ❌ Adding `'use client'` to a component that doesn't need it (prevents server rendering optimizations)
- ❌ Fetching data inside a Client Component when a Server Component parent could do it
- ❌ Mixing Identity (stateful, domain-specific) logic into Strategy (pure display) components
- ❌ Creating monolithic components that are both Container AND Presentational — split them