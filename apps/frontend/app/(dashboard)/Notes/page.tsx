"use client";

import React, { useEffect, useState } from "react";
import { getNotes } from "../../lib/actions/Notes";
import PDFCard from "../../component/Card/card";

const Page = () => {
  const [notes, setNotes] = useState<Array<{ title: string }>>([]);

  async function fetchNotes() {
    try {
      const response = await getNotes();
      console.log("response ", response);
      setNotes(response); // ✅ Fix: Updating state
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  console.log("notes is ", notes);

  return (
    <div>
      {notes.map((note, i) => (
        <PDFCard
          key={i}
          title={note.title}
          owner="Nan"
          imageUrl="None"
          isDarkMode={false}
          onDownload={() => {}} // ✅ Fix: Replaced `() => void`
          onUpvote={() => {}} // ✅ Fix: Replaced `() => void`
        />
      ))}
    </div>
  );
};

export default Page;
