# Prisma Setup in Turborepo - Complete Guide

## Overview

This document covers the complete Prisma setup for a Turborepo monorepo with Supabase PostgreSQL database.

## What We Built

- **Location**: `packages/common` - Shared database layer
- **Database**: Supabase (PostgreSQL)
- **ORM**: Prisma v5
- **Connection**: Pooled (app) + Direct (migrations)

---

## Architecture

### Turborepo Structure

```
my-turborepo/
├── packages/
│   └── common/                 # Database package
│       ├── prisma/
│       │   ├── schema.prisma   # Data models
│       │   ├── seed.ts         # Dummy data
│       │   └── migrations/     # Migration history
│       ├── .env                # Database credentials
│       └── package.json        # Scripts & config
├── apps/
│   ├── http-server/            # API server (uses PrismaClient)
│   ├── web/                    # Next.js frontend
│   └── ws-server/              # WebSocket server
```

### Connection Pooling

```
App (http-server)
  ↓
Prisma Client (pooler: 6543)
  ↓
Connection Pooler (aws-1-ap-southeast-1.pooler.supabase.com:6543)
  ↓
Supabase PostgreSQL Database

Migrations (prisma migrate)
  ↓
Prisma CLI (direct: 5432)
  ↓
Direct Connection (aws-1-ap-southeast-1.pooler.supabase.com:5432)
  ↓
Supabase PostgreSQL Database
```

---

## Step-by-Step Setup

### Step 1: Install Dependencies

**In `packages/common` directory:**

```bash
cd packages/common

# Install Prisma CLI (dev dependency)
pnpm add -D prisma@5

# Install Prisma Client (runtime)
pnpm add @prisma/client

# Install TypeScript tools for seeding
pnpm add -D ts-node @types/node

# Install Zod for validation schemas (optional)
pnpm add zod
```

**Why each package:**

- `prisma@5`: Command-line tool for schema management, migrations, seeding
- `@prisma/client`: Runtime library for type-safe database queries
- `ts-node`: Execute TypeScript files without compilation
- `@types/node`: TypeScript definitions for Node.js APIs

### Step 2: Configure Environment Variables

**Create `packages/common/.env`:**

```dotenv
# Connection pooling for app queries (port 6543)
DATABASE_URL="postgresql://postgres.eaufijigsskscldharvw:[PASSWORD]@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Direct connection for migrations (port 5432)
DIRECT_URL="postgresql://postgres.eaufijigsskscldharvw:[PASSWORD]@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres"
```

**Get credentials from Supabase:**

1. Go to https://app.supabase.com → Your Project
2. Settings → Database → Connection String
3. Copy pooler URL (replace `[PASSWORD]`)

### Step 3: Initialize Prisma

**In `packages/common` directory:**

```bash
npx prisma init
```

**Output:**

- Creates `prisma/schema.prisma` (data model file)
- Creates `.env` file (already created in Step 2)

### Step 4: Configure Prisma Schema

**File: `packages/common/prisma/schema.prisma`**

```prisma
// Generator for TypeScript client
generator client {
  provider = "prisma-client-js"
}

// Database connection
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")        // Pooled connection for app
  directUrl = env("DIRECT_URL")          // Direct connection for migrations
}

// Data models
model User {
  id        Int     @id @default(autoincrement())  // Auto-incrementing primary key
  username  String  @unique                         // Unique constraint
  email     String  @unique
  password  String
  createdAt DateTime @default(now())               // Auto-set to current time
  updatedAt DateTime @updatedAt                    // Auto-update on changes
}
```

**Key Prisma Attributes:**

- `@id`: Primary key
- `@unique`: Unique constraint in database
- `@default(now())`: Auto-set to current timestamp
- `@updatedAt`: Auto-update on record changes
- `@relation`: Foreign key relationships

### Step 5: Create Database Migration

**In `packages/common` directory:**


Add this migrate commands in package.json

  "scripts": {

    "dev": "echo 'Running dev'",

    "build": "tsc",

    "prisma:generate": "prisma generate",

    "prisma:migrate": "prisma migrate dev"

  },

```bash
pnpm prisma:migrate -- --name init
```

**What happens:**

1. Prisma compares schema with current database state
2. Generates migration SQL file
3. Applies migration to database
4. Creates `prisma/migrations/` folder

**Output:**

```
✔ Generated Prisma Client
✔ Migration applied: 20260113184727_init

Your database is now in sync with your schema.
```

### Step 6: Create Seed File

**File: `packages/common/prisma/seed.ts`**

```typescript
import { PrismaClient } from "@prisma/client";

// Use DIRECT_URL for seeding (not pooler)
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL,
    },
  },
});

async function main() {
  // Clear existing data
  await prisma.user.deleteMany();

  // Create test users
  const user1 = await prisma.user.create({
    data: {
      username: "testuser",
      email: "test@example.com",
      password: "hashed_password_123",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: "johndoe",
      email: "john@example.com",
      password: "hashed_password_456",
    },
  });

  console.log("✅ Seeded users:", user1, user2);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
```

**Important:** Always use `DIRECT_URL` for seed scripts, not `DATABASE_URL`!

### Step 7: Configure Package.json Scripts

**File: `packages/common/package.json`**

```json
{
  "name": "@repo/common",
  "version": "1.0.0",
  "scripts": {
    "prisma": "prisma",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:seed": "prisma db seed",
    "prisma:studio": "prisma studio"
  },
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  },
  "devDependencies": {
    "@repo/typescript-config": "workspace:*",
    "prisma": "^5",
    "ts-node": "^10.9.2",
    "@types/node": "^22.15.3"
  },
  "dependencies": {
    "@prisma/client": "^5.22.0",
    "zod": "^4.3.5"
  }
}
```

### Step 8: Run Seed Script

**In `packages/common` directory:**

```bash
pnpm prisma:seed
```

**Output:**

```
✅ Seeded users: { id: 1, username: 'testuser', ... }
                 { id: 2, username: 'johndoe', ... }
```

---

## Common Commands

### Prisma CLI Commands

| Command                                 | Purpose                             |
| --------------------------------------- | ----------------------------------- |
| `pnpm prisma migrate dev --name init` | Create & apply migration            |
| `pnpm prisma migrate status`          | Check migration status              |
| `pnpm prisma migrate reset`           | Reset database & run all migrations |
| `pnpm prisma db seed`                 | Run seed file                       |
| `pnpm prisma studio`                  | Open GUI database viewer            |
| `pnpm prisma generate`                | Generate PrismaClient types         |
| `pnpm prisma validate`                | Validate schema.prisma syntax       |

### Database Management

```bash
# View/edit data GUI
pnpm prisma:studio

# Create new migration
pnpm prisma:migrate -- --name add_posts_table

# Reset database (CAUTION: deletes all data)
npx prisma migrate reset --force

# Check migration history
npx prisma migrate status
```

---

## Using Prisma in Apps

### Import PrismaClient

**In `apps/http-server/src/index.ts`:**

```typescript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Query examples
async function getUser(username: string) {
  const user = await prisma.user.findUnique({
    where: { username },
  });
  return user;
}

async function createUser(data) {
  const user = await prisma.user.create({
    data: {
      username: data.username,
      email: data.email,
      password: data.password,
    },
  });
  return user;
}
```

### Query Patterns

```typescript
// Create
const user = await prisma.user.create({
  data: { username: "test", email: "test@example.com", password: "hashed" },
});

// Read (get first match)
const user = await prisma.user.findUnique({
  where: { username: "testuser" },
});

// Read (get all)
const users = await prisma.user.findMany();

// Read with filtering
const users = await prisma.user.findMany({
  where: { email: { contains: "@example.com" } },
});

// Update
const updated = await prisma.user.update({
  where: { id: 1 },
  data: { email: "newemail@example.com" },
});

// Delete
await prisma.user.delete({ where: { id: 1 } });

// Delete multiple
await prisma.user.deleteMany({ where: { id: { in: [1, 2, 3] } } });
```

---

## Folder Structure Explained

```
packages/common/
├── src/
│   ├── index.ts          # Export PrismaClient
│   └── types.ts          # Zod validation schemas
├── prisma/
│   ├── schema.prisma     # Data models definition
│   ├── seed.ts           # Dummy data script
│   └── migrations/
│       └── 20260113184727_init/
│           └── migration.sql  # Generated SQL
├── .env                  # Database credentials
├── .env.example          # Template (safe to commit)
├── tsconfig.json
└── package.json
```

**Important files:**

- `schema.prisma`: Source of truth for database structure
- `migrations/`: Git history of schema changes
- `.env`: Secrets (never commit!)
- `seed.ts`: Initial test data

---

## Troubleshooting

### Can't connect to database

```
Error: P1001: Can't reach database server
```

**Solutions:**

1. Check `.env` credentials are correct
2. Verify Supabase database is not paused (check dashboard)
3. Ensure DATABASE_URL and DIRECT_URL are different connections
4. Check network connectivity (firewall?)

### Migration status doesn't match

```
Error: The local migration history and the migrations table from your database are different
```

**Solution:**

```bash
npx prisma migrate resolve --rolled-back "20260113184727_init"
npx prisma migrate deploy
```

### Type errors in queries

**Issue:** TypeScript doesn't recognize model properties

**Solution:**

```bash
pnpm prisma generate  # Regenerate types
```

---

## Best Practices

### 1. Always Use Direct Connection for Migrations

```typescript
// ❌ Wrong - uses pooler
const prisma = new PrismaClient();

// ✅ Correct - uses direct connection
const prisma = new PrismaClient({
  datasources: {
    db: { url: process.env.DIRECT_URL },
  },
});
```

### 2. Disconnect After Queries

```typescript
const user = await prisma.user.findUnique({ where: { id: 1 } });
await prisma.$disconnect(); // Close connection
```

### 3. Never Commit `.env`

```bash
# .gitignore
.env
.env.local
```

### 4. Use Transactions for Multiple Operations

```typescript
const [user, post] = await prisma.$transaction([
  prisma.user.create({ data: { username: "test" } }),
  prisma.post.create({ data: { title: "Test", userId: 1 } }),
]);
```

### 5. Validate Input with Zod

```typescript
import { CreateUserSchema } from "@repo/common/zodtypes";

const validated = CreateUserSchema.parse(userData);
const user = await prisma.user.create({ data: validated });
```

---

## Migration Workflow

### When to Create Migrations

1. Add a new table
2. Add/remove columns
3. Add/remove constraints
4. Change data types

### Migration Steps

```bash
# 1. Update schema.prisma
# (add new model or modify existing)

# 2. Create migration
pnpm prisma:migrate -- --name descriptive_name

# 3. Review generated SQL (optional)
# prisma/migrations/[timestamp]_descriptive_name/migration.sql

# 4. Commit to git
git add prisma/migrations/
git commit -m "feat: add posts table"
```

### In Team Environments

```bash
# After pulling changes with new migrations
pnpm prisma migrate deploy  # Apply pending migrations

# OR for development
pnpm prisma migrate dev     # Apply and regenerate client
```

---

## Advanced: Adding Related Tables

### Add Post Model (Related to User)

**Update `prisma/schema.prisma`:**

```prisma
model User {
  id    Int     @id @default(autoincrement())
  username String @unique
  email String @unique
  password String
  posts Post[]                    // One-to-many relationship
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id    Int     @id @default(autoincrement())
  title String
  content String
  userId Int                      // Foreign key
  user   User    @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
}
```

**Create migration:**

```bash
pnpm prisma:migrate -- --name add_posts_table
```

**Query with relations:**

```typescript
// Get user with all posts
const user = await prisma.user.findUnique({
  where: { id: 1 },
  include: { posts: true },
});

// Get post with author
const post = await prisma.post.findUnique({
  where: { id: 1 },
  include: { user: true },
});
```

---

## Summary

| Step | Command                                | Purpose                  |
| ---- | -------------------------------------- | ------------------------ |
| 1    | `pnpm add -D prisma @prisma/client`  | Install packages         |
| 2    | Create `.env`                        | Set database credentials |
| 3    | `npx prisma init`                    | Initialize Prisma        |
| 4    | Update `schema.prisma`               | Define data models       |
| 5    | `pnpm prisma:migrate -- --name init` | Create database tables   |
| 6    | Create `seed.ts`                     | Add dummy data script    |
| 7    | `pnpm prisma:seed`                   | Populate database        |
| 8    | Import PrismaClient                    | Start querying in apps   |

Your Prisma + Supabase setup in Turborepo is complete! 🎉
