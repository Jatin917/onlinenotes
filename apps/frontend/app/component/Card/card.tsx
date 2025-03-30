"use client"

import { Download, ThumbsUp } from "lucide-react";

interface PDFCardProps {
  title: string;
  owner: string;
  imageUrl: string;
  isDarkMode: boolean;
  onDownload: () => void;
  onUpvote: () => void;
}

const PDFCard: React.FC<PDFCardProps> = ({
  title,
  owner,
  imageUrl,
  isDarkMode,
  onDownload,
  onUpvote,
}) => {
  return (
    <div
      className={`
      flex items-center 
      rounded-xl 
      p-5 
      w-full 
      max-w-md 
      transition-all 
      duration-300 
      ease-in-out
      transform 
      hover:scale-[1.02] 
      hover:shadow-xl
      ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-800 to-gray-900 text-white border-2 border-gray-700"
          : "bg-gradient-to-br from-gray-100 to-gray-50 text-black border-2 border-gray-200"
      }
    `}
    >
      {/* Left Side: PDF Image and Details */}
      <div className="flex-grow flex items-center space-x-5">
        <div className="relative">
          <img
            src={imageUrl}
            alt={`${title} thumbnail`}
            className={`
              w-24 h-32 
              object-cover 
              rounded-lg 
              shadow-md
              ${
                isDarkMode
                  ? "border-2 border-gray-700"
                  : "border-2 border-gray-300"
              }
            `}
          />
          <div
            className={`
            absolute 
            bottom-0 
            right-0 
            bg-blue-500 
            text-white 
            px-2 
            py-1 
            rounded-tr-lg 
            rounded-bl-lg 
            text-xs
            ${isDarkMode ? "bg-blue-700" : "bg-blue-600"}
          `}
          >
            PDF
          </div>
        </div>
        <div>
          <h2
            className={`
            font-semibold 
            text-xl 
            mb-1
            ${isDarkMode ? "text-gray-100" : "text-gray-900"}
          `}
          >
            {title}
          </h2>
          <p
            className={`
            text-sm 
            font-medium
            ${isDarkMode ? "text-gray-400" : "text-gray-700"}
          `}
          >
            Owner: {owner}
          </p>
        </div>
      </div>

      {/* Right Side: Action Buttons */}
      <div className="flex flex-col space-y-3">
        <button
          onClick={onDownload}
          className={`
            p-3 
            rounded-full 
            shadow-md
            hover:shadow-lg
            transition-all 
            duration-300 
            group
            ${
              isDarkMode
                ? "bg-blue-800 text-white hover:bg-blue-700"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }
          `}
        >
          <Download
            size={22}
            className="group-hover:scale-110 transition-transform"
          />
        </button>
        <button
          onClick={onUpvote}
          className={`
            p-3 
            rounded-full 
            shadow-md
            hover:shadow-lg
            transition-all 
            duration-300 
            group
            ${
              isDarkMode
                ? "bg-green-800 text-white hover:bg-green-700"
                : "bg-green-600 text-white hover:bg-green-700"
            }
          `}
        >
          <ThumbsUp
            size={22}
            className="group-hover:scale-110 transition-transform"
          />
        </button>
      </div>
    </div>
  );
};

export default PDFCard;
