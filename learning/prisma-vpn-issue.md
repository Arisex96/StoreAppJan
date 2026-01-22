# Prisma Database Connection Issue Due to VPN

**Date:** January 22, 2026

## Problem

When running Prisma commands (e.g., `npx prisma migrate status`), the following error occurred:

```
Error: P1001: Can't reach database server at `aws-1-ap-northeast-1.pooler.supabase.com:5432`
```

## Cause

A VPN service was active on the PC, which interfered with the network connection to the remote Supabase PostgreSQL database. This caused Prisma to be unable to reach the database server.

## Solution

- Disable or disconnect the VPN service.
- Retry the Prisma command.
- The connection to the database should now work as expected.

## Notes

- VPNs can block or reroute traffic, causing issues with remote database connections.
- Always check VPN/firewall settings if you encounter connectivity issues with cloud services.
