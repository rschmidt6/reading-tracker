import { useState } from "react";
import { Book as BookType, Status, Genre, genres, statuses } from "../Types";

interface AddBookTabProps {
  readingList: BookType[];
  setReadingList: React.Dispatch<React.SetStateAction<BookType[]>>;
}

export default function AddBookTab({
  readingList,
  setReadingList,
}: AddBookTabProps) {
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookPageTotal, setBookPageTotal] = useState(100);
  const [bookCurrentPage, setBookCurrentPage] = useState(0);
  const [bookStatus, setBookStatus] = useState<Status>("not started");
  const [bookGenres, setBookGenres] = useState<Set<Genre>>(new Set());

  const handleBookTitle = (text: string) => {
    setBookTitle(text);
  };
  const handleBookAuthor = (text: string) => {
    setBookAuthor(text);
  };

  const handleBookPageTotal = (num: number) => {
    setBookPageTotal(num);
  };

  const handleBookCurrentPage = (num: number) => {
    setBookCurrentPage(num);
  };

  const handleBookGenreSelect = (genre: Genre) => {
    setBookGenres((prev) => {
      const next = new Set(prev);

      if (next.has(genre)) {
        next.delete(genre);
      } else {
        next.add(genre);
      }

      return next;
    });
  };

  const handleBookStatusSelect = (status: Status) => {
    setBookStatus(status);
  };

  const handleBookSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Current reading list:", readingList);

    if (typeof setReadingList !== "function") {
      console.error("setReadingList is not a function:", setReadingList);
      return;
    }

    if (!bookTitle.trim() || !bookAuthor.trim()) return;
    if (bookPageTotal < 1) return;
    if (bookCurrentPage < 0) return;
    if (bookCurrentPage > bookPageTotal) return;

    // Create the new book object
    const newBook = {
      id: Date.now().toString(),
      title: bookTitle,
      author: bookAuthor,
      pageCount: bookPageTotal,
      currentPage: bookCurrentPage,
      status: bookStatus,
      genres: Array.from(bookGenres),
      dateAdded: Date.now(),
    };

    setReadingList((prev) => {
      return [...(prev || []), newBook];
    });

    setBookTitle("");
    setBookAuthor("");
    setBookPageTotal(100);
    setBookCurrentPage(0);
    setBookStatus("not started");
    setBookGenres(new Set());
  };

  return (
    <>
      <form
        onSubmit={handleBookSubmit}
        className="space-y-6 bg-white p-6 rounded-lg shadow-sm"
      >
        <div className="text-2xl font-semibold text-gray-700 mb-4">
          Add a book to track:
        </div>

        {/* Text inputs in a responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={bookTitle}
            onChange={(e) => handleBookTitle(e.target.value)}
            className="p-2 border rounded-md focus:ring-2 focus:ring-blue-200 focus:outline-none"
            placeholder="Book title..."
          />
          <input
            type="text"
            value={bookAuthor}
            onChange={(e) => handleBookAuthor(e.target.value)}
            className="p-2 border rounded-md focus:ring-2 focus:ring-blue-200 focus:outline-none"
            placeholder="Book author..."
          />
        </div>

        {/* Number inputs in a grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label>Total Pages:</label>
          <input
            type="number"
            value={bookPageTotal}
            onChange={(e) => handleBookPageTotal(Number(e.target.value))}
            className="p-2 border rounded-md focus:ring-2 focus:ring-blue-200 focus:outline-none"
            placeholder="Total pages..."
          />
          <label>Current Page:</label>
          <input
            type="number"
            value={bookCurrentPage}
            onChange={(e) => handleBookCurrentPage(Number(e.target.value))}
            className="p-2 border rounded-md focus:ring-2 focus:ring-blue-200 focus:outline-none"
            placeholder="Current page..."
          />
        </div>

        {/* Genres with a nice grid layout */}
        <div className="space-y-2">
          <div className="font-medium text-gray-700">Genres:</div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {genres.map((genre) => (
              <label
                key={genre}
                className="flex items-center space-x-2 text-gray-600"
              >
                <input
                  type="checkbox"
                  onChange={() => handleBookGenreSelect(genre)}
                  checked={bookGenres.has(genre)}
                  className="rounded text-blue-500 focus:ring-blue-200"
                />
                <span className="capitalize">{genre}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Status radio buttons in a row */}
        <div className="space-y-2">
          <div className="font-medium text-gray-700">Status:</div>
          <div className="flex flex-wrap gap-4">
            {statuses.map((status) => (
              <label
                key={status}
                className="flex items-center space-x-2 text-gray-600"
              >
                <input
                  type="radio"
                  checked={bookStatus === status}
                  onChange={() => handleBookStatusSelect(status)}
                  className="text-blue-500 focus:ring-blue-200"
                />
                <span className="capitalize">{status}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          className="w-full md:w-auto px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-200"
          type="submit"
        >
          Add Book
        </button>
      </form>
    </>
  );
}
