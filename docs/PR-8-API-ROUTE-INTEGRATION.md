# PR 8: API Route Integration & Error Handling

## Overview

This PR refactors the application to use API routes instead of direct database calls, following the specification requirement to make all API calls through the Next.js backend. This change treats the API server as a separate application and improves error handling with Next.js error boundaries.

## Changes Made

### 1. API Route Implementation

Updated `src/app/api/advocates/route.ts`:

- Returns proper HTTP status codes (500 for errors)
- Returns data in consistent format: `{ data: [...] }` or `{ error: string }`

### 2. Server Component API Calls

Modified `src/app/page.tsx`:

- Changed from direct database call to HTTP fetch to `/api/advocates`
- Uses `API_URL` environment variable with fallback to `http://localhost:3000`
- Treats API as separate application (uses HTTP fetch instead of direct import)
- Removed try/catch block (handled by error boundary)

### 3. Error Boundary

Created `src/app/error.tsx`:

- Next.js error boundary component for handling errors
- Displays error message with user-friendly UI
- Provides "Try again" button to reset error state
- Follows Next.js App Router error handling patterns

## Why These Changes Matter

1. **Specification Compliance:** Follows the requirement to make all API calls through Next.js backend
2. **Separation of Concerns:** Treats API server as separate application, improving architecture
3. **Better Error Handling:** Uses Next.js error boundaries instead of try/catch in components
4. **Flexibility:** API URL can be configured via environment variable for different environments
5. **HTTP Standards:** Proper status codes and response formats

## Environment Variables

- `API_URL` - Base URL for API calls (defaults to `http://localhost:3000`)

## Result

The application now makes all data requests through the API route endpoint, treating it as a separate application. Error handling is improved with Next.js error boundaries, providing a better user experience when errors occur.
