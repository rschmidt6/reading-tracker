// EditBookForm.tsx
import { useState } from "react";
import { Book as BookType, Status, statuses } from "../Types";

interface EditBookFormProps {
  book: BookType;
  onSubmit: (updatedBook: BookType) => void;
  onStopEdit: () => void;
}

export default function EditBook({
  book,
  onSubmit,
  onStopEdit,
}: EditBookFormProps) {
  // Initialize form state with current book values
  const [currentPage, setCurrentPage] = useState(book.currentPage);
  const [status, setStatus] = useState<Status>(book.status || "not started");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate inputs
    if (currentPage > book.pageCount || currentPage < 0) return;

    // Create updated book object
    const updatedBook: BookType = {
      ...book,
      currentPage,
      status,
    };

    onSubmit(updatedBook);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Update "{book.title}"</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Current Page (out of {book.pageCount}):
          </label>
          <input
            type="number"
            value={currentPage}
            onChange={(e) => setCurrentPage(Number(e.target.value))}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status:
          </label>
          <div className="mt-1 space-x-4">
            {statuses.map((s) => (
              <label key={s} className="inline-flex items-center">
                <input
                  type="radio"
                  checked={status === s}
                  onChange={() => setStatus(s)}
                  className="mr-2"
                />
                <span className="capitalize">{s}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={onStopEdit}
            className="px-4 py-2 bg-gray-200 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
