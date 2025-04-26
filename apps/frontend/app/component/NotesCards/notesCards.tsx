"use client";
import React, { useState, useEffect, useRef } from 'react';
import PDFCard from '../Card/card';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { pageAtom } from '../../store/pageAtom';
import { themeAtom } from '../../store/themeAtom';
import Document from '../../assets/document.png';
import { Plus } from 'lucide-react';
import { cn } from '../../lib/utils';
import { toast } from 'sonner';

interface NotesType {
  id: string;
  title: string;
  thumbnailUrl?: string;
  owner?: { name: string };
  year?: string;
  fileUrl: string;
  upvotedBy: string[];
  // Add other fields as needed
}

interface NotesCardsProps {
  initialNotes: NotesType[];
  onCreateNew?: () => void;
  onNoteSelect?: (id: string) => void;
}

const NotesCards = ({ initialNotes, onCreateNew, onNoteSelect }: NotesCardsProps) => {
  const page = useRecoilValue(pageAtom);
  const isDarkMode = useRecoilValue(themeAtom);
  const [notes, setNotes] = useState<NotesType[]>(initialNotes);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [filtersApplied, setFiltersApplied] = useState(false);

  const fetchNotes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/files/getnotes`, {
        params: { page }
      });
      setNotes(res.data.notes);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.currentPage);
    } catch (err) {
      console.error('Failed to fetch notes:', err);
      setError('Failed to load notes. Please try again later.');
      toast.error('Failed to load notes');
    } finally {
      setIsLoading(false);
    }
  };



  const handlePageChange = (newPage: number) => {
    // Implement pagination logic
    setCurrentPage(newPage);
  };

  useEffect(() => {
    if (page === 0 && !hasFetched.current) {
      hasFetched.current = true;
      return;
    }
    fetchNotes();
  }, [page]);

  return (
    <div className="w-full">
      {/* Error State */}
      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
          {error}
          <button 
            onClick={fetchNotes}
            className="ml-4 px-3 py-1 text-sm bg-red-200 dark:bg-red-800 rounded hover:bg-red-300 dark:hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div 
              key={`skeleton-${i}`} 
              className="h-64 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && notes.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="w-20 h-20 mb-6 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
            <svg 
              width="36" 
              height="36" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="text-gray-400 dark:text-gray-500"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <path d="M14 2v6h6"></path>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
            </svg>
          </div>
          <h3 className="text-xl font-medium mb-2 text-gray-800 dark:text-gray-200">
            No notes found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
            {filtersApplied 
              ? "No notes match your current filters. Try adjusting your search."
              : "You haven't created any notes yet. Get started by uploading your first document!"}
          </p>
          {!filtersApplied && onCreateNew && (
            <button
              onClick={onCreateNew}
              className={cn(
                "px-6 py-2 rounded-lg font-medium",
                "flex items-center gap-2",
                "transition-colors duration-200",
                "bg-blue-600 hover:bg-blue-700 text-white",
                "dark:bg-blue-700 dark:hover:bg-blue-800"
              )}
            >
              <Plus size={18} />
              Create First Note
            </button>
          )}
        </div>
      )}

      {/* Notes Grid */}
      {!isLoading && !error && notes.length > 0 && (
        <>
          <div className="mb-4 flex justify-between items-center">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing {notes.length} {notes.length === 1 ? 'note' : 'notes'}
              {filtersApplied && ' matching your filters'}
            </div>
            {/* Add filter/sort controls here if needed */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div 
                key={note.id} 
                className={cn(
                  "transform transition-all duration-300",
                  "hover:-translate-y-1 hover:shadow-lg",
                  "group/note"
                )}
              >
                <PDFCard
                  id={note.id}
                  initialUpvoteCount={note.upvotedBy.length}
                  upvotedBy={note.upvotedBy}
                  title={note.title}
                  docLink={note.fileUrl}
                  owner={note.owner?.name || "Anonymous"}
                  imageUrl={note.thumbnailUrl || Document.src}
                  darkMode={isDarkMode}
                />
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              {/* Implement your Pagination component here */}
              {/* <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              /> */}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NotesCards;