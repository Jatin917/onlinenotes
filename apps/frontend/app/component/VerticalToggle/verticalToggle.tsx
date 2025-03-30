// VerticalToggle.jsx
import { useState } from "react";

const VerticalToggle = ({ options, onChange }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleToggle = (index) => {
    setActiveIndex(index);
    onChange(options[index]);
  };

  return (
    <div className="relative w-full max-w-md bg-gray-900 p-2 rounded-full flex items-center">
      <div
        className="absolute top-0 left-0 h-full bg-blue-500 rounded-full transition-transform duration-300"
        style={{ transform: `translateX(${activeIndex * 90}px)`, width: "90px" }}
      ></div>
      {options.map((option, index) => (
        <div
          key={option}
          className={`py-3 px-6 text-center rounded-full cursor-pointer relative z-10 transition-colors duration-300 font-medium text-lg ${
            activeIndex === index ? "text-white" : "text-gray-300"
          }`}
          onClick={() => handleToggle(index)}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default VerticalToggle;