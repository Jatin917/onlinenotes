import React from "react";
import { useThemeClasses } from "../../Style/theme";
import { useRecoilValue } from "recoil";
import { themeAtom } from "../../state/themeAtom";

export const DocumentSection = ({setActiveTab, activeTab, filteredFiles}) => {
    const theme = useRecoilValue(themeAtom);
    const {cardClass, headingClass, inputBgClass, borderClass, activeTabClass, inputTextClass, tabClass, hoverBgClass, mutedTextClass, secondaryBtnClass, iconClass } = useThemeClasses();
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
                d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
              />
            </svg>
            My Documents
          </h2>

          {/* Search */}
          <div
            className={`relative mb-6 ${inputBgClass} rounded-lg flex items-center`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-3 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search documents..."
              className={`w-full px-3 py-2 border-0 rounded-lg focus:outline-none ${inputBgClass} ${inputTextClass}`}
            />
          </div>

          {/* Tabs */}
          <div className={`mb-6 border-b ${borderClass}`}>
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab("all")}
                className={`pb-2 px-1 border-b-2 ${activeTab === "all" ? activeTabClass : `border-transparent ${tabClass}`} transition-colors duration-200`}
              >
                All Documents
              </button>
              <button
                onClick={() => setActiveTab("notes")}
                className={`pb-2 px-1 border-b-2 ${activeTab === "notes" ? activeTabClass : `border-transparent ${tabClass}`} transition-colors duration-200`}
              >
                Notes
              </button>
              <button
                onClick={() => setActiveTab("pyp")}
                className={`pb-2 px-1 border-b-2 ${activeTab === "pyp" ? activeTabClass : `border-transparent ${tabClass}`} transition-colors duration-200`}
              >
                Past Year Papers
              </button>
            </div>
          </div>

          {/* File List */}
          {filteredFiles.length > 0 ? (
            <div className="space-y-3">
              {filteredFiles.map((file) => (
                <div
                  key={file.id}
                  className={`flex items-center justify-between p-4 rounded-lg ${hoverBgClass} transition-colors duration-200`}
                >
                  <div className="flex items-center flex-1 min-w-0">
                    <div
                      className={`p-2 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-indigo-50"} mr-4`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-indigo-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3
                        className={`font-medium truncate ${headingClass}`}
                        title={file.name}
                      >
                        {file.name}
                      </h3>
                      <div className="flex items-center mt-1">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${
                            file.type === "notes"
                              ? `${theme === "dark" ? "bg-green-900 text-green-300" : "bg-green-100 text-green-800"}`
                              : `${theme === "dark" ? "bg-blue-900 text-blue-300" : "bg-blue-100 text-blue-800"}`
                          }`}
                        >
                          {file.type === "notes" ? "Notes" : "Past Year Paper"}
                        </span>
                        <span className={`mx-2 text-xs ${mutedTextClass}`}>
                          •
                        </span>
                        <span className={`text-xs ${mutedTextClass}`}>
                          {file.date}
                        </span>
                        <span className={`mx-2 text-xs ${mutedTextClass}`}>
                          •
                        </span>
                        <span className={`text-xs ${mutedTextClass}`}>
                          {file.size}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <button
                      className={`p-2 rounded-lg ${secondaryBtnClass} transition-colors duration-200`}
                      title="View"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                    <button
                      className={`p-2 rounded-lg ${secondaryBtnClass} transition-colors duration-200`}
                      title="Download"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                    </button>
                    <button
                      className={`p-2 rounded-lg ${secondaryBtnClass} transition-colors duration-200`}
                      title="Delete"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              className={`text-center py-12 ${borderClass} border border-dashed rounded-lg`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`mx-auto h-12 w-12 ${iconClass}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                />
              </svg>
              <h3 className={`mt-4 text-lg font-medium ${headingClass}`}>
                No documents found
              </h3>
              <p className={`mt-1 ${mutedTextClass}`}>
                Get started by uploading your first document
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
