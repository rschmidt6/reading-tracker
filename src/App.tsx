import { Book as BookType } from "./Types";
import Book from "./components/Book";
import { useLocalStorage } from "./assets/useLocalStorage";
import AddBookTab from "./components/AddBookTab";

// to add tabs:
// add book tab
// see library tab
// overview tab (book reading stats)

export default function App() {
  const [readingList, setReadingList] = useLocalStorage<BookType[]>(
    "readingList",
    []
  );

  // Add this console.log to verify our state
  console.log("Current reading list:", readingList);

  //   const [activeTab, setActiveTab] = useState<Tab>("add");

  const handleDeleteBook = (id: string) => {
    setReadingList((prev) => prev.filter((book) => book.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-50 min-h-screen">
      <AddBookTab readingList={readingList} setReadingList={setReadingList} />
      {/* Book list section */}
      <div className="mt-12 space-y-4">
        {readingList.map((book: BookType) => (
          <Book
            key={book.id}
            book={book}
            onDelete={() => handleDeleteBook(book.id)}
          />
        ))}
      </div>
    </div>
  );
}
