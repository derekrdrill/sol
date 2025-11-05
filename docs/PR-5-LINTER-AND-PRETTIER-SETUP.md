# PR 5: Linter and Prettier Setup

## Changes Made

### ESLint Configuration

- Created `eslint.config.mjs` with ESLint 9 flat config format
- Extends Next.js core web vitals and TypeScript rules
- Ignores build artifacts and config files

### Prettier Configuration

- Created `.prettierrc` with consistent formatting rules
- Created `.prettierignore` to exclude build artifacts and lock files

### Git Hooks

- Set up Husky with pre-commit hook
- Configured lint-staged to auto-format staged files on commit
- Added `lint-staged` configuration in `package.json`

### Scripts

- Added npm scripts: `lint`, `format`, `lint:fix`, `format:check`

### Dependencies

- Added `eslint`, `eslint-config-next`, `@eslint/eslintrc`
- Added `prettier`, `husky`, `lint-staged`

## Why This Was Important

Ensures consistent code formatting across the codebase and prevents unformatted code from being committed via pre-commit hooks.
