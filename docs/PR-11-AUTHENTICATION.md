# PR 11: Authentication System

## Overview

This PR implements a comprehensive authentication system using Supabase Auth, enabling secure user access with email/password and Google OAuth. The system includes route protection, session management, and a polished authentication UI with form validation and error handling.

## Changes Made

### 1. Authentication API Routes

**`src/app/api/auth/sign-in/route.ts`:**

- Handles both sign-in and sign-up actions via `action` parameter
- Uses Supabase `signInWithPassword` for authentication
- Uses Supabase `signUp` for registration
- Checks for email confirmation requirement (returns `requiresEmailConfirmation` flag)
- Properly manages cookies for SSR session handling
- Returns appropriate error messages for client display

**`src/app/api/auth/sign-out/route.ts`:**

- Handles user sign-out
- Clears Supabase session and cookies

**`src/app/api/auth/user/route.ts`:**

- Returns current authenticated user
- Used by client components to check authentication status

**`src/app/api/auth/google/route.ts`:**

- Generates Google OAuth URL server-side
- Keeps Supabase credentials secure (no `NEXT_PUBLIC_` variables needed)
- Returns OAuth URL for client-side redirect

**`src/app/auth/callback/route.ts`:**

- Handles OAuth callback from Google
- Exchanges authorization code for session
- Redirects authenticated users to home page

### 2. Middleware Protection

**`src/middleware.ts`:**

- Protects all routes except auth pages and API routes
- Redirects unauthenticated users to `/auth/login` with `redirectedFrom` parameter
- Redirects authenticated users away from auth pages (except callback)
- Handles missing Supabase env vars gracefully for development
- Uses `@supabase/ssr` for cookie management in middleware context

### 3. Authentication UI Components

**`src/app/auth/login/page.tsx`:**

- Main authentication page with tab-based navigation
- Manages active tab state (sign-in/sign-up)
- Handles post-authentication redirection

**`src/app/auth/components/auth-tabs.tsx`:**

- Tab component for switching between Sign In and Sign Up
- Uses `classNames` with object-driven conditional styling
- Visual active state indication

**`src/app/auth/components/sign-in-form.tsx`:**

- Email/password sign-in form
- Client-side validation for required fields
- Field-specific error display
- Loading states during authentication
- Instantiated variables for button text (no nested conditionals)

**`src/app/auth/components/sign-up-form.tsx`:**

- Email/password sign-up form with confirm password field
- Client-side validation (email, password, password match)
- Handles email confirmation requirement gracefully
- Shows info message (light blue) for email confirmation
- Clears form fields after successful sign-up
- Field-specific error display

**`src/app/auth/components/google-auth-button.tsx`:**

- Google OAuth sign-in button
- Uses `react-icons` for Google icon
- Calls server-side API route for OAuth URL generation
- Handles errors gracefully

**`src/app/auth/components/form-input.tsx`:**

- Reusable form input component
- Displays errors with red border and error message
- Shows required field asterisk
- Password visibility toggle with eye icons (`AiOutlineEye` / `AiOutlineEyeInvisible`)
- Uses `classNames` with object-driven conditional styling
- Proper accessibility labels

### 4. User Menu Component

**`src/app/components/user-menu/user-menu.tsx`:**

- Displays current user email
- Sign-out functionality
- Redirects to login if not authenticated
- Shows "Sign In" button for unauthenticated users
- Integrated into main advocates page header

### 5. Database Client Updates

**`src/db/client/browser-client.ts`:**

- Browser-side Supabase client (minimal usage, mostly server-side)
- Fallback support for both `NEXT_PUBLIC_` and non-prefixed env vars

## User Experience Flow

1. **Unauthenticated Access:** User visits any protected route → Redirected to `/auth/login` → Can sign in or sign up
2. **Email/Password Sign-In:** User enters credentials → Validates → Authenticates → Redirects to home
3. **Email/Password Sign-Up:** User enters credentials → Validates → Creates account → Shows email confirmation message (if required) or redirects (if auto-confirm enabled)
4. **Google OAuth:** User clicks Google button → Redirects to Google → Authenticates → Returns to callback → Redirects to home
5. **Sign-Out:** User clicks sign-out → Session cleared → Redirects to login

## Why These Changes Matter

1. **Security:** Server-side authentication keeps credentials secure, no client-side exposure
2. **User Experience:** Polished UI with clear error messages, loading states, and form validation
3. **Route Protection:** Middleware ensures only authenticated users access protected content
4. **Scalability:** Supabase Auth handles user management, password reset, email verification
5. **OAuth Integration:** Easy Google sign-in without managing OAuth flow complexity
6. **Session Management:** Proper cookie handling for SSR compatibility
7. **Code Quality:** Consistent patterns (classNames, instantiated variables, reusable components)

## Result

The application now has a complete authentication system with email/password and Google OAuth. Users can securely sign up, sign in, and access protected routes. The UI provides clear feedback, handles edge cases (email confirmation), and maintains consistent code patterns throughout.
