# PR 6: Supabase Integration & Server-Side Data Fetching

## Overview

This PR integrates Supabase as the database backend and refactors the application to fetch data server-side instead of using client-side `useEffect`. This improves performance, SEO, and follows Next.js App Router best practices.

## Changes Made

### 1. Supabase Client Setup

Created `src/db/client/client.ts` that configures Supabase with SSR support for Next.js App Router:

- Uses `@supabase/ssr` package for server-side rendering
- Handles both middleware and route handler/server component modes
- Properly manages cookies for authentication state
- Uses environment variables (`SUPABASE_URL`, `SUPABASE_ANON_KEY`)

### 2. Database Error Handling Utilities

Created `src/db/errors/errors.helpers.ts` with standardized error handling:

- `createError` / `createSuccess` - Standardized result creation
- `handleSupabaseError` - Converts Supabase query results to DbResult format
- `handleDbOperation` - Wraps operations with error handling
- `notFound` / `validationError` - Specific error types
- `getErrorMessage` / `formatErrorMessage` - Error message utilities

### 3. Database Query Functions

Created `src/db/advocates.ts`:

- `getAdvocates()` function that queries the `advocates` table
- Returns `DbResult<Advocate[]>` for type-safe error handling
- Uses `handleSupabaseError` for consistent error handling

### 4. Server-Side Data Fetching

Modified `src/app/page.tsx`:

- Removed `'use client'` directive
- Made component `async` to enable server-side data fetching
- Calls `getAdvocates()` directly server-side
- Handles errors gracefully
- Passes data to client component for interactivity

Created `src/app/advocates.tsx`:

- Client component that handles search and filtering
- Receives initial data as props from server component
- No longer needs `useEffect` for initial data fetch

### 5. Dependencies

Added to `package.json`:

- `@supabase/ssr@^0.7.0` - Server-side rendering support
- `@supabase/supabase-js@^2.79.0` - Supabase JavaScript client

## Why These Changes Matter

1. **Performance:** Server-side data fetching eliminates client-side loading states and reduces TTFB
2. **SEO:** Data is available on initial page load, improving search engine indexing
3. **Type Safety:** Typed database operations with `DbResult<T>` provide compile-time error checking
4. **Best Practices:** Follows Next.js 13+ App Router patterns for server/client component separation

## Database Setup Required

1. **Environment Variables:**
   - `SUPABASE_URL` - Your Supabase project URL
   - `SUPABASE_ANON_KEY` - Your Supabase anonymous key

2. **Row Level Security (RLS):**

   ```sql
   ALTER TABLE advocates ENABLE ROW LEVEL SECURITY;

   CREATE POLICY "Allow read on advocates"
   ON public.advocates
   FOR SELECT
   USING (true);
   ```

## Result

The application now fetches advocate data from Supabase server-side, eliminating the need for client-side `useEffect` hooks. Data is available immediately on page load, improving performance and user experience. Error handling is standardized and type-safe throughout the database layer.
