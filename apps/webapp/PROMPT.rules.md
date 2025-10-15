# Bien star — AI Coding Rules (Next.js)

**Context:** Bien star is a crowdfunding platform for social causes with Bitcoin donations. Texts are managed with Languine AI (already configured).

## Architecture (brief)
- **Layers:** UI components → feature logic → data/server actions → shared utils/types.
- **Pages (`app/**`):** composition only (import components + metadata). No business logic or big JSX in pages.

## Hard Rules
1. **Modularization:** small, focused, reusable components.
2. **File size cap:** **max 250 lines per file**. If it grows, split it.
3. **Styles:** **Tailwind CSS only**. No inline styles, no CSS-in-JS. Keep styling outside component logic via utility classes.
4. **Responsive:** mobile-first; ensure proper breakpoints with Tailwind responsive utilities.
5. **Texts via Languine:** all visible strings live in the **Languine JSON** and are read by key. **No hardcoded strings** in components.
6. **Package manager:** **Bun** for everything (`bun install`, `bun run`, `bunx`).
7. **Pages code policy:** pages wire components/layouts only; move logic and heavy JSX into components.
8. **Docs:** short header comment per file + JSDoc/TSDoc for public functions; brief Markdown when a feature needs it.
9. **Efficiency:** always choose the most efficient approach (server-first when possible, lazy load heavy UI, avoid unnecessary client code).
10. **Quality:** no `any`; clear names; no dead code or debug logs in production.

## Languine (usage sketch)
- Define keys (e.g., `languine/en.json`, `languine/es.json`):
  ```json
  {
    "home.title": "Welcome to Bien star",
    "home.ctaDonate": "Donate with Bitcoin",
    "errors.generic": "Something went wrong. Please try again."
  }
```

* Consume by key only:

  ```tsx
  import { useTexts } from "@/lib/languine";
  export function DonateButton() {
    const t = useTexts();
    return <button className="btn-primary">{t("home.ctaDonate")}</button>;
  }
  ```

## Quality Guardrails (lean)

* **TypeScript strict:** `strict: true`, `noImplicitAny`, `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`.
  *No `any`/`unknown` without narrowing.*
* **Sizes & complexity:** **≤250 lines per file**, **≤120 lines per component**, **≤60 lines per function**, **≤3 nesting levels**.
* **Lint & format:** project must pass `lint` and `format:check` before merge.
* **Accessibility:** semantic HTML, labeled controls, keyboard navigation, visible focus, adequate contrast, images with `alt`.
* **Performance:** prefer server components/actions; limit `use client`; lazy-load heavy parts; use `next/image` for images; avoid large deps if native APIs suffice.

## Steps before finish

1. make the required changes
2. run `bun run build` command
3. run `bun run dev` command

## Minimal Bun scripts

```json
{
  "scripts": {
    "typecheck": "bunx tsc -p tsconfig.json --noEmit",
    "lint": "bunx eslint .",
    "format": "bunx prettier . --write",
    "format:check": "bunx prettier . --check"
  }
}
```

## Change Checklist

* [ ] All strings come from Languine JSON (no literals in JSX).
* [ ] No file exceeds 250 lines; components/functions within limits.
* [ ] Pages only compose components; no business logic in pages.
* [ ] Tailwind-only, responsive verified.
* [ ] TypeScript strict, lint + format pass.
* [ ] Chosen solution is the most efficient available.
