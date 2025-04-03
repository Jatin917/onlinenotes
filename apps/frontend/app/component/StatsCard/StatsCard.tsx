import React from "react";
import { useThemeClasses } from "../../Style/theme";
import { useRecoilValue } from "recoil";
import { themeAtom } from "../../state/themeAtom";

const StatsCard = ({files}) => {
      const {
        cardClass,
        headingClass,
        mutedTextClass,
      } = useThemeClasses();
    //   theme for now import kr rhe hain but you have to make theme class for every color in ui
    const theme = useRecoilValue(themeAtom)
  return (
    <>
      <div className={`${cardClass} rounded-xl transition-colors duration-300`}>
        <div className="p-6">
          <h2
            className={`text-lg font-semibold ${headingClass} mb-4 flex items-center`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-indigo-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            Document Stats
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div
              className={`p-4 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}
            >
              <p className={`text-sm ${mutedTextClass}`}>Notes</p>
              <p className={`text-2xl font-bold ${headingClass}`}>
                {files.filter((f) => f.type === "notes").length}
              </p>
            </div>
            <div
              className={`p-4 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}
            >
              <p className={`text-sm ${mutedTextClass}`}>PYPs</p>
              <p className={`text-2xl font-bold ${headingClass}`}>
                {files.filter((f) => f.type === "pyp").length}
              </p>
            </div>
            <div
              className={`p-4 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}
            >
              <p className={`text-sm ${mutedTextClass}`}>Total Files</p>
              <p className={`text-2xl font-bold ${headingClass}`}>
                {files.length}
              </p>
            </div>
            <div
              className={`p-4 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}
            >
              <p className={`text-sm ${mutedTextClass}`}>Latest Upload</p>
              <p className={`text-sm font-medium ${headingClass}`}>
                {files[files.length - 1]?.date}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatsCard;
