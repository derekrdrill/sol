# PR 9: Filter Additions

## Overview

This PR adds a filtering system allowing users to filter advocates by degree, years of experience, and specialties. Filters integrate seamlessly with existing search functionality.

## Changes Made

### New Components (`src/app/components/filters/`)

**`filter-button.tsx`:**

- Filter button with active filter count badge
- Opens/closes dropdown panel with click-outside detection
- Responsive design

**`filter-panel.tsx`:**

- Dropdown panel with filter options
- Multi-select checkboxes for degrees and specialties
- Single-select radio buttons for experience ranges (Less than 5, 5-10, Greater than 10 years)
- Scrollable specialties section

**`types.ts`:**

- `AdvocateFilters` interface: `degrees[]`, `experienceRange`, `specialties[]`
- `EXPERIENCE_RANGES` constant

**`utils.ts`:**

- `applyFilters()`: Filters advocates by degree (exact match), experience (numeric ranges), and specialties (OR logic)
- Helper functions: `getUniqueDegrees()`, `getUniqueSpecialties()`, `getDefaultFilters()`, `getActiveFilterCount()`

### Integration

**`advocates-root.tsx`:**

- Added filter state management
- Computed available filter options from advocates list using `useMemo`
- Integrated `FilterButton` next to search input
- Combined search + filters in `filteredAdvocates` memo

**`search-input/utils.ts`:**

- Updated `filterAdvocates()` to accept `AdvocateFilters`
- Applies search first, then filter criteria (sequential filtering)

**`index.ts`:**

- Exported `FilterButton` component

## Filter Logic

- **Degree:** Exact string matching
- **Experience:** Numeric comparison (< 5, 5-10, > 10)
- **Specialties:** OR logic (advocate must have ANY selected specialty)
- **Combined:** AND logic (must match all selected criteria)

## Why These Changes Matter

- Quick filtering without text search
- Dynamically generated options from available data
- Memoized for performance
- Accessible form controls with proper labels
- Responsive design with visual feedback (active filter count badge)
- Works seamlessly with existing search

## Result

Users can filter by degree (multi-select), experience range (single-select), and specialties (multi-select). Filters combine with search for effective result narrowing. Filter button shows active filter count badge.
