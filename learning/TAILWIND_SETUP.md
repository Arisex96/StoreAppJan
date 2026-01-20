# Tailwind CSS Setup Guide for Turbo Monorepo

This guide documents how to properly set up Tailwind CSS v4 in a Turbo monorepo with both React (Vite) and Next.js applications.

## Overview

Tailwind CSS v4 introduced a significant change: the PostCSS plugin was moved to a separate package `@tailwindcss/postcss`. This guide covers the correct setup for both React and Next.js apps within a Turbo monorepo.

## Prerequisites

- Node.js and pnpm installed
- Turbo workspace configured
- React/Vite or Next.js application set up

## Installation

### Step 1: Install Dependencies

Install the required packages in your app:

```bash
pnpm add tailwindcss @tailwindcss/postcss autoprefixer postcss
pnpm add -D tailwindcss
```

**Note:** Both `tailwindcss` and `@tailwindcss/postcss` need to be installed. The PostCSS plugin (`@tailwindcss/postcss`) is now separate from the main package.

### Step 2: Initialize Tailwind

Generate the Tailwind config file:

```bash
pnpm dlx tailwindcss init
```

## Configuration Files

### 1. PostCSS Configuration (`postcss.config.js`)

**For Vite + React:**
```javascript
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

**For Next.js:**
```javascript
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

Both use the same PostCSS configuration since `@tailwindcss/postcss` now handles all processing.

### 2. Tailwind Configuration (`tailwind.config.js`)

**For Vite + React:**
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

**For Next.js:**
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

**Key differences:**
- React/Vite: Content paths point to `src/` directory and include `index.html`
- Next.js: Content paths point to `app/` directory (App Router) or `pages/` (Pages Router)

### 3. CSS Entry Point

Add the Tailwind CSS import to your main CSS file.

**For Vite + React (`src/index.css`):**
```css
@import "tailwindcss";
```

Then import in `src/main.tsx`:
```typescript
import './index.css'
```

**For Next.js (`app/globals.css`):**
```css
@import "tailwindcss";
```

Then import in `app/layout.tsx`:
```typescript
import './globals.css'
```

## Package.json Dependencies

### Vite + React

```json
{
  "dependencies": {
    "@tailwindcss/postcss": "^4.1.18",
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.23",
    "postcss": "^8.5.6",
    "tailwindcss": "^4.1.18",
    "vite": "^7.2.4"
  }
}
```

### Next.js

```json
{
  "dependencies": {
    "@tailwindcss/postcss": "^4.1.18",
    "next": "16.1.0",
    "postcss": "^8.5.6",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "tailwindcss": "^4.1.18"
  }
}
```

## Common Issues & Solutions

### Issue 1: PostCSS Plugin Error
**Error:** "It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin..."

**Solution:**
- Ensure `@tailwindcss/postcss` is installed: `pnpm add @tailwindcss/postcss`
- Update `postcss.config.js` to use `@tailwindcss/postcss` instead of `tailwindcss`

### Issue 2: Styles Not Applying
**Problem:** Tailwind classes not appearing in the build

**Solutions:**
1. Verify `content` paths in `tailwind.config.js` match your template files
2. Ensure CSS file with `@import "tailwindcss"` is imported in your app entry point
3. Check that `@tailwindcss/postcss` is in devDependencies or dependencies

### Issue 3: Build Errors in Turbo
**Problem:** Styles don't build correctly in Turbo monorepo

**Solutions:**
1. Ensure each app has its own `tailwind.config.js` and `postcss.config.js`
2. Configure Turbo tasks properly in `turbo.json`:
   ```json
   {
     "tasks": {
       "build": {
         "inputs": ["src/**", "tailwind.config.js", "postcss.config.js"]
       }
     }
   }
   ```

## Turbo Monorepo Best Practices

### Directory Structure

```
project-root/
├── apps/
│   ├── react1/
│   │   ├── postcss.config.js
│   │   ├── tailwind.config.js
│   │   ├── src/
│   │   │   ├── index.css (with @import "tailwindcss")
│   │   │   └── main.tsx
│   │   └── package.json
│   └── web/
│       ├── postcss.config.js
│       ├── tailwind.config.js
│       ├── app/
│       │   ├── globals.css (with @import "tailwindcss")
│       │   └── layout.tsx
│       └── package.json
├── packages/
│   └── ui/
│       ├── tailwind.config.js (shared config)
│       └── src/
└── turbo.json
```

### Shared Configuration (Optional)

For shared UI components, create a shared Tailwind config in `packages/` and extend it in individual apps:

**`packages/config/tailwind.config.js`:**
```javascript
export default {
  theme: {
    extend: {
      colors: {
        brand: '#ff0000',
      },
    },
  },
};
```

**App's `tailwind.config.js`:**
```javascript
import sharedConfig from '@repo/config/tailwind.config.js';

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: sharedConfig.theme.extend,
  },
  plugins: [],
};
```

## Scripts

Add these scripts to your `package.json` for development:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}
```

Tailwind CSS will automatically process styles during development and production builds.

## Version Notes

- **Tailwind CSS v4.x:** Uses `@tailwindcss/postcss` as separate PostCSS plugin
- **Tailwind CSS v3.x and below:** Used `tailwindcss` directly as PostCSS plugin
- **autoprefixer:** Still recommended for browser compatibility

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Tailwind CSS v4 Migration Guide](https://tailwindcss.com/docs/upgrade-guide)
- [Turbo Documentation](https://turbo.build)
- [PostCSS Documentation](https://postcss.org)

## Troubleshooting Commands

```bash
# Clear pnpm cache and reinstall
pnpm install --force

# Rebuild Turbo cache
turbo build --force

# Check Tailwind CLI version
pnpm dlx tailwindcss --version

# Validate PostCSS config
pnpm exec postcss --version
```
