# PR 1: Dependency Updates & Deprecation Fixes

## Changes Made

### Direct Dependency Updates

- **Next.js**: Upgraded from `^14.2.19` to `^16.0.1` - fixes critical security vulnerabilities and updates to latest stable version
- **ESLint**: Upgraded from `^8.57.0` to `^9.39.1` - resolves deprecated ESLint v8 warning
- **eslint-config-next**: Updated to `^16.0.1` for compatibility with ESLint 9
- **drizzle-kit**: Updated from `^0.23.0` to `^0.31.6` - latest stable version

### Tooling Updates

- **Replaced `esbuild-register` with `tsx`**: Updated seed script to use `tsx` instead of deprecated `esbuild-register`
- **Added npm `overrides`**: Forces `drizzle-kit`'s deprecated transitive dependencies (`@esbuild-kit/esm-loader`, `@esbuild-kit/core-utils`, `esbuild-register`) to use `tsx` instead

## Why This Was Important

1. **Security**: Next.js 14 had critical vulnerabilities that are patched in v16
2. **Maintenance**: Deprecated packages (`inflight`, `rimraf@3`, `glob@7`, `@esbuild-kit/*`, `eslint@8`) are no longer supported and may leak memory or have security issues
3. **Future-proofing**: Using supported packages ensures continued compatibility and security updates

## Override Solution

The npm `overrides` approach was chosen to resolve deprecated transitive dependencies from `drizzle-kit`. Ideally, we would wait for `drizzle-kit` to update their dependencies, but given time constraints and the fact that `tsx` is the recommended replacement for `@esbuild-kit` packages, this is an acceptable solution. The override replaces deprecated packages with their modern equivalent (`tsx`) without breaking functionality.

## Gitignore

The `.gitignore` file appropriately excludes `node_modules` to avoid committing large dependency directories. `package-lock.json` should remain tracked to ensure consistent dependency versions across environments.
