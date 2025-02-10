import { Book as BookType, Tab, displayTabs } from "./Types";
import { useLocalStorage } from "./assets/useLocalStorage";
import AddBookTab from "./components/AddBookTab";
import LibraryTab from "./components/LibraryTab";
import OverviewTab from "./components/OverviewTab";
import { useState } from "react";

// to add tabs:
// add book tab
// see library tab
// overview tab (book reading stats)

export default function App() {
  const [readingList, setReadingList] = useLocalStorage<BookType[]>(
    "readingList",
    []
  );

  const [activeTab, setActiveTab] = useState<Tab>("add");

  const handleTabSelect = (tab: Tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      {/* tabs */}
      <div className="max-w-4xl mx-auto p-8 bg-gray-50 min-h-screen">
        <div className="flex gap-2 mb-2">
          {displayTabs.map((tab) => (
            <div
              onClick={() => handleTabSelect(tab.id)}
              className={`px-2 py-1 text-xl rounded cursor-pointer ${
                activeTab === tab.id ? "bg-gray-200" : ""
              }`}
            >
              {tab.displayText}
            </div>
          ))}
        </div>
        {activeTab === "add" && (
          <AddBookTab
            readingList={readingList}
            setReadingList={setReadingList}
          />
        )}
        {activeTab === "library" && (
          <LibraryTab
            readingList={readingList}
            setReadingList={setReadingList}
          />
        )}
        {activeTab === "overview" && <OverviewTab />}
      </div>
    </div>
  );
}
