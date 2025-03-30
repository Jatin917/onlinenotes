import { useState, useEffect } from "react";
import ThemeToggle from "../../UI/toggleDark";

const Header = ({ setSelectedYear, setSelectedSubject }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [year, setYear] = useState("");
  const [subject, setSubject] = useState("");
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    document.documentElement.classList.toggle("dark", newMode);
  };

  const handleYearChange = (e) => {
    const selectedYear = e.target.value;
    setYear(selectedYear);
    setSelectedYear(selectedYear);
    // Example subjects for selected years
    const subjectsMap = {
      "1st Year": ["Maths", "Physics"],
      "2nd Year": ["Computer Science", "Electronics"],
      "3rd Year": ["AI", "Web Development"],
    };
    setSubjects(subjectsMap[selectedYear] || []);
    setSubject(""); // Reset subject
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
    setSelectedSubject(e.target.value);
  };

  return (
    <header className="w-screen p-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <div className="flex gap-4">
        <select
          value={year}
          onChange={handleYearChange}
          className="px-2 py-1 border dark:bg-gray-700 dark:text-white"
        >
          <option value="">Select Year</option>
          <option value="1st Year">1st Year</option>
          <option value="2nd Year">2nd Year</option>
          <option value="3rd Year">3rd Year</option>
        </select>
        <select
          value={subject}
          onChange={handleSubjectChange}
          disabled={!year}
          className="px-2 py-1 border dark:bg-gray-700 dark:text-white"
        >
          <option value="">Select Subject</option>
          {subjects.map((subj) => (
            <option key={subj} value={subj}>{subj}</option>
          ))}
        </select>
        {/* <button onClick={toggleDarkMode} className="px-2 py-1 bg-blue-500 text-white rounded">
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button> */}
        <ThemeToggle 
        initialTheme={darkMode?"dark":"light"}
        onChange={toggleDarkMode}
      />
      </div>
    </header>
  );
};

export default Header;
