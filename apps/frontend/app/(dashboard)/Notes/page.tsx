

import React from "react";
import { getNotes } from "../../lib/actions/Notes";
import NotesCards from "../../component/NotesCards/notesCards";

const Page = async () => {

  const notes = await getNotes();
  console.log("notes is ", notes);

  return (
    <div>
      <NotesCards initialNotes={notes} />
    </div>
  );
};

export default Page;
