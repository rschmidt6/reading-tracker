import { useState } from "react";
import { Book as BookType } from "../Types";
import Book from "./Book";
import EditBook from "./EditBook";

interface LibraryTabProps {
  readingList: BookType[];
  setReadingList: React.Dispatch<React.SetStateAction<BookType[]>>;
}

export default function LibraryTab({
  readingList,
  setReadingList,
}: LibraryTabProps) {
  const [editing, setEditing] = useState<string | null>(null);

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
    <div className="mt-12 space-y-4">
      {readingList.map((book: BookType) =>
        editing !== book.id ? (
          <Book
            key={book.id}
            book={book}
            onDelete={() => handleDeleteBook(book.id)}
            onEdit={() => handleStartEdit(book.id)}
          />
        ) : (
          <EditBook
            book={book}
            onStopEdit={handleStopEdit}
            onSubmit={handleUpdateBook}
          />
        )
      )}
    </div>
  );
}
