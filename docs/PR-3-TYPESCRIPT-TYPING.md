# PR 3: TypeScript Type Fixes in page.tsx

## Overview

This PR addresses TypeScript type errors in `src/app/page.tsx` that were preventing proper type checking. These errors occurred because TypeScript couldn't infer the types of function parameters, state variables, and data structures. Fixing these errors ensures type safety throughout the application and prevents runtime errors.

## Changes Made

### 1. Created Advocate Type Definition (`src/app/types.ts`)

**High-level:** Extracted the `Advocate` interface into a separate types file to establish a single source of truth for advocate data structure.

**Low-level:** Created a new file `src/app/types.ts` with an `Advocate` interface defining:

- `firstName`, `lastName`, `city`, `degree`: string properties
- `specialties`: array of strings
- `yearsOfExperience`: number
- `phoneNumber`: number

This allows the type to be reused across components and ensures consistency.

### 2. Typed React State Variables

**High-level:** Added explicit type annotations to `useState` hooks so TypeScript knows what data structure is stored in state.

**Low-level:** Changed from:

```typescript
const [advocates, setAdvocates] = useState([]);
const [filteredAdvocates, setFilteredAdvocates] = useState([]);
```

To:

```typescript
const [advocates, setAdvocates] = useState<Advocate[]>([]);
const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
```

Without the type annotation, TypeScript inferred `never[]`, making it impossible to access properties on advocate objects.

### 3. Typed Event Handler Parameter

**High-level:** Added explicit type to the `onChange` event handler parameter to satisfy TypeScript's `noImplicitAny` requirement.

**Low-level:** Changed from:

```typescript
const onChange = (e) => {
```

To:

```typescript
const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
```

This tells TypeScript that `e` is a React change event for an HTML input element, allowing access to `e.target.value` with proper typing.

### 4. Added Null Check for DOM Element

**High-level:** Added a null check before accessing DOM element properties to prevent potential runtime errors.

**Low-level:** Changed from:

```typescript
document.getElementById("search-term").innerHTML = searchTerm;
```

To:

```typescript
const searchTermElement = document.getElementById("search-term");
if (searchTermElement) {
  searchTermElement.innerHTML = searchTerm;
}
```

`getElementById` can return `null` if the element doesn't exist. TypeScript requires checking for null before accessing properties to prevent runtime errors.

### 5. Fixed Array Search Logic

**High-level:** Corrected the filter logic to properly search through array and number fields.

**Low-level:** Changed from:

```typescript
advocate.specialties.includes(searchTerm) ||
  advocate.yearsOfExperience.includes(searchTerm);
```

To:

```typescript
advocate.specialties.some((specialty) => specialty.includes(searchTerm)) ||
  advocate.yearsOfExperience.toString().includes(searchTerm);
```

- `specialties` is an array, so we use `.some()` to check if any specialty contains the search term
- `yearsOfExperience` is a number, so we convert it to a string before using `.includes()`

### 6. Typed Map Function Parameter

**High-level:** Added explicit type to the map callback parameter to satisfy TypeScript requirements.

**Low-level:** Changed from:

```typescript
{
  advocate.specialties.map((s) => <div>{s}</div>);
}
```

To:

```typescript
{
  advocate.specialties.map((s: string) => <div key={s}>{s}</div>);
}
```

Added the `string` type annotation and a `key` prop for React's list rendering requirements.

## Why These Changes Matter

1. **Type Safety:** Proper typing catches errors at compile time instead of runtime
2. **Developer Experience:** IDEs can provide better autocomplete and error detection
3. **Code Quality:** Explicit types make the codebase more maintainable and self-documenting
4. **Prevents Bugs:** Type checking prevents common mistakes like accessing properties on undefined values or calling methods on wrong types
5. **Team Collaboration:** Clear type definitions help other developers understand the data structures

## Result

All TypeScript errors in `page.tsx` have been resolved. The code now has full type coverage and passes TypeScript's strict type checking.
