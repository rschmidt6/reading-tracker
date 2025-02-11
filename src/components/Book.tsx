import { Book as BookType } from "../Types";

interface BookProps {
  book: BookType;
  onEdit: () => void;
  onDelete: () => void;
}

export default function Book({ book, onDelete, onEdit }: BookProps) {
  // Calculate reading progress percentage
  const progress = Math.round((book.currentPage / book.pageCount) * 100);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="space-y-4">
        {/* Title and Author Section */}
        <div className="space-y-1">
          <h3 className="text-xl font-semibold text-gray-800">{book.title}</h3>
          <p className="text-gray-600">by {book.author}</p>
        </div>

        {/* Reading Progress Section */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Reading Progress</span>
            <span>{progress}%</span>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-sm text-gray-500">
            Page {book.currentPage} of {book.pageCount}
          </div>
        </div>

        {/* Status and Genres Section */}
        <div className="flex justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {/* Status Badge */}
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {book.status}
            </span>

            {/* Genre Tags */}
            {book.genres?.map((genre) => (
              <span
                key={genre}
                className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
              >
                {genre}
              </span>
            ))}
          </div>
          <div>
            <button
              className="rounded-full text-sm px-2 py-1 text-gray-600 bg-gray-200 mr-2"
              onClick={onEdit}
            >
              edit
            </button>
            <button
              className="rounded-full text-sm px-2 py-1 text-gray-600 bg-red-200 "
              onClick={onDelete}
            >
              delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
