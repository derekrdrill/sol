# PR 1: Dependency Updates & Deprecation Fixes

## Changes Made

### Direct Dependency Updates

- **Next.js**: Upgraded from `^14.2.19` to `^16.0.1` - fixes critical security vulnerabilities and updates to latest stable version
- **ESLint**: Upgraded from `^8.57.0` to `^9.39.1` - resolves deprecated ESLint v8 warning
- **eslint-config-next**: Updated to `^16.0.1` for compatibility with ESLint 9

### Tooling Updates

- **Replaced `esbuild-register` with `tsx`**: Updated seed script to use `tsx` instead of deprecated `esbuild-register`

## Why This Was Important

1. **Security**: Next.js 14 had **critical security vulnerabilities** that are patched in v16 - continuing to use compromised dependencies posed a security risk
2. **Maintenance**: Deprecated packages (`inflight`, `rimraf@3`, `glob@7`, `@esbuild-kit/*`, `eslint@8`) are no longer supported and may leak memory or have security issues - these needed immediate attention
3. **Best Practices**: Using deprecated packages violates modern development standards and creates technical debt
4. **Future-proofing**: Using supported packages ensures continued compatibility and security updates

## Gitignore

The `.gitignore` file appropriately excludes `node_modules` to avoid committing large dependency directories. `package-lock.json` should remain tracked to ensure consistent dependency versions across environments.
