==> Uploading build...
==> Uploaded in 10.8s. Compression took 46.3s
==> Build successful 🎉
==> Setting WEB_CONCURRENCY=1 by default, based on available CPUs in the instance
==> Deploying...
==> Running 'node apps/backend/dist/index.js'
[dotenv@17.2.3] injecting env (0) from .env -- tip: 🛠️  run anywhere with `dotenvx run -- yourcommand`
/opt/render/project/src/node_modules/.pnpm/@prisma+client@5.22.0_prisma@5.22.0/node_modules/@prisma/client/runtime/library.js:124
It should have this form: { url: "CONNECTION_STRING" }`);if(typeof o!="string")throw new F(`Invalid value ${JSON.stringify(o)} for datasource "${r}" provided to PrismaClient constructor.
                                                                               ^
PrismaClientConstructorValidationError: Invalid value undefined for datasource "db" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }
Read more at https://pris.ly/d/client-constructor
    at Object.datasources (/opt/render/project/src/node_modules/.pnpm/@prisma+client@5.22.0_prisma@5.22.0/node_modules/@prisma/client/runtime/library.js:124:86)
    at Gl (/opt/render/project/src/node_modules/.pnpm/@prisma+client@5.22.0_prisma@5.22.0/node_modules/@prisma/client/runtime/library.js:126:2527)
    at new t (/opt/render/project/src/node_modules/.pnpm/@prisma+client@5.22.0_prisma@5.22.0/node_modules/@prisma/client/runtime/library.js:130:748)
    at Object.<anonymous> (/opt/render/project/src/packages/db/dist/index.js:6:5)
    at Module._compile (node:internal/modules/cjs/loader:1803:14)
    at Object..js (node:internal/modules/cjs/loader:1934:10)
    at Module.load (node:internal/modules/cjs/loader:1524:32)
    at Module._load (node:internal/modules/cjs/loader:1326:12)
    at TracingChannel.traceSync (node:diagnostics_channel:328:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:245:24)
Node.js v25.4.0
==> Exited with status 1
==> Common ways to troubleshoot your deploy: https://render.com/docs/troubleshooting-deploys
Need better ways to work with logs? Try theRender CLI, Render MCP Server, or set up a log stream i