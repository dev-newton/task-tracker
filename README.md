# Mini Task Tracker

<img width="801" height="621" alt="image" src="https://github.com/user-attachments/assets/43c34a11-67e0-466f-abb2-fd19c185f6f2" />
<img width="756" height="637" alt="image" src="https://github.com/user-attachments/assets/a11efdda-72be-4d77-8e8a-a7fcd530f588" />

A minimal React + TypeScript app for managing daily tasks.  
Focused on clean component structure, local persistence, and accessible UX.

## Features Implemented
- Add Task: input for title, dropdown for category, add button.
- Task List: display tasks with title, category, checkbox for completion.
- Filtering: filter by category.
- Persistence: save tasks in localStorage.
- UX Details: refocus input and remember last used category.
- Testing: include at least one unit test verifying adding a task updates the list.

## How to Run
* Clone this repo to get started
* Run `npm install`
* Start the project with `npm start`

## Testing
* Run `npm test -- --watchAll` from the root directory, to run all tests.
  
- `useTasks.test.ts` → Pure Unit Tests
- `App.test.tsx` → Component Integration Tests

## Implementation Improvements
- ### Accessibility (A11y) Enhancements

  - #### What was done:
    Added hidden labels `(htmlFor + id)`, `scope="col"` on table headers, `aria-label` for checkboxes, and kept visible focus outlines. The form also supports submitting via `Enter`.
  - #### Reasoning:
    Screen readers now announce clear context such as `Task title` or `Category` before each input, and `Mark ‘Buy milk’ as complete` for checkboxes. This allows users with assistive tech to understand and navigate the UI properly.
  - #### If omitted:
    Without labels and scope attributes, screen readers would announce fields generically, lose column context in tables, and make checkbox actions unclear, reducing accessibility and usability.

- ### `useMemo` for Derived Data

  - #### What was done:
    Used `useMemo` to memoize the filtered task list, recalculating only when tasks or categoryFilter change.
  - #### Reasoning:
    Prevents redundant filtering computations during re-renders, which becomes valuable when the task list grows large.
  - #### If omitted:
    The app still works but repeatedly filters all tasks on every render. With many tasks, that adds unnecessary CPU cost and minor UI lag.

- ### `useCallback` for Event Handlers

  - #### What was done:
    Wrapped event handlers like `toggleTask` in useCallback to maintain stable function references between renders.
  
  - #### Reasoning:
    Ensures memoized child components `(e.g., TaskRow)` skip unnecessary re-renders when handler logic hasn’t changed.
  
  - #### If omitted:
    Each parent render creates a new function reference, forcing all memoized children to re-render, subtly degrading performance as the list expands.

- ### Debounced Local Storage Persistence

  - #### What was done:
    Implemented a debounced save using `setTimeout` and `useRef` to delay writes to localStorage when tasks change.
  
  - #### Reasoning:
    Prevents excessive writes to storage when users add or toggle tasks rapidly. It also wraps persistence in a try/catch to safely handle quota errors or malformed JSON.
  
  - #### If omitted:
    `localStorage.setItem` would fire on every small change (like each checkbox toggle), potentially freezing the UI for large datasets or throwing unhandled quota exceptions.

- ### Integration Tests

  - #### What was done:
    Added integration-style tests in `App.test.tsx` verifying UI behavior, ensuring form controls exist, disabled/enabled state works, input refocuses, category persists, and new tasks render correctly.
  
  - #### Reasoning:
    Confirms that key user flows (add, persist, re-render) function together, not just in isolation. This improves confidence that the app behaves correctly in real usage.
  
  - #### If omitted:
    A unit test might pass, but UI-level regressions, like a broken button or lost input focus, could slip through unnoticed.

## Possible Improvements
These improvements would further scale the app for larger data sets and real production usage.
- Virtualized task list (React-Window) for hundreds of items.
- Use stable IDs from a library like nanoid instead of crypto.randomUUID if you target older browsers.
- Lazy import components (e.g., TaskList) if app expands.
- Add a small CI script `npm test -- --watchAll=false` in GitHub Actions.
- Wrap app in an `ErrorBoundary` to handle JSON/LocalStorage errors gracefully.
- Add due dates and sorting.
- Sync tasks via an API for multi-device persistence.

## Tools Used
- React
- TypeScript
- Tailwind
