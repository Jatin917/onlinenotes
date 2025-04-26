"use client"

import Image from "next/image";
import React from "react";
import { useThemeClasses } from "../../Style/theme";
import { useSession } from "next-auth/react";

const ProfileHeader = ({ user, isSameUser }) => {
  const {
    cardClass,
    headingClass,
    textClass,
    primaryBtnClass,
    
  } = useThemeClasses();
  console.log("profile header ", user);
  return (
<div className={`${cardClass} rounded-xl mb-8 overflow-hidden transition-colors duration-300`}>
      <div className="px-6 py-8 relative">
        <div className="flex flex-col md:flex-row items-center">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
            <Image
              src={user?.profilePicture || user?.image}
              alt="Profile Picture"
              layout="fill"
              className="object-cover"
            />
          </div>
            
          <div className="mt-4 md:mt-0 md:ml-6 flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className={`text-2xl font-bold ${headingClass}`}>
                  {user?.name}
                </h1>
                {user?.department && (
                  <p className={`${textClass} text-sm mt-1`}>
                    {user?.department}
                  </p>
                )}
              </div>
                
              {isSameUser && <button
                className={`mt-4 md:mt-0 px-4 py-2 rounded-lg ${primaryBtnClass} transition-colors duration-200 flex items-center space-x-2`}
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
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                <span>Edit Profile</span>
              </button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
