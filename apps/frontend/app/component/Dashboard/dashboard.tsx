
// Dashboard.jsx
import { useState } from "react";
import Header from "../Header/header";
import VerticalToggle from "../VerticalToggle/verticalToggle";

const Dashboard = () => {
  const categories = ["All", "Notes", "Books", "Videos"];
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="mb-6">This example shows a responsive header with a search bar, navigation toggle, filters, and theme toggle.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-medium mb-2">Card {item}</h2>
            <p className="text-gray-400">Sample content for demonstration purposes.</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;