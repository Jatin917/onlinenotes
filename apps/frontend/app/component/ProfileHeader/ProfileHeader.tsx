import Image from 'next/image'
import React from 'react'
import { useThemeClasses } from '../../Style/theme';

const ProfileHeader = ({user}) => {
      const {cardClass, headingClass, mutedTextClass, textClass, primaryBtnClass } = useThemeClasses();
  return (
    <>
                <div className={`${cardClass} rounded-xl mb-8 overflow-hidden transition-colors duration-300`}>
          <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
          <div className="px-6 py-8 relative">
            <div className="flex flex-col md:flex-row items-center">
              <div className="absolute top-0 transform -translate-y-1/2">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
                  <Image 
                    src={user.avatar}
                    alt="Profile Picture"
                    layout="fill"
                    className="object-cover"
                  />
                </div>
              </div>
              
              <div className="mt-12 md:mt-0 md:ml-28 flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className={`text-2xl font-bold ${headingClass}`}>{user.name}</h1>
                    <p className={`${textClass}`}>{user.email}</p>
                    <p className={`${mutedTextClass} text-sm mt-1`}>{user.department}</p>
                  </div>
                  
                  <button className={`mt-4 md:mt-0 px-4 py-2 rounded-lg ${primaryBtnClass} transition-colors duration-200 flex items-center space-x-2`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    <span>Edit Profile</span>
                  </button>
                </div>
                <p className={`mt-4 ${textClass}`}>{user.bio}</p>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default ProfileHeader