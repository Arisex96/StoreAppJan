This is a classic TurboRepo + TypeScript + Render problem, and you’re not doing anything “wrong”.
It works locally because your local workspace + tsconfig paths + pnpm symlinks hide the issue.
Render is exposing the real problem.

Let’s fix it properly, not with hacks.

🔴 Root cause (important)

Render is failing because:

@repo/db is a workspace package, but Render is NOT building it.

Locally:

pnpm workspace links @repo/db

tsconfig paths resolve it

Prisma client already exists

Everything “just works”

On Render:

Render only sees apps/backend

It does NOT automatically build packages/db

TypeScript compiler can’t find @repo/db

Hence:

TS2307: Cannot find module '@repo/db'


This is not a Prisma problem
This is a monorepo build boundary problem

🧠 Mental model (lock this in)
Local dev:
apps/backend  ---> packages/db (linked via pnpm)

Render build:
apps/backend  ❌ packages/db NOT built


TurboRepo does not magically work in production unless you explicitly build dependencies.

✅ The CORRECT fix (production-grade)
Step 1: Make @repo/db a real buildable package
packages/db/package.json
{
  "name": "@repo/db",
  "version": "0.0.0",
  "private": true,
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "prisma:generate": "prisma generate"
  }
}


✔ This is mandatory
✔ Without main & types, production WILL fail

Step 2: packages/db/tsconfig.json
{
  "compilerOptions": {
    "outDir": "dist",
    "declaration": true,
    "module": "CommonJS",
    "target": "ES2020",
    "strict": true
  },
  "include": ["src"]
}


✔ declaration: true is CRITICAL
✔ Render needs .d.ts files

Step 3: Backend must depend on db explicitly
apps/backend/package.json
{
  "dependencies": {
    "@repo/db": "*"
  }
}


🚫 DO NOT rely only on workspace linking
✔ This forces Render to install it

Step 4: Use relative imports INSIDE db

Inside packages/db/src/index.ts:

export * from "./client";


🚫 Do NOT use tsconfig path aliases inside db itself

Step 5: Turbo build pipeline (THIS fixes Render)
Root turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    }
  }
}


This means:

@repo/db builds before backend

Render finally sees compiled output

Step 6: Render Build Command (MOST IMPORTANT)

In Render Dashboard:

Root Directory
apps/backend

Build Command
pnpm install --filter backend...
pnpm turbo run build --filter backend


OR simpler:

pnpm install
pnpm turbo run build


🚫 If you only run pnpm install && pnpm build → FAIL

Step 7: Backend imports (unchanged)
import { prisma } from "@repo/db";


This will now work everywhere:

Local

Render

CI

❌ What NOT to do (common mistakes)
Mistake	Why it fails
tsconfig path aliases only	Not compiled
Rely on pnpm dev behavior	Prod ≠ dev
Skip db build	No JS output
Import TS directly	Node can’t
Copy-paste Prisma	Bad architecture
🟢 Quick sanity checklist

✔ packages/db/dist/index.js exists
✔ packages/db/dist/index.d.ts exists
✔ backend depends on @repo/db
✔ turbo build runs db before backend
✔ Render build command runs turbo

If any ❌ → deployment fails

🧠 Why Vercel works but Render fails

Vercel:

Smart monorepo detection

Implicit workspace build

Next.js hides complexity

Render:

Raw Node.js

No workspace magic

You must be explicit

This is why backend deploys are harder.

🧩 If you want the EASIEST alternative

For college projects / MVP:

Option A (simplest)

Move Prisma into backend

apps/backend/prisma


No shared package → no build issues

Option B (clean, scalable)

Keep @repo/db (what we just fixed)

🏁 Final verdict

✔ You hit a real monorepo production issue
✔ This is expected, not a mistake
✔ Fix is to build shared packages explicitly
✔ Once fixed → rock solid everywhere

If you want, next I can:

Inspect your actual repo structure

Write the exact Render build command

Simplify Turbo config

Suggest Neon + Prisma + Turbo best practice

Just paste:

packages/db/package.json

apps/backend/package.json

turbo.json

I’ll fix it line-by-line 💪