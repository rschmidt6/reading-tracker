//reading list and set reading list

import { Book as BookType } from "../Types";
import Book from "./Book";

interface LibraryTabProps {
  readingList: BookType[];
  setReadingList: React.Dispatch<React.SetStateAction<BookType[]>>;
}

// This would contain your book list display and deletion logic
export default function LibraryTab({
  readingList,
  setReadingList,
}: LibraryTabProps) {
  const handleDeleteBook = (id: string) => {
    setReadingList((prev) => prev.filter((book) => book.id !== id));
  };

  return (
    <div className="mt-12 space-y-4">
      {readingList.map((book: BookType) => (
        <Book
          key={book.id}
          book={book}
          onDelete={() => handleDeleteBook(book.id)}
        />
      ))}
    </div>
  );
}
