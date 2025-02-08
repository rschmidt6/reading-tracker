## Personal Reading List Manager

Core Features:

Add/remove books with details:

Title
Author
Page count
Multiple genres (like your categories)
Reading status (Not Started, In Progress, Completed)
Optional: Reading progress (page number/percentage)

Advanced State Management:

Implement undo/redo for actions (adding/removing/updating books)
Persist data in localStorage
Add error handling for duplicate books

Performance & UX:

Implement virtual scrolling for large lists
Add loading states
Memoize expensive calculations (like filtering/sorting)

Filtering & Sorting:

Filter by multiple genres
Filter by reading status
Sort by title, author, progress, or date added
Search functionality across titles and authors

Accessibility:

Keyboard navigation for book list
ARIA labels
Focus management
Screen reader friendly status updates

Statistics Dashboard:

Total books by status
Reading progress across all books
Pages read this month
Average reading progress
Genre distribution

---

## Project Structure

Main App component
Book component (like your Todo component)
Statistics Dashboard component
Shared types/interfaces
Custom hooks for complex logic

Data Structure

Book object would have: id, title, author, pageCount, genres[], status, currentPage, dateAdded
UndoHistory object to track state changes
Keep main state in App component, pass down via props

localStorage Implementation Strategy

localStorage is a simple key-value store in the browser
Basic pattern:

Load data from localStorage when app mounts
Save to localStorage whenever state changes
Create a custom hook called useLocalStorage to handle this
Handle errors (storage full, parsing errors)

Undo/Redo System

Keep a history array of previous states
Keep track of current position in history
Save both current state and history to localStorage

Performance Optimizations

Wrap expensive calculations in useMemo
Wrap handler functions in useCallback
Use windowing/virtualization for long lists (react-window library)

## tricks to remember from this

-the localstorage custom hook

-this progress bar trick as well as this computed prop:
const progress = Math.round((book.currentPage / book.pageCount) \* 100);
style={{ width: `${progress}%` }}
# reading-tracker
