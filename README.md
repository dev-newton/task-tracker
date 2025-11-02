# Local Task Management App

<img width="801" height="621" alt="image" src="https://github.com/user-attachments/assets/43c34a11-67e0-466f-abb2-fd19c185f6f2" />
<img width="756" height="637" alt="image" src="https://github.com/user-attachments/assets/a11efdda-72be-4d77-8e8a-a7fcd530f588" />

A small but production-minded task management application built with React and TypeScript.
The focus of this project is maintainable component structure, predictable state management, accessibility, and testable user flows rather than feature volume.

## Core Functionality

- Create tasks with a title and category
- Mark tasks as complete
- Filter tasks by category
- Persist tasks locally using browser storage
- Small UX details such as input refocus and remembering the last selected category

## Running the App
```
npm install
npm start
```

## Testing
* Run `npm test -- --watchAll` from the root directory, to run all tests.
  
### Testing Approach

The app includes both unit-level and integration-level tests to validate core behavior.

- `useTasks.test.ts`
  Verifies task state logic in isolation.

- `App.test.tsx`
  Exercises key user flows such as adding tasks, UI state changes, and persistence across renders.

The goal is to cover behavior that would realistically regress during refactors, rather than exhaustively testing implementation details.

## Technical Decisions & Trade-offs

### Accessibility

- Explicit labels are provided for all form inputs
- Table headers use proper scope attributes
- Interactive elements preserve visible focus styles
- Keyboard submission is supported

These choices ensure the UI remains usable with screen readers and keyboard navigation without sacrificing simplicity.

### Derived State Optimisation

Filtered task lists are memoised to avoid unnecessary recalculation during re-renders.
This keeps the rendering cost predictable as the task list grows.

### Stable Event Handlers

Event handlers are wrapped to avoid unnecessary re-renders of memoised child components.
This keeps component boundaries clear and prevents performance degradation over time.

### Local Persistence

Task persistence to localStorage is debounced and guarded to avoid excessive writes and handle edge cases such as storage quota errors gracefully.


## Future Improvements

If this were to evolve beyond a local demo, the next steps would include:

- Virtualised rendering for large task lists
- Error boundaries for storage and runtime failures
- API-backed persistence for multi-device support
- Sorting, due dates, and richer task metadata
- Basic CI validation for tests and linting

## Tech Stack
- React
- TypeScript
- Tailwind CSS
- React Testing Library
- Jest
