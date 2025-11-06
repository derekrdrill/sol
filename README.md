# Solace Advocates 🏥

A modern, scalable advocate directory application built with Next.js, featuring server-side rendering, real-time search, advanced filtering, and a polished user experience.

## 📋 Overview

This project transforms a basic advocate listing into a production-ready application with enterprise-grade architecture, focusing on performance, scalability, and maintainability. The application demonstrates best practices in full-stack development, type safety, and modern React patterns.

## 🎯 Improvement Strategy

### Initial State → Current State

**Starting Point:**

- Basic table-based UI
- Client-side data fetching with `useEffect`
- No search or filtering capabilities
- Minimal type safety
- No code quality tooling
- Several errors and vulnerable dependencies

**Transformation:**

- ✅ Modern component-based architecture
- ✅ Server-side rendering with Next.js App Router
- ✅ Database-backed filtering and search
- ✅ Comprehensive TypeScript typing
- ✅ Automated code quality enforcement
- ✅ Scalable API architecture
- ✅ Responsive design with Tailwind CSS
- ✅ Best practices
- ✅ No vulnerable dependencies

### Key Architectural Decisions

1. **Server-First Approach** 🖥️
   - Server components for initial data fetching
   - API routes acting as separate application layer
   - Database queries executed server-side for scalability

2. **Type Safety** 🛡️
   - Strict TypeScript configuration
   - Database result types (`DbResult<T>`)
   - Complete interface definitions for all data structures

3. **Separation of Concerns** 🧱
   - Database layer (`src/db/`) isolated from UI
   - API routes (`src/app/api/`) as abstraction layer
   - Reusable components with clear responsibilities
   - Utility functions separated from components

4. **User Experience** ✨
   - Explicit user actions (Search/Apply Filters buttons)
   - Loading states and error handling
   - Responsive grid/list views
   - Smooth transitions and visual feedback

## 🛠️ Tech Stack

### Core Framework

- **Next.js 16** - App Router with server components
- **React 18** - Client-side interactivity
- **TypeScript** - Type-safe development

### Database & Backend

- **Supabase** - PostgreSQL database with SSR support
- **@supabase/ssr** - Server-side rendering integration
- **PostgreSQL** - Relational database

### Styling & UI

- **Tailwind CSS** - Utility-first styling
- **classnames** - Conditional class management

### Development Tools

- **ESLint** - Code linting (Next.js config)
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Pre-commit formatting

### Build & Deployment

- **Next.js Build** - Optimized production builds
- **TypeScript Compiler** - Type checking

## 🏗️ Architecture

```
src/
├── app/                    # Next.js App Router
│   ├── api/                # API routes (separate application layer)
│   │   └── advocates/      # Advocate endpoints
│   ├── components/         # React components
│   │   ├── advocates-root/ # Main container
│   │   ├── advocate-card/  # Grid view item
│   │   ├── filters/        # Filter components
│   │   └── search-input/  # Search component
│   ├── page.tsx            # Server component (SSR)
│   └── error.tsx           # Error boundary
├── db/                     # Database layer
│   ├── client/             # Supabase client setup
│   ├── advocates.ts       # Database queries
│   └── errors/            # Error handling utilities
└── types/                  # TypeScript type definitions
```

## ✨ Key Features

### 🔐 Authentication

- **Email/password authentication** with Supabase Auth
- **Google OAuth** integration for seamless sign-in
- **Route protection** via Next.js middleware
- **Session management** with SSR-compatible cookie handling
- **Email confirmation** support with user-friendly messaging

### 🔍 Search & Filtering

- **Server-side search** across name, city, degree, and specialties
- **Advanced filtering** by degree, experience range, and specialties
- **Explicit user actions** with Search and Apply Filters buttons
- **Optimized queries** leveraging PostgreSQL capabilities

### 🎨 User Interface

- **Grid/List toggle** for flexible viewing preferences
- **Responsive design** adapting to all screen sizes
- **Loading states** providing clear feedback
- **Error boundaries** for graceful error handling

### ⚡ Performance

- **Server-side rendering** for faster initial load
- **Database-level filtering** reducing data transfer
- **Memoized computations** preventing unnecessary re-renders
- **Optimized queries** with proper indexing support

### 🧑🏻‍🍳 Code Quality

- **TypeScript strict mode** ensuring type safety
- **ESLint configuration** enforcing code standards
- **Prettier formatting** maintaining consistency
- **Pre-commit hooks** preventing bad commits
- **Tried and true naming conventions** for readability/adaptability

## 📝 Documentation

Comprehensive PR documentation available in `docs/`:

- **PR-1 to PR-5**: Foundation/Initial fixes (Typescript, Linting, Prettier)
- **PR-6**: Supabase Integration
- **PR-7**: UI Improvements (Grid/List, Search)
- **PR-8**: API Route Integration
- **PR-9**: Filter Additions
- **PR-10**: Backend Search & Filtering Optimization
- **PR-11**: Authentication System

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (or local PostgreSQL)

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your Supabase credentials:
# SUPABASE_URL=your_supabase_url
# SUPABASE_ANON_KEY=your_anon_key
# API_URL=http://localhost:3000

# Run development server
npm run dev
```

### Database Setup

1. Create a Supabase project and enable Row Level Security
2. Create the `advocates` table with the following schema:

```sql
create table public.advocates (
  id integer not null,
  "firstName" text not null,
  "lastName" text not null,
  city text not null,
  degree text not null,
  specialties text[] not null default array[]::text[],
  "yearsOfExperience" integer not null,
  "phoneNumber" bigint not null,
  "createdAt" timestamp without time zone null default CURRENT_TIMESTAMP,
  constraint advocates_pkey primary key (id)
) TABLESPACE pg_default;
```

3. Configure RLS policies for read access:

```sql
ALTER TABLE advocates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read on advocates"
ON public.advocates
FOR SELECT
USING (true);
```

4. Seed the database if needed

## ✨ Improvements with More Time

While the current implementation provides a solid foundation, additional time would allow for several enhancements that would further improve scalability, maintainability, and developer confidence:

### TanStack Query (React Query) 🧠

**Current:** Manual `useEffect` hooks with `fetch` calls and local state management.

**With TanStack Query:**

- **Intelligent caching** reducing redundant API calls
- **Automatic background refetching** keeping data fresh
- **Optimistic updates** for instant UI feedback
- **Request deduplication** preventing duplicate concurrent requests
- **Built-in loading/error states** simplifying component logic

This would be particularly valuable as the application scales, with multiple components potentially needing the same data. Query caching would eliminate unnecessary network requests and provide a smoother user experience.

### Zustand State Management 🐻

**Current:** React `useState` with prop drilling for shared state.

**With Zustand:**

- **Centralized state** for filters, search, and UI preferences
- **Simplified prop passing** reducing component complexity
- **Selective subscriptions** preventing unnecessary re-renders
- **Middleware support** for logging, persistence, or devtools
- **Lightweight** (only ~1KB) compared to alternatives

While React's built-in state management is sufficient for this single-page application, Zustand would provide a more scalable foundation as features grow. It would make state management more predictable and easier to debug, especially as the application expands with additional features like user preferences, favorites, or advanced filtering options.

### Comprehensive Testing Suite 🧪

**Current:** Manual testing and reliance on TypeScript for type safety.

**With Full Testing:**

**Unit Tests:**

- **Utility functions** (`applyFilters`, `filterAdvocates`) ensuring correct logic
- **Database functions** (`getAdvocates`, `getFilterOptions`) verifying query construction
- **Component logic** testing user interactions and state changes

**Integration Tests:**

- **API routes** ensuring correct parameter parsing and response formatting
- **Database layer** verifying error handling and data transformation
- **End-to-end flows** testing search → filter → results workflows

**Visual Regression Testing:**

- **Component snapshots** catching unintended UI changes
- **Responsive layouts** ensuring consistent rendering across breakpoints
- **Loading states** verifying correct feedback during async operations

**Benefits:**

- **Confidence in refactoring** knowing tests catch breaking changes
- **Documentation** tests serve as living examples of component behavior
- **Regression prevention** catching bugs before they reach production
- **Fast feedback** running tests locally before committing

A comprehensive test suite would instill confidence when scaling the application quickly, especially when adding new features or refactoring existing code. It would catch edge cases early and provide a safety net for rapid iteration.

### Advocate Profile Pages 👤

**Current:** Basic card/list views showing limited advocate information.

**With Detailed Profiles:**

- **Dedicated profile pages** (`/advocates/[id]`) displaying comprehensive advocate information
- **Granular metadata** including:
  - Detailed biography and background
  - Education history and certifications
  - Full work history and achievements
  - Clinic locations and hours
  - Patient reviews and ratings
  - Insurance accepted
  - Languages spoken
  - Areas of expertise with detailed descriptions
- **Rich media** including profile photos, clinic images, or video introductions
- **Social proof** with testimonials and case studies
- **Interactive elements** like appointment booking, contact forms, or "Save for later" functionality

This would transform the application from a simple directory into a comprehensive platform for connecting patients with advocates. The additional metadata would enable more sophisticated search and matching algorithms, while the detailed profiles would improve user trust and engagement.

### Enhanced Loading States 🔄

**Current:** Simple "Loading advocates..." text message during data fetching.

**With Modern Loading States:**

- **Skeleton screens** (shimmer effects) matching the actual content layout
- **Progressive loading** showing content as it becomes available
- **Optimistic UI** for filter changes giving instant feedback
- **Smooth transitions** between loading and loaded states
- **Contextual loading indicators** (inline spinners for filters, full-page for initial load)
- **Error state recovery** with retry mechanisms and helpful error messages

**Benefits:**

- **Perceived performance** - skeleton screens feel faster than blank screens or spinners
- **Better UX** - users understand what's loading and what to expect
- **Professional polish** - modern loading patterns match user expectations from top-tier applications
- **Accessibility** - proper ARIA labels and loading announcements for screen readers

The shimmer effect would replicate the grid/list layout during loading, providing a seamless transition that maintains visual hierarchy and reduces perceived wait time. This attention to detail elevates the user experience and demonstrates a commitment to polish and professionalism.

### Virtualized Rendering (React Virtuoso / React Window) 📜

**Current:** All advocate results rendered in the DOM simultaneously, which could cause performance issues with large result sets.

**With Virtualized Rendering:**

- **Windowed rendering** only rendering visible items plus a small buffer
- **Constant DOM size** regardless of result count (thousands of results render smoothly)
- **Improved scroll performance** with virtual scrolling techniques
- **Memory efficiency** reducing browser memory usage for large datasets
- **Smooth interactions** maintaining 60fps even with thousands of items

**Benefits:**

- **Scalability** - handles thousands of results without performance degradation
- **Better UX** - smooth scrolling and interactions regardless of result count
- **Resource efficiency** - minimal DOM nodes reduce memory footprint
- **Production-ready** - essential for applications expecting large result sets

Libraries like React Virtuoso or React Window would enable rendering only the visible portion of the results list, dramatically improving performance when potentially thousands of advocates are returned. This would ensure the application remains responsive and performant as the dataset grows, providing a seamless user experience even with extensive result sets.

### Sorting Implementation 🔢

**Current:** Results displayed in database default order without user-controlled sorting options.

**With Sorting:**

- **Multiple sort options** by name (A-Z, Z-A), experience (low-high, high-low), city, degree
- **UI controls** dropdown or button group for selecting sort criteria
- **Server-side sorting** leveraging PostgreSQL `ORDER BY` for efficient sorting
- **Persistent sort preference** maintaining sort selection across filter changes
- **Visual indicators** showing current sort direction and field

**Benefits:**

- **User control** - users can organize results to their preference
- **Better discoverability** - sorting by experience helps find most qualified advocates
- **Database efficiency** - PostgreSQL handles sorting efficiently at query time
- **Simple implementation** - straightforward addition to existing query structure

While the implementation would be relatively straightforward, adding sorting controls and integrating them with the existing filter and search functionality would provide users with more control over how results are displayed, improving the overall user experience and making it easier to find advocates that match specific criteria.

### Better Relational Database Setup 🗄️

**Current:** `specialties` stored as a PostgreSQL text array (`text[]`) within the `advocates` table.

**With Normalized Schema:**

- **Separate `specialties` table** with unique specialty entries
- **Junction table** (`advocate_specialties`) linking advocates to specialties via foreign keys
- **Referential integrity** ensuring data consistency
- **Reduced storage** eliminating redundant specialty strings across multiple advocates
- **Better query performance** with proper indexing on specialty lookups
- **Easier management** allowing specialty names to be updated in one place

**Benefits:**

- **Storage efficiency** - specialty strings stored once instead of replicated across many rows
- **Data integrity** - foreign key constraints prevent orphaned references
- **Query optimization** - indexes on specialty lookups improve filter performance
- **Maintainability** - updating specialty names or adding metadata (descriptions, categories) becomes straightforward
- **Scalability** - supports future features like specialty hierarchies, tags, or metadata

**Example Schema:**

```sql
create table public.specialties (
  id serial primary key,
  name text not null unique,
  description text,
  category text,
  "createdAt" timestamp without time zone default CURRENT_TIMESTAMP
);

create table public.advocate_specialties (
  "advocateId" integer not null references advocates(id) on delete cascade,
  "specialtyId" integer not null references specialties(id) on delete cascade,
  primary key ("advocateId", "specialtyId")
);

create index idx_advocate_specialties_advocate on advocate_specialties("advocateId");
create index idx_advocate_specialties_specialty on advocate_specialties("specialtyId");
```

This normalization would follow proper relational database design principles, reducing storage overhead and improving query performance as the dataset grows. While the current array-based approach works well for smaller datasets, a normalized structure would be essential for production-scale applications with thousands of advocates and dozens of specialties.

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Check code formatting
- `npm run format` - Format code with Prettier

## 📄 License

This project was created as part of a technical assessment.
