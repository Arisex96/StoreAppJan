# Turbo Monorepo Setup Guide

## 1. Initial Turbo Setup

### Create a new Turbo project

```bash
npx create-turbo@latest
```

_This will create a new folder in root_

### Configure root `turbo.json`

Add or update the `tasks` section:

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["$TURBO_DEFAULT$", ".env*"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    }
  }
}
```

> **Note:** `dist/**` is essential for Node.js/backend outputs

---

## 2. Setup React App (Vite)

### Create a new Vite React project

```bash
cd apps
npm create vite@latest
```

**When prompted:**

- ✋ Say **no** to npm (we're using pnpm)

### Install dependencies

```bash
cd apps/react1
pnpm install
```

### Create `turbo.json` in react1

```json
{
  "extends": ["//"],
  "tasks": {
    "build": {
      "outputs": ["dist/**"]
    }
  }
}
```

### Add UI package to dependencies

In `apps/react1/package.json`, add to `devDependencies`:

```json
{
  "devDependencies": {
    "@repo/ui": "workspace:*",
    "@eslint/js": "^9.39.1"
  }
}
```

### Install dependencies in both folders

```bash
# In react1 folder
pnpm install

# In root folder
pnpm install
```

> This resolves all `@repo` imports

---

## 3. Configure UI Package

### Update `packages/ui/tsconfig.json`

```json
{
  "extends": "@repo/typescript-config/react-library.json",
  "compilerOptions": {
    "outDir": "./dist"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

### Update `packages/ui/package.json`

```json
{
  "name": "@repo/ui",
  "version": "0.0.0",
  "private": true,
  "exports": {
    "./*": "./src/*.tsx",
    ".": "./src/index.ts"
  }
}
```

---

## 4. Setup Node.js Backend (Express)

### Create backend folder

```bash
mkdir apps/backend
cd apps/backend
npm init -y
npx tsc --init
```

### Configure `apps/backend/tsconfig.json`

```json
{
  "extends": "@repo/typescript-config/base.json",
  "compilerOptions": {
    "lib": ["ES2015"],
    "module": "NodeNext",
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": false,
    "declarationMap": false
  },
  "exclude": ["node_modules", "dist"],
  "include": ["src"]
}
```

### Install dependencies

```bash
pnpm install
pnpm install express @types/express
pnpm install esbuild
```

### Create `apps/backend/turbo.json`

```json
{
  "extends": ["//"],
  "tasks": {
    "build": {
      "outputs": ["dist/**"]
    }
  }
}
```

### Update `apps/backend/package.json`

Add to `devDependencies`:

```json
{
  "devDependencies": {
    "@repo/typescript-config": "workspace:*"
  }
}
```

Add build scripts:

```json
{
  "scripts": {
    "build": "tsc",
    "dev": "node --watch dist/index.js",
    "start": "node dist/index.js"
  }
}
```

### Install in both folders

```bash
# In backend folder
pnpm install

# In root folder
pnpm install
```

---

## 5. Running the Monorepo

### Development Mode (all apps)

```bash
pnpm run dev
```

### Build Mode

```bash
pnpm run build
```

### Individual app commands

```bash
# Build specific app
pnpm --filter backend build
pnpm --filter react1 build

# Run dev in specific app
pnpm --filter backend dev
pnpm --filter react1 dev
```

---

## 6. Key Points to Remember

✅ **Always disable `declaration` and `declarationMap` for Node.js backends** to prevent overwrite conflicts

✅ **Use `include: ["src"]` and `exclude: ["dist"]`** in tsconfig to prevent compilation of output files

✅ **Use `type-only imports`** for types: `import type { ReactNode } from "react"`

✅ **Install dependencies after adding `@repo` packages** in both the app folder and root

✅ **Port management:** Ensure different apps use different ports:

- Web (Next.js): 3000
- Docs (Next.js): 3001
- Backend (Express): 4000
- React1 (Vite): 5173

✅ **Workspace packages:** Always use `"workspace:*"` syntax for local package dependencies

---

## 7. File Structure

```
project-jan/
├── apps/
│   ├── backend/          # Node.js/Express backend
│   ├── react1/           # Vite React app
│   ├── web/              # Next.js app
│   └── docs/             # Next.js app
├── packages/
│   ├── ui/               # Shared React components
│   ├── typescript-config/
│   └── eslint-config/
├── turbo.json            # Root Turbo config
├── pnpm-workspace.yaml
└── package.json
```

---

## 8. Common Issues & Solutions

### Issue: TypeScript error TS5055: Cannot write declaration files

**Solution:** Set `"declaration": false` and `"declarationMap": false` in backend tsconfig.json

### Issue: Port already in use

**Solution:** Assign different ports to each app:

- Change port in package.json scripts
- Or set PORT environment variable

### Issue: Cannot find module '@repo/...'

**Solution:** Run `pnpm install` in both the app folder and root folder

### Issue: Turbo build cache not working

**Solution:** Check that `outputs` in turbo.json matches your build output directory

---

## 9. Setup Tailwind CSS v4

### For Vite React App (react1)

#### 1. Install Tailwind CSS v4

```bash
cd apps/react1
pnpm install -D tailwindcss@latest @tailwindcss/postcss autoprefixer postcss
```

#### 2. Create/Update `postcss.config.js`

```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

#### 3. Create/Update `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

#### 4. Update `src/index.css`

```css
@import 'tailwindcss';
```

**Note:** Tailwind v4 uses `@import 'tailwindcss'` instead of the old `@tailwind` directives.

---

### For Next.js App (web)

#### 1. Install Tailwind CSS v4

```bash
cd apps/web
pnpm install -D tailwindcss@latest @tailwindcss/postcss postcss
```

#### 2. Create/Update `postcss.config.js`

```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

#### 3. Create/Update `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

#### 4. Update `app/globals.css`

```css
@import 'tailwindcss';
```

**Note:** Next.js 16 works seamlessly with Tailwind CSS v4 using the new PostCSS plugin.

---

### Testing Tailwind CSS

After setup, test with utility classes:

```tsx
// React (Vite)
<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
  <h1 className="text-5xl font-bold text-indigo-900">Hello Tailwind!</h1>
  <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
    Click Me
  </button>
</div>
```

```tsx
// Next.js
<div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-8">
  <h1 className="text-6xl font-bold text-purple-900">Hello Tailwind!</h1>
  <button className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
    Click Me
  </button>
</div>
```

### Key Differences: Tailwind v4 vs v3

✅ **PostCSS Plugin:** Use `@tailwindcss/postcss` instead of separate `tailwindcss` and `autoprefixer` plugins

✅ **CSS Import:** Use `@import 'tailwindcss'` instead of `@tailwind` directives

✅ **No autoprefixer needed:** Autoprefixer is now built into `@tailwindcss/postcss`

✅ **Smaller bundle size:** v4 is more optimized with better performance

### Common Tailwind Issues

**Issue: Styles not applying**

**Solution:** 
- Verify `content` paths in `tailwind.config.js` match your file structure
- Ensure CSS file is imported in your entry point (`main.tsx` for Vite, `layout.tsx` for Next.js)
- Clear cache and restart dev server

**Issue: HMR (Hot Module Replacement) not working**

**Solution:** Restart the dev server after changing Tailwind config

**Issue: PostCSS plugin not found**

**Solution:** Ensure `@tailwindcss/postcss` is installed as a devDependency, not `tailwindcss` as the plugin
