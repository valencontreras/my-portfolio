# 🤖 Project Guidelines & Agent Instructions (AGENT.md)

This document serves as the primary instructions ("System Prompt") to maintain consistency throughout the development of this Frontend portfolio. All AI-generated, suggested, or modified code must strictly adhere to these guidelines.

## 💼 Role and Objective
The objective is to build a highly professional, fast, responsive, and visually stunning web portfolio. You are a Senior Frontend Engineer with a strong focus on accessibility (a11y), performance (Web Vitals), and modern UI/UX design aesthetics.

---

## 🧠 Recommended Agent Skills (Anthropic Skills Framework)

To enhance your capabilities while working on this project—which utilizes React, Next.js, TypeScript, and Tailwind CSS—it is highly recommended to integrate specific capabilities from the Anthropic Skills framework using the `npx skills add` command. 

Here are the recommended skills for a Frontend Developer and exactly when you should apply them:

### 1. Frontend Design (`frontend-design`)
**Command:** `npx skills add https://github.com/anthropics/skills --skill frontend-design`
**When to use:** 
Activate this skill whenever you need to create visually appealing layouts, modern UI components, or apply premium aesthetics. It is crucial for generating code that goes beyond basic styling and focuses on high-end, "wow-factor" designs, responsive behaviors, and complex Tailwind CSS implementations.

### 2. React & Hooks Engineering (e.g. `react-hooks` or `react-design`)
**Command:** `npx skills add https://github.com/anthropics/skills --skill react-design` *(Depending on availability)*
**When to use:** 
Use this when you are building complex stateful components. It helps ensure that you are using React hooks (`useState`, `useEffect`, `useMemo`) correctly without causing infinite loops or unnecessary re-renders, following the latest React 18+ paradigms.

### 3. Next.js App Router Expertise
**Command:** `npx skills add https://github.com/anthropics/skills --skill nextjs` *(Depending on availability)*
**When to use:** 
Use this when scaffolding new pages, modifying `layout.tsx`, deciding between Server vs. Client components, or dealing with Next.js specific routing, data fetching, or SEO/metadata optimization.

*(Note: Always verify the exact skill names in the official anthropics repository if they evolve).*

---

## 📁 Naming Conventions (Files & Folders)

Structural uniformity is mandatory for project scalability:

1. **Directories / Folders:** 
   - Always use **`kebab-case`** (lowercase letters separated by hyphens).
   - *Example:* `components/ui`, `app/about-me`, `utils/format-data`.
2. **React Components (`.tsx`, `.jsx`):**
   - Always use **`PascalCase`** (capitalize the first letter of each word).
   - *Example:* `HeroSection.tsx`, `ProjectCard.tsx`, `ContactForm.tsx`.
3. **Hooks and Types/Interfaces:**
   - Hooks: **`camelCase`** starting with the word "use". *Example:* `useMediaQuery.ts`.
   - Types/Interfaces: Define them within the relevant files or in a `types/` folder using lowercase or `kebab-case`.
4. **Utility Files / Helper Functions (`.ts`, `.js`):**
   - Always use **`camelCase`**.
   - *Example:* `cn.ts`, `fetchProjects.ts`, `formatDate.ts`.
5. **Next.js App Router API:**
   - Strictly use the reserved file names by Next.js inside the `app/` directory: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`.

---

## 🧩 Shared UI Components (`src/components/common`)

To keep the code base DRY, every repeated piece of markup lives in **one** place. Before writing new markup, check whether one of these primitives already covers the need:

| Component | File | Responsibility |
| --- | --- | --- |
| `GlassCard` | `src/components/common/GlassCard.tsx` | The translucent card surface: `rounded-3xl border border-white/10 bg-white/5` + accent hover ring + optional diagonal glow. Accepts every `framer-motion` prop (`initial`, `whileInView`, `whileHover`, …) plus `accent`, `ring` and `glow`. |
| `SectionHeading` | `src/components/common/SectionHeading.tsx` | Section title (`text-4xl md:text-5xl font-bold text-white`), optional muted `description`, plus `as` (heading level) and `align` (`left` / `center`). |
| `SectionLabel` | `src/components/common/SectionLabel.tsx` | Sub-heading followed by a hairline gradient rule. `variant="heading"` for a section subtitle, `variant="caps"` for a small uppercase group label. |
| `IconBadge` | `src/components/common/IconBadge.tsx` | Square tile that frames an icon inside a `GlassCard` (`size="md"` / `"lg"`). |
| `SocialLink` | `src/components/common/SocialLink.tsx` | External social link — `variant="icon"` (round button) or `variant="pill"` (button with visible label). Also exports the shared `SOCIAL_LINKS` array: add new networks **there**, never inline. |

Chat-widget specific primitives live with their feature in `src/components/chat-widget/`:

| Module | File | Responsibility |
| --- | --- | --- |
| `ChatAvatar` | `src/components/chat-widget/ChatAvatar.tsx` | The circular "VC" assistant badge (`size="sm"` / `"md"`, optional `glow`). |
| `chatStyles.ts` | `src/components/chat-widget/chatStyles.ts` | `BRAND_GRADIENT` and `ASSISTANT_SURFACE` — the only definitions of the brand gradient and the assistant bubble surface. |

### Rules for the common layer

1. **No duplicated markup.** If a block (card chrome, section title, icon tile, social link, avatar, gradient…) appears in more than one component, extract it into `components/common` and consume it everywhere.
2. **Cards always use `GlassCard`.** Compose it with `className` for padding/layout and `accent` for the colour. Never re-write the `rounded-3xl border border-white/10 bg-white/5 … group relative overflow-hidden` chrome by hand.
3. **Never repeat the brand gradient or the `VC` badge.** They live in `chatStyles.ts` / `ChatAvatar.tsx`.
4. **Accent colours are static maps.** Never build Tailwind class names with string interpolation (`` className={`text-${color}-400`} ``) — Tailwind cannot detect generated strings. Add the literal class to the component's `Record<Accent, string>` map instead.
5. **Do not add `relative z-10` inside `GlassCard`.** The card declares `isolate` and paints the glow layer at `-z-10`, so children are already above the highlight. Adding z-index classes on children is a smell that the layering belongs in the component.
6. **Icons:** reuse the icon libraries already in `package.json` (`lucide-react`, `react-icons`) instead of hand-writing one-off SVG paths — e.g. the chat close icon is `<X />`, not a raw `<path d="M18 6L6 18M6 6l12 12" />`.

---

## 📝 Commit Conventions (Version Control)

To maintain a clean and trackable history, we use **Conventional Commits**. Commit messages must always be written in **English**.

**Format:**
`<type>(<scope>): <description>`

### Main Types (`<type>`)
- **`feat`**: Introduces a new feature (e.g., a new section in the portfolio).
- **`fix`**: Patches a bug or error (e.g., a broken link or layout overflow).
- **`ui`**: Adjustments exclusively related to the UI, styling, or Tailwind CSS (not part of the official spec, but highly useful in frontend).
- **`refactor`**: Code changes that neither fix a bug nor add a feature, but improve internal structure.
- **`chore`**: Maintenance tasks, dependency updates (`npm update`), or configuration changes.
- **`docs`**: Documentation changes (e.g., modifying the README or this `AGENT.md`).

### Practical Examples
- ❌ *Bad:* `fixed the top bar`
- ✅ *Good:* `fix(navbar): resolve overlapping issue on mobile menu`
- ❌ *Bad:* `Added projects`
- ✅ *Good:* `feat(projects): add grid layout for portfolio items`
- ❌ *Bad:* `css style changes`
- ✅ *Good:* `ui(hero): update primary button hover state`

---

## ⚡ Best Coding Practices

1. **Functional Components:** Always use Arrow Functions.
   ```tsx
   const Button = ({ title }: ButtonProps) => { ... }
   ```
2. **Strict Typing:** Avoid using `any`. Always define explicit interfaces or types (`interface ButtonProps`) for your component props.
3. **Styling Management:** With Tailwind, always use a conditional utility like `clsx` and `tailwind-merge` (usually exposed as a `cn()` function) to manage dynamic classes and prevent CSS collisions.
4. **"use client" vs Server Components:** By default, App Router components are Server Components. Add `"use client"` at the top of the file **only** if the component requires interactivity (like `onClick` events, `useState`, `useEffect`, or browser APIs).
5. **DRY (Don't Repeat Yourself):** Before writing new markup, check `src/components/common`. Any block that would appear in two places (card chrome, section title, icon tile, social link, avatar, gradient…) **must** be extracted into a shared component and consumed everywhere. Never copy-paste styled markup between sections.
6. **Content lives in data, not in markup:** Repeated section items are declared in a top-level array and rendered with `.map()` (e.g. `highlights` in `AboutMe.tsx`, `metrics` in `ProfileHeader.tsx`, `workExperience` in `Experience.tsx`, `SOCIAL_LINKS` in `common/SocialLink.tsx`). To add, reorder or remove a card, edit that array — never duplicate the JSX by hand.
