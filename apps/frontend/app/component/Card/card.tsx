"use client"

import { Download, FileText, ThumbsUp } from "lucide-react";
import { useRecoilState, useRecoilValue } from "recoil";
import { themeAtom } from "../../store/themeAtom";
import { useEffect, useState } from 'react'
import { cn } from '../../lib/utils';
import { StaticImageData } from "next/image";
import axios from "axios";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { upvoteAtom } from "../../store/pageAtom";

interface PDFCardProps {
  title: string;
  owner: string;
  imageUrl: StaticImageData | string;
  docLink:string;
  id:string
  upvoteCount:number
  upvotedBy:object[];
}

const PDFCard: React.FC<PDFCardProps> = ({
  id,
  title,
  owner,
  imageUrl,
  docLink,
  upvoteCount,
  upvotedBy,
}) => {
  const session = useSession();
  const isDarkMode = useRecoilValue(themeAtom);
  const [isUpvoted, setIsUpvoted] = useRecoilState(upvoteAtom);
  // const [upvoteCount, setUpvoteCount] = useState(0);
  // Handle upvote with local state
  useEffect(()=>{
    upvotedBy.forEach(user=>{
      if(session && session.data && session.data.userId===user.userId){
        setIsUpvoted(true);
      }
    })
  },[session, upvotedBy])
  const onViewNotes = () =>{
    window.open(docLink, "_blank");
  }

  const onDownload = () => {
    const link = document.createElement('a');
    link.href = docLink;
    link.download = title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  const handleUpvote = async() => {
    try {
    await axios.post(`/api/vote/${id}`, {isUpvoted});
      // console.log("response of upvote is ", response)
    } catch (error) {
      // console.log("error for upvote is ", error)
    }
    setIsUpvoted(!isUpvoted);
    // setUpvoteCount(prev => isUpvoted ? prev - 1 : prev + 1);
  };

  return (
    <div 
      className={cn(
        "relative group",
        "flex flex-col md:flex-row",
        "rounded-2xl", 
        "p-6 space-y-4 md:space-y-0 md:space-x-6",
        "w-full max-w-4xl",
        "transition-all duration-300 ease-in-out",
        "shadow-lg hover:shadow-xl",
        isDarkMode==='dark' 
          ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white border border-gray-700" 
          : "bg-gradient-to-br from-white to-gray-50 text-gray-800 border border-gray-200"
      )}
    >
      {/* Left Side: PDF Image and Details */}
      <div className="flex-grow flex flex-col md:flex-row items-center md:space-x-6 w-full">
        <div className="relative mb-4 md:mb-0 transform transition-transform group-hover:scale-[1.02]">
          <img
            src={imageUrl || "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"}
            alt={`${title} thumbnail`}
            className={cn(
              "w-40 h-52 object-cover rounded-xl",
              "shadow-md hover:shadow-lg",
              "transition-all duration-300",
              isDarkMode==='dark' 
                ? "border border-gray-600" 
                : "border border-gray-300"
            )}
          />
          <div 
            className={cn(
              "absolute bottom-0 right-0",
              "text-white px-3 py-1 rounded-tr-xl rounded-bl-xl",
              "text-xs font-semibold tracking-wider",
              isDarkMode==='dark' ? "bg-blue-800" : "bg-blue-600"
            )}
          >
            PDF
          </div>
        </div>
        
        <div className="text-center md:text-left w-full md:w-auto">
          <h2 
            className={cn(
              "font-bold text-2xl mb-2 line-clamp-2",
              "transition-colors duration-300",
              isDarkMode==='dark' ? "text-gray-100 group-hover:text-blue-300" : "text-gray-800 group-hover:text-blue-600"
            )}
          >
            {title}
          </h2>
          <p 
            className={cn(
              "text-sm font-medium mb-2",
              isDarkMode==='dark' ? "text-gray-400" : "text-gray-600"
            )}
          >
            Owner: {owner}
          </p>
          
          {/* Document metadata */}
          <div className="flex flex-wrap gap-2 mt-2">
            {['Date Added', 'File Size'].map((label, index) => (
              <span 
                key={label}
                className={cn(
                  "px-3 py-1 rounded-full text-xs",
                  "transition-colors duration-300",
                  isDarkMode==='dark' 
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-700" 
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                )}
              >
                {index === 0 ? new Date().toLocaleDateString() : '2.4 MB'}
              </span>
            ))}
          </div>
        </div>
      </div>
  
      {/* Right Side: Action Buttons */}
      <div className="flex flex-row md:flex-col justify-center space-x-4 md:space-x-0 md:space-y-4 mt-4 md:mt-0">
        {[
          { 
            icon: Download, 
            label: 'Download', 
            onClick: onDownload,
            colors: isDarkMode==='dark' 
              ? "bg-blue-700 text-white hover:bg-blue-600" 
              : "bg-blue-600 text-white hover:bg-blue-500"
          },
          { 
            icon: FileText, 
            label: 'View Notes', 
            onClick: onViewNotes,
            colors: isDarkMode==='dark' 
              ? "bg-purple-700 text-white hover:bg-purple-600" 
              : "bg-purple-600 text-white hover:bg-purple-500"
          },
          { 
            icon: ThumbsUp, 
            label: 'Upvote', 
            onClick: handleUpvote,
            colors: isUpvoted
              ? isDarkMode==='dark'
                ? "bg-green-600 text-white" 
                : "bg-green-500 text-white"
              : isDarkMode==='dark'
                ? "bg-gray-700 text-white hover:bg-green-700" 
                : "bg-gray-200 text-gray-700 hover:bg-green-500 hover:text-white"
          }
        ].map(({ icon: Icon, label, onClick, colors }) => (
          <button
            key={label}
            onClick={onClick}
            className={cn(
              "p-3 rounded-xl shadow-md hover:shadow-lg",
              "transition-all duration-300 group",
              "flex items-center justify-center",
              "transform hover:-translate-y-1",
              colors
            )}
            aria-label={label}
          >
            <Icon
              size={22}
              className="group-hover:scale-110 transition-transform"
            />
            {label !== 'Upvote' && (
              <span className="ml-2 hidden md:inline">{label}</span>
            )}
            {label === 'Upvote' && (
              <span className="ml-2 hidden md:inline">{upvoteCount}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PDFCard;
