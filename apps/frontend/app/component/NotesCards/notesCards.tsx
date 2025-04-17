"use client";
import React, { useState, useEffect, useRef } from 'react';
import PDFCard from '../Card/card';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { pageAtom } from '../../store/pageAtom';

const NotesCards = ({ initialNotes }) => {
  const page = useRecoilValue(pageAtom);
  const [notes, setNotes] = useState(initialNotes);
  const hasFetched = useRef(false);

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
    <>
      {notes?.map((note, i) => (
        <PDFCard
          key={i}
          title={note.title}
          owner="Nan"
          imageUrl="None"
          isDarkMode={false}
          onDownload={() => {}}
          onUpvote={() => {}}
        />
      ))}
    </>
  );
};

export default NotesCards;
