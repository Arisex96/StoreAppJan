# Next.js Build Failure Analysis

## The Issue

The `pnpm run build` command was failing in the `apps/web` package with the following error:

```
Type error: The inferred type of 'RootLayout' cannot be named without a reference to '.pnpm/@types+react@19.2.8/node_modules/@types/react'. This is likely not portable. A type annotation is necessary.
```

## Root Causes

1. **Missing Explicit Return Type**:
   TypeScript attempts to infer the return type of the `RootLayout` component. In complex monorepo setups, especially with `pnpm`, these inferred types can sometimes reference specific paths in the `node_modules` store (e.g., `.pnpm/...`). TypeScript flags this as "not portable" because that path might not exist in other environments.
2. **Version Mismatch (`@types/react`)**:
   The monorepo had conflicting versions of React type definitions:

   - `apps/web` and `packages/ui` were using `@types/react@19.2.2`.
   - `apps/react1` was using `@types/react@^19.2.8`.

   This mismatch contributed to the validation error, as TypeScript struggled to reconcile the different type definitions when inferring the component's return type.

## The Fix

We applied two changes to resolve this:

1. **Added Explicit Return Type**:
   We modified `apps/web/app/layout.tsx` to explicitly state the return type.

   *Before:*

   ```tsx
   export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) { ... }
   ```

   *After:*

   ```tsx
   export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>): React.ReactElement { ... }
   ```

   *(Note: We used `React.ReactElement` instead of `JSX.Element` to avoid namespace issues with React 19/Next.js 16).*
2. **Aligned Dependencies**:
   We updated `apps/react1/package.json` to use the same version of `@types/react` (`19.2.2`) as the rest of the workspace. This ensures all packages share the same type definitions, preventing potential conflicts.

## Verification

- Ran `pnpm run build` from the root.
- Confirmed that all 3 tasks (`backend#build`, `react1#build`, `web#build`) completed successfully.


# Hydration Mismatch Fix Walkthrough

## Use Case

The application was encountering a hydration mismatch error. This error occurs when the HTML rendered by the server does not match the HTML rendered by the client. In this specific case, the error log indicated that browser extensions (specifically ones adding attributes like `bis_skin_checked`) were modifying the DOM before React could hydrate, causing the mismatch.

## Changes

### Web App

layout.tsx

* Added `suppressHydrationWarning` prop to the `<html>` tag.

<pre><div node="[object Object]" class="relative whitespace-pre-wrap word-break-all p-3 my-2 rounded-sm bg-list-hover-subtle"><div class="w-full h-full text-xs cursor-text"><div class="code-block"><div class="code-line" data-line-number="1" data-line-start="1" data-line-end="1"><div class="line-content"><span class="mtk12">-    <html lang="en"></span></div></div><div class="code-line" data-line-number="2" data-line-start="2" data-line-end="2"><div class="line-content"><span class="mtk7">+    <html lang="en" suppressHydrationWarning></span></div></div><div class="code-line" data-line-number="3" data-line-start="3" data-line-end="3"><div class="line-content"><span class="mtk1">       <body className={`${geistSans.variable} ${geistMono.variable}`}></span></div></div></div></div></div></pre>

### Backend App

package.json

* Added `dotenv` dependency.

<pre><div node="[object Object]" class="relative whitespace-pre-wrap word-break-all p-3 my-2 rounded-sm bg-list-hover-subtle"><div class="w-full h-full text-xs cursor-text"><div class="code-block"><div class="code-line" data-line-number="1" data-line-start="1" data-line-end="1"><div class="line-content"><span class="mtk1">"cors": "^2.8.5",</span></div></div><div class="code-line" data-line-number="2" data-line-start="2" data-line-end="2"><div class="line-content"><span class="mtk7">+    "dotenv": "^17.2.3",</span></div></div><div class="code-line" data-line-number="3" data-line-start="3" data-line-end="3"><div class="line-content"><span class="mtk1">     "esbuild": "^0.27.2",</span></div></div></div></div></div></pre>

### Database Package

package.json

* Updated `build` script to include `prisma generate`.

<pre><div node="[object Object]" class="relative whitespace-pre-wrap word-break-all p-3 my-2 rounded-sm bg-list-hover-subtle"><div class="w-full h-full text-xs cursor-text"><div class="code-block"><div class="code-line" data-line-number="1" data-line-start="1" data-line-end="1"><div class="line-content"><span class="mtk1">"scripts": {</span></div></div><div class="code-line" data-line-number="2" data-line-start="2" data-line-end="2"><div class="line-content"><span class="mtk1">     "dev": "echo 'Running dev'",</span></div></div><div class="code-line" data-line-number="3" data-line-start="3" data-line-end="3"><div class="line-content"><span class="mtk12">-    "build": "tsc",</span></div></div><div class="code-line" data-line-number="4" data-line-start="4" data-line-end="4"><div class="line-content"><span class="mtk7">+    "build": "prisma generate && tsc",</span></div></div><div class="code-line" data-line-number="5" data-line-start="5" data-line-end="5"><div class="line-content"><span class="mtk1">     "prisma:generate": "prisma generate",</span></div></div></div></div></div></pre>

## Verification Results

### Automated Tests

* Ran `npm run build` in `apps/web` directory (Web App).
* Ran `pnpm run build` in `apps/backend` directory (Backend App).
* Ran `pnpm run build` in `packages/db` directory.
* **Result** : All builds completed successfully.

![Build Success](vscode-file://vscode-app/N/A%20-%20successful%20console%20output%20confirmed)

NOTE

The `suppressHydrationWarning` prop specifically tells React to ignore attribute differences on the tag it's applied to. This effectively silences the error caused by browser extensions injecting unexpected attributes. The backend deployment failure was caused by a missing `dotenv` dependency. The `@repo/db` issue was caused by the Prisma client not being generated before the TypeScript compilation. Updating the build script to run `prisma generate` ensures the client exists.
