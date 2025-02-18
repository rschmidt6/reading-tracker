import { useState } from "react";
import { Book as BookType } from "../Types";
import Book from "./Book";
import EditBook from "./EditBook";
import MultiSelectDropdown from "./MultiSelectDropdown";
import { genres, statuses } from "../Types";

interface LibraryTabProps {
  readingList: BookType[];
  setReadingList: React.Dispatch<React.SetStateAction<BookType[]>>;
}

export default function LibraryTab({
  readingList,
  setReadingList,
}: LibraryTabProps) {
  const [editing, setEditing] = useState<string | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(statuses);

  const genreOptions = genres.map((genre) => ({
    value: genre,
    label: genre.charAt(0).toUpperCase() + genre.slice(1), // Capitalize first letter
  }));

  const statusOptions = statuses.map((status) => ({
    value: status,
    label: status.charAt(0).toUpperCase() + status.slice(1), // Capitalize first letter
  }));

  const filteredBooks = readingList.filter(
    (book) =>
      selectedGenres.length === 0 ||
      (book.genres?.some((genre) => selectedGenres.includes(genre)) &&
        selectedStatuses.includes(book.status))
  );

  const handleStartEdit = (id: string) => {
    setEditing(id);
  };

  const handleStopEdit = () => {
    setEditing(null);
  };

  const handleUpdateBook = (updatedBook: BookType) => {
    setReadingList((prev) =>
      prev.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
    setEditing(null);
  };

  const handleDeleteBook = (id: string) => {
    setReadingList((prev) => prev.filter((book) => book.id !== id));
  };

  return (
    <>
      <div className="flex gap-2 bg-white rounded p-2">
        {/* <div>Genres Dropdown</div>
        <div>Status Dropdown</div>
        <div>Progress slider</div> */}
        <MultiSelectDropdown
          options={genreOptions}
          selectedValues={selectedGenres}
          onChange={setSelectedGenres}
          buttonText="Filter by Genre"
        />
        <MultiSelectDropdown
          options={statusOptions}
          selectedValues={selectedStatuses}
          onChange={setSelectedStatuses}
          buttonText="Filter by Status"
        />
      </div>
      <div className="mt-12 space-y-4">
        {filteredBooks.map((book: BookType) =>
          editing !== book.id ? (
            <Book
              key={book.id}
              book={book}
              onDelete={() => handleDeleteBook(book.id)}
              onEdit={() => handleStartEdit(book.id)}
            />
          ) : (
            <EditBook
              key={book.id}
              book={book}
              onStopEdit={handleStopEdit}
              onSubmit={handleUpdateBook}
            />
          )
        )}
      </div>
    </>
  );
}
