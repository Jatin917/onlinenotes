"use client"

import { Calendar, Download, FileText, HardDrive, ThumbsUp, User } from "lucide-react";
import { useRecoilState, useRecoilValue } from "recoil";
import { themeAtom } from "../../store/themeAtom";
import { useEffect, useState } from 'react'
import { cn } from '../../lib/utils';
import { StaticImageData } from "next/image";
import axios from "axios";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { upvoteAtom } from "../../store/pageAtom";
import Link from "next/link";

interface PDFCardProps {
  title: string;
  imageUrl: StaticImageData | string;
  docLink:string;
  id:string
  initialUpvoteCount:number
  upvotedBy:object[];
  uploaderId:object[];
}

const PDFCard: React.FC<PDFCardProps> = ({
  id,
  title,
  imageUrl,
  docLink,
  initialUpvoteCount,
  upvotedBy,
  uploaderId
}) => {
  const session = useSession();
  const isDarkMode = useRecoilValue(themeAtom);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(initialUpvoteCount)
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
    const response = await axios.post(`/api/vote/${id}`, {isUpvoted});
    if(response.status===200){
      setIsUpvoted(!isUpvoted);
      setUpvoteCount(prev => isUpvoted ? prev - 1 : prev + 1);
    } 
      // console.log("response of upvote is ", response)
    } catch (error) {
      // console.log("error for upvote is ", error)
    }
  };

  return (
    <div 
      className={cn(
        "relative group",
        "flex flex-col md:flex-row md:items-stretch",
        "rounded-2xl", 
        "p-6 gap-6",
        "w-full max-w-4xl",
        "overflow-hidden",
        "transition-all duration-300 ease-in-out",
        "shadow-lg hover:shadow-xl",
        "hover:ring-2 hover:ring-opacity-50",
        isDarkMode === 'dark' 
          ? "bg-gray-900 text-white border border-gray-700 hover:ring-blue-500" 
          : "bg-white text-gray-800 border border-gray-200 hover:ring-blue-400",
        isUpvoted && (isDarkMode ? "ring-2 ring-green-500" : "ring-2 ring-green-400")
      )}
    >
      {/* Left Side: Thumbnail and Content */}
      <div className="flex flex-1 flex-col md:flex-row gap-6 min-w-0 w-full md:pr-4">
        {/* Thumbnail with shimmer effect */}
        <div className="relative shrink-0 w-full md:w-48 h-52 overflow-hidden rounded-xl">
          <img
            src={imageUrl || "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"}
            alt={`${title} thumbnail`}
            className={cn(
              "w-full h-full object-cover transition-all duration-500 group-hover:scale-105",
              "absolute inset-0",
              isDarkMode === 'dark' 
                ? "border border-gray-600" 
                : "border border-gray-300"
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div 
            className={cn(
              "absolute bottom-3 right-3",
              "px-2.5 py-1 rounded-lg",
              "text-xs font-bold tracking-wider",
              "backdrop-blur-sm",
              isDarkMode === 'dark' 
                ? "bg-blue-900/80 text-blue-100" 
                : "bg-blue-600/90 text-white"
            )}
          >
            PDF
          </div>
        </div>
  
        {/* Content */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          {/* Title with underline animation */}
          <h2 
            className={cn(
              "font-bold text-2xl mb-2 line-clamp-2",
              "relative w-fit",
              "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-current",
              "after:w-0 after:transition-all after:duration-300 group-hover:after:w-full",
              isDarkMode === 'dark' 
                ? "text-gray-100 group-hover:text-blue-300" 
                : "text-gray-800 group-hover:text-blue-600"
            )}
          >
            {title}
          </h2>
  
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Link href={`/profile/${uploaderId.id}`}  className={cn(
              "flex items-center gap-1 text-sm",
              isDarkMode ? "text-gray-400" : "text-gray-600"
            )}>
              <User size={14} />
              {uploaderId.name || 'Anonymous'}
            </Link>
            <span className={cn(
              "flex items-center gap-1 text-sm",
              isDarkMode ? "text-gray-400" : "text-gray-600"
            )}>
              <Calendar size={14} />
              {new Date().toLocaleDateString()}
            </span>
            <span className={cn(
              "flex items-center gap-1 text-sm",
              isDarkMode ? "text-gray-400" : "text-gray-600"
            )}>
              <HardDrive size={14} />
              2.4 MB
            </span>
          </div>
  
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {['Mathematics', 'Calculus', 'Formulas'].map(tag => (
              <span 
                key={tag}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium",
                  "transition-colors duration-300",
                  isDarkMode === 'dark' 
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-700" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
  
      {/* Right Side: Action Buttons */}
      <div className="flex-shrink-0 flex flex-row md:flex-col gap-3 w-full md:w-auto justify-end md:justify-center mt-4 md:mt-0 md:ml-auto">
        {[
          { 
            icon: Download, 
            label: 'Download', 
            onClick: onDownload,
            colors: isDarkMode === 'dark' 
              ? "bg-blue-700 hover:bg-blue-600 text-white" 
              : "bg-blue-600 hover:bg-blue-500 text-white",
            tooltip: "Download PDF"
          },
          { 
            icon: FileText, 
            label: 'View', 
            onClick: onViewNotes,
            colors: isDarkMode === 'dark' 
              ? "bg-gray-800 hover:bg-gray-700 text-white" 
              : "bg-gray-200 hover:bg-gray-300 text-gray-800",
            tooltip: "View Notes"
          },
          { 
            icon: ThumbsUp, 
            label: upvoteCount, 
            onClick: handleUpvote,
            colors: isUpvoted
              ? isDarkMode === 'dark'
                ? "bg-green-700 text-white" 
                : "bg-green-500 text-white"
              : isDarkMode === 'dark'
                ? "bg-gray-800 text-white hover:bg-green-800" 
                : "bg-gray-200 text-gray-700 hover:bg-green-500 hover:text-white",
            tooltip: "Upvote"
          }
        ].map(({ icon: Icon, label, onClick, colors, tooltip }) => (
          <button
            key={tooltip}
            onClick={onClick}
            className={cn(
              "p-3 rounded-xl",
              "w-12 h-12 md:w-auto md:h-auto",
              "transition-all duration-300 group/button",
              "flex items-center justify-center",
              "relative overflow-hidden",
              "shadow-sm hover:shadow-md",
              "transform hover:-translate-y-0.5",
              colors,
              "after:absolute after:inset-0 after:bg-white/10 after:opacity-0",
              "hover:after:opacity-100 after:transition-opacity"
            )}
            aria-label={tooltip}
            data-tooltip={tooltip}
          >
            <Icon
              size={20}
              className={cn(
                "transition-transform duration-300",
                "group-hover/button:scale-110",
                label === upvoteCount && isUpvoted && "animate-bounce"
              )}
            />
            <span className="ml-2 hidden md:inline-block text-sm font-medium">
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
  
};

export default PDFCard;
