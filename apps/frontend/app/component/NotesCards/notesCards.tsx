"use client";
import React, { useState, useEffect, useRef } from 'react';
import PDFCard from '../Card/card';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { pageAtom } from '../../store/pageAtom';
import { themeAtom } from '../../store/themeAtom';
import Document from '../../assets/document.png';

interface NotesType {
    title:string,
    imageUrl:string,
    owner:string,
    year:string,
    fileUrl:string
}

const NotesCards = ({initialNotes}: {initialNotes:NotesType[]} ) => {
  const page = useRecoilValue(pageAtom);
  const [notes, setNotes] = useState<NotesType[]>(initialNotes);
  const hasFetched = useRef(false);
  const isDarkMode = useRecoilValue(themeAtom)
  const fetchNotes = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/files/getnotes`);
      setNotes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Skip fetch if it's page 0 and we already have initialNotes
    if (page === 0 && !hasFetched.current) {
      hasFetched.current = true;
      return;
    }
    fetchNotes();
  }, [page]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {notes?.length > 0 ? (
        notes.map((note, i) => (
          <div 
            key={i} 
            className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <PDFCard
              id={note.id}
              upvoteCount={note.upvotedBy.length}
              upvotedBy={note.upvotedBy}
              title={note.title}
              docLink={note.fileUrl}
              owner="Nan"
              imageUrl={Document.src}
            />
          </div>
        ))
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center py-16 text-center text-gray-500">
          <div className="mb-4 opacity-50">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <path d="M14 2v6h6"></path>
              <line x1="4" y1="18" x2="12" y2="18"></line>
              <line x1="4" y1="14" x2="20" y2="14"></line>
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">No notes found</h3>
          <p className="text-sm max-w-md">
            You haven't created any notes yet or none match your current filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default NotesCards;
