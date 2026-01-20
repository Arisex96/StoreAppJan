# @repo/db

Prisma database package for the Turborepo monorepo.

## Setup

1. Add your Supabase credentials to `.env`:

   ```
   DATABASE_URL="postgresql://..."
   DIRECT_URL="postgresql://..."
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Run migrations:

   ```bash
   pnpm prisma:migrate -- --name init
   ```

4. Seed the database:
   ```bash
   pnpm prisma:seed
   ```

## Available Scripts

- `pnpm prisma:generate` - Generate Prisma Client
- `pnpm prisma:migrate` - Run migrations
- `pnpm prisma:seed` - Seed the database
