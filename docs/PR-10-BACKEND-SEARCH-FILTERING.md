# PR 10: Backend Search & Filtering Optimization

## Overview

This PR migrates search and filtering logic from client-side to server-side processing. This improves scalability and performance by moving data filtering to the database layer, reducing client-side processing and enabling efficient handling of large datasets.

## Changes Made

### 1. Database Layer Updates

**`src/db/advocates.ts`:**

- Added `AdvocateSearchParams` interface for search and filter parameters
- Updated `getAdvocates()` to accept optional search/filter parameters
- Implemented Supabase queries:
  - **Search:** Uses `.or()` with `ilike` for case-insensitive matching across firstName, lastName, city, and degree
  - **Degrees:** Uses `.in()` for exact matching on multiple degree values
  - **Experience:** Uses `.lt()`, `.gte()`, `.lte()`, `.gt()` for numeric range filtering
  - **Specialties:** Uses `.overlaps()` for array intersection matching
- Created `getFilterOptions()` function to fetch unique degrees and specialties from database

### 2. API Routes

**`src/app/api/advocates/route.ts`:**

- Updated to parse query parameters (`search`, `degrees`, `experienceRange`, `specialties`)
- Handles comma-separated values for multi-select filters
- Passes parsed parameters to `getAdvocates()`

**`src/app/api/advocates/filter-options/route.ts`:**

- New endpoint to fetch available filter options (degrees and specialties)
- Returns unique values extracted from database for dynamic filter population

### 3. Client Component Updates

**`src/app/components/search-input/search-input.tsx`:**

- Added search button to trigger search (instead of real-time filtering)
- Added `onSearch` callback prop
- Added `isLoading` prop for disabled state during requests
- Added Enter key support to trigger search

**`src/app/components/filters/filter-panel.tsx`:**

- Added local state (`localFilters`) for temporary filter selections
- Added "Apply Filters" button to trigger backend call
- Added "Reset" button to clear all filters
- Panel closes automatically after applying filters
- Filter selections no longer trigger immediate API calls

**`src/app/components/filters/filter-button.tsx`:**

- Renamed prop from `onFiltersChange` to `onApplyFilters` to reflect new behavior

**`src/app/components/advocates-root/advocates-root.tsx`:**

- Removed client-side filtering logic (`filterAdvocates`, `applyFilters`)
- Added `activeSearchTerm` state (separate from input value)
- Implemented API fetching when filters/search change
- Uses initial data when no filters/search are active (optimization)
- Added loading states during API calls
- Fetches filter options on mount from `/api/advocates/filter-options`
- Only triggers API calls when Search button or Apply Filters button is clicked

### 4. Removed Client-Side Filtering

- Removed `applyFilters()` usage from `advocates-root.tsx`
- Removed `filterAdvocates()` integration (kept utility for potential future use)
- Removed `getUniqueDegrees()` and `getUniqueSpecialties()` usage (now fetched from API)

## User Experience Flow

1. **Search:** User types in search input → clicks Search button (or presses Enter) → API call with search term
2. **Filters:** User opens filter panel → selects options → clicks Apply Filters → API call with selected filters + current search term
3. **Combined:** Search and filters work together—each action uses current values of both
4. **Reset:** Reset button clears all filters and triggers fetch with cleared state

## Why These Changes Matter

1. **Scalability:** Database-level filtering handles large datasets efficiently without loading all data to client
2. **Performance:** Reduces client-side processing and memory usage
3. **Network Efficiency:** Only fetches filtered results instead of all data
4. **User Control:** Explicit actions (Search/Apply Filters buttons) prevent accidental API calls while typing
5. **Consistency:** Search and filters always use current values, preventing stale state issues
6. **Database Optimization:** Leverages Supabase/PostgreSQL query optimization and indexing

## Result

Search and filtering now happen entirely on the backend. Users trigger searches and filters with explicit button clicks, improving performance and ensuring data consistency. The system scales efficiently with large datasets by leveraging database query capabilities.
