"use client"
// ProfilePage.jsx
import { useState, useEffect } from 'react';
import { useThemeClasses } from '../../Style/theme';
import UploadCard from '../../component/UploadCard/UploadCard';
import StatsCard from '../../component/StatsCard/StatsCard';
import ProfileHeader from '../../component/ProfileHeader/ProfileHeader';
import { useRecoilState } from 'recoil';
import { themeAtom } from '../../state/themeAtom';
import { DocumentSection } from '../../component/DocumentSection/DocumentSection';

export default function ProfilePage() {
  const [theme, setTheme] = useRecoilState(themeAtom)  
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  
  // Handle system preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  const [user, setUser] = useState({
    name: "Jane Smith",
    email: "jane.smith@university.edu",
    avatar: "/api/placeholder/100/100",
    bio: "Graduate student specializing in Machine Learning and Data Science. I create comprehensive study notes and collect past exam papers.",
    department: "Computer Science"
  });

  const [files, setFiles] = useState([
    { id: 1, name: "Advanced Data Structures Notes.pdf", type: "notes", date: "2025-03-15", size: "2.4 MB" },
    { id: 2, name: "Machine Learning PYP 2024.pdf", type: "pyp", date: "2025-03-20", size: "1.8 MB" },
    { id: 3, name: "Neural Networks Lecture Notes.pdf", type: "notes", date: "2025-03-25", size: "3.6 MB" },
    { id: 4, name: "Computer Vision Midterm 2023.pdf", type: "pyp", date: "2025-03-28", size: "2.1 MB" }
  ]);

  const [activeTab, setActiveTab] = useState('all');

  const filteredFiles = activeTab === 'all' 
    ? files 
    : files.filter(file => file.type === activeTab);

  const {cardClass, bgClass, headingClass, inputBgClass, borderClass, activeTabClass, inputTextClass, tabClass, hoverBgClass, mutedTextClass, secondaryBtnClass, iconClass } = useThemeClasses();
  return (
    <div className={`min-h-screen ${bgClass} transition-colors duration-300`}>
      <div className="max-w-5xl mx-auto py-8 px-4">
        
        {/* Profile Header */}
        <ProfileHeader user={user} />
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Upload Section */}
          <div className="md:col-span-1">
            <UploadCard setFiles={setFiles} />
            
            {/* Stats Card */}
            <StatsCard files={files} />
          </div>
          
          {/* Right Column - Documents Section */}
          <div className="md:col-span-2">
              <DocumentSection setActiveTab={setActiveTab} activeTab={activeTab} filteredFiles={filteredFiles} />
          </div>
        </div>
      </div>
    </div>
  );
}