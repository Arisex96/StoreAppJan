2026-01-22T05:19:23.141272058Z ==> Cloning from https://github.com/Arisex96/StoreAppJan
2026-01-22T05:19:23.679471954Z ==> Checking out commit ca36d4d2eb438a1249c1a5e96255a0eac416e3f5 in branch main
2026-01-22T05:19:25.252935983Z ==> Using Node.js version 22.22.0 (default)
2026-01-22T05:19:25.277954854Z ==> Docs on specifying a Node.js version: https://render.com/docs/node-version
2026-01-22T05:19:29.259171274Z ==> Running build command 'pnpm install --frozen-lockfile; pnpm run build'...
2026-01-22T05:19:31.924647069Z Scope: all 8 workspace projects
2026-01-22T05:19:44.331113226Z .../sharp@0.34.5/node_modules/sharp install$ node install/check.js || npm run build
2026-01-22T05:19:44.35414757Z .../node_modules/@prisma/engines postinstall$ node scripts/postinstall.js
2026-01-22T05:19:44.422680892Z .../esbuild@0.27.2/node_modules/esbuild postinstall$ node install.js
2026-01-22T05:19:44.493657448Z .../bcrypt@6.0.0/node_modules/bcrypt install$ node-gyp-build
2026-01-22T05:19:44.51546455Z .../esbuild@0.27.2/node_modules/esbuild postinstall: Done
2026-01-22T05:19:44.517846964Z .../sharp@0.34.5/node_modules/sharp install: Done
2026-01-22T05:19:44.602809738Z .../bcrypt@6.0.0/node_modules/bcrypt install: Done
2026-01-22T05:19:46.296841092Z .../node_modules/@prisma/engines postinstall: Done
2026-01-22T05:19:46.384526296Z .../prisma@5.22.0/node_modules/prisma preinstall$ node scripts/preinstall-entry.js
2026-01-22T05:19:46.44235069Z .../prisma@5.22.0/node_modules/prisma preinstall: Done
2026-01-22T05:19:46.512286898Z .../node_modules/@prisma/client postinstall$ node scripts/postinstall.js
2026-01-22T05:19:47.188098558Z .../node_modules/@prisma/client postinstall: prisma:warn We could not find your Prisma schema in the default locations (see: https://pris.ly/d/prisma-schema-location).
2026-01-22T05:19:47.21048708Z .../node_modules/@prisma/client postinstall: If you have a Prisma schema file in a custom path, you will need to run
2026-01-22T05:19:47.21052975Z .../node_modules/@prisma/client postinstall: `prisma generate --schema=./path/to/your/schema.prisma` to generate Prisma Client.
2026-01-22T05:19:47.210537291Z .../node_modules/@prisma/client postinstall: If you do not have a Prisma schema file yet, you can ignore this message.
2026-01-22T05:19:47.210556591Z .../node_modules/@prisma/client postinstall: Done
2026-01-22T05:19:47.59625109Z 
2026-01-22T05:19:47.596275831Z dependencies:
2026-01-22T05:19:47.596280491Z + @repo/db 0.0.1 <- ../../packages/db
2026-01-22T05:19:47.596284141Z + @types/cors 2.8.19
2026-01-22T05:19:47.596287311Z + @types/express 5.0.6
2026-01-22T05:19:47.596290171Z + bcrypt 6.0.0
2026-01-22T05:19:47.596293051Z + concurrently 9.2.1
2026-01-22T05:19:47.596295811Z + cors 2.8.5
2026-01-22T05:19:47.596298591Z + esbuild 0.27.2
2026-01-22T05:19:47.596301431Z + express 5.2.1
2026-01-22T05:19:47.596304361Z + jsonwebtoken 9.0.3
2026-01-22T05:19:47.596307111Z + nodemon 3.1.11
2026-01-22T05:19:47.596309891Z + zod 4.3.5
2026-01-22T05:19:47.596312561Z 
2026-01-22T05:19:47.596315352Z devDependencies:
2026-01-22T05:19:47.596318601Z + @repo/typescript-config 0.0.0 <- ../../packages/typescript-config
2026-01-22T05:19:47.596321401Z + @types/bcrypt 6.0.0
2026-01-22T05:19:47.596324802Z + @types/jsonwebtoken 9.0.10
2026-01-22T05:19:47.596338492Z + @types/node 22.15.3
2026-01-22T05:19:47.596340332Z + ts-node 10.9.2
2026-01-22T05:19:47.596342072Z + typescript 5.9.3
2026-01-22T05:19:47.596343652Z 
2026-01-22T05:19:47.832175633Z Done in 16.2s
2026-01-22T05:19:48.643010977Z 
2026-01-22T05:19:48.712873553Z > backend@1.0.0 build /opt/render/project/src/apps/backend
2026-01-22T05:19:48.712887043Z > tsc
2026-01-22T05:19:48.712891493Z 
2026-01-22T05:19:49.789062281Z src/index.ts(3,20): error TS2307: Cannot find module 'dotenv' or its corresponding type declarations.
2026-01-22T05:19:49.789261045Z src/index.ts(8,24): error TS2307: Cannot find module '@repo/db' or its corresponding type declarations.
2026-01-22T05:19:49.812268818Z  ELIFECYCLE  Command failed with exit code 2.
2026-01-22T05:19:50.63767758Z ==> Build failed 😞
2026-01-22T05:19:50.63770285Z ==> Common ways to troubleshoot your deploy: https://render.com/docs/troubleshooting-deploys