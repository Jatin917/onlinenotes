"use client"

import React, { useRef, useState } from "react";
import { useThemeClasses } from "../../Style/theme";

const UploadCard = ({setFiles}) => {
  const {
    cardClass,
    headingClass,
    mutedTextClass,
    textClass,
    primaryBtnClass,
    borderClass,
    hoverBgClass,
    inputBgClass,
    inputTextClass
  } = useThemeClasses();
  const fileInputRef = useRef(null);
  const [fileType, setFileType] = useState('notes');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (e) => {
    e.preventDefault();
    setIsUploading(true);
    
    // Simulate file upload delay
    setTimeout(() => {
      const file = fileInputRef.current.files[0];
      if (file) {
        const newFile = {
          id: files.length + 1,
          name: file.name,
          type: fileType,
          date: new Date().toISOString().split('T')[0],
          size: `${(Math.random() * 5 + 0.5).toFixed(1)} MB`
        };
        
        setFiles([...files, newFile]);
        fileInputRef.current.value = '';
      }
      setIsUploading(false);
    }, 1000);
  };
  return (
    <>
      <div
        className={`${cardClass} rounded-xl mb-6 transition-colors duration-300`}
      >
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
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            Upload Document
          </h2>
          <form onSubmit={handleFileUpload} className="space-y-4">
            <div>
              <label className={`block text-sm font-medium ${textClass} mb-1`}>
                Document Type
              </label>
              <select
                value={fileType}
                onChange={(e) => setFileType(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${inputBgClass} ${inputTextClass}`}
              >
                <option value="notes">Notes</option>
                <option value="pyp">Past Year Paper (PYP)</option>
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium ${textClass} mb-1`}>
                Select PDF
              </label>
              <div
                className={`border border-dashed rounded-lg p-4 text-center ${borderClass} ${hoverBgClass}`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".pdf"
                  className="hidden"
                  required
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto h-10 w-10 text-indigo-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p className={`mt-2 text-sm ${textClass}`}>
                    Click to select PDF file
                  </p>
                  <p className={`text-xs ${mutedTextClass}`}>
                    {fileInputRef.current?.files[0]?.name || "No file selected"}
                  </p>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200 ${primaryBtnClass}`}
              disabled={isUploading}
            >
              {isUploading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Uploading...
                </span>
              ) : (
                "Upload Document"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UploadCard;
