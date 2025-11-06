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

## Issues Addressed

This PR addresses **code quality problems** and **inconsistent formatting**:

1. **No Code Standards:** Codebase lacked linting and formatting rules, leading to inconsistent style
2. **Manual Formatting:** Without automated tools, developers had to manually ensure code quality
3. **Pre-commit Protection:** No git hooks to prevent bad code from being committed

## Why This Was Important

1. **Code Quality:** Automated linting catches bugs and enforces best practices before code reaches production
2. **Consistency:** Ensures consistent code formatting across the codebase, making it easier to read and maintain
3. **Prevents Bad Commits:** Pre-commit hooks prevent unformatted or problematic code from being committed
4. **Team Standards:** Establishes clear code quality standards that all contributors must follow
5. **Best Practices:** Follows industry-standard tooling for TypeScript/React projects
