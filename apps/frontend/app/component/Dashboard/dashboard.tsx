
// Dashboard.jsx
import { useState } from "react";
import Header from "../Header/header";
import VerticalToggle from "../VerticalToggle/verticalToggle";

const Dashboard = () => {
  const categories = ["All", "Notes", "Books", "Videos"];
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header />
      <div className="mt-6 w-full max-w-2xl">
        <VerticalToggle options={categories} onChange={setActiveCategory} />
        <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-xl font-semibold">{activeCategory} Resources</h2>
          <p className="text-gray-600 dark:text-gray-400">Displaying resources related to {activeCategory}.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;