# PR 4: Hydration and Runtime Error Fixes

## Overview

This PR fixes hydration and runtime errors in `src/app/page.tsx` that were preventing the application from running correctly. These fixes ensure the project is error-free and ready for further development work.

## Changes Made

### 1. Fixed Table Header HTML Structure

**High-level:** Fixed invalid HTML structure in the table header that was causing hydration errors in Next.js.

**Low-level:** Wrapped `<th>` elements in a `<tr>` element within `<thead>`. Changed from:

```tsx
<thead>
  <th>First Name</th>
  <th>Last Name</th>
  ...
</thead>
```

To:

```tsx
<thead>
  <tr>
    <th>First Name</th>
    <th>Last Name</th>
    ...
  </tr>
</thead>
```

In HTML, `<th>` elements cannot be direct children of `<thead>`. They must be wrapped in a `<tr>` element, which is the correct table structure.

### 2. Added Key Prop to Table Rows

**High-level:** Added `key` prop to mapped table row elements to follow React best practices and prevent potential warnings.

**Low-level:** Added `key={advocate.id}` to the `<tr>` element in the map function:

```tsx
{
  filteredAdvocates.map((advocate) => {
    return <tr key={advocate.id}>...</tr>;
  });
}
```

This ensures React can properly track and update list items during re-renders.

## Why These Changes Matter

1. **Hydration Errors:** Fixes the critical hydration mismatch error that was breaking the application
2. **HTML Validity:** Ensures the markup follows proper HTML standards
3. **React Best Practices:** Prevents potential warnings and performance issues with list rendering
4. **Clean Slate:** Provides an error-free codebase to build upon for future changes

## Result

The application now runs without hydration or runtime errors. The table structure is valid HTML, and React can properly render and update the list of advocates.
