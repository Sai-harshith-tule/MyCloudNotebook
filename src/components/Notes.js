import React, { useEffect, useContext } from "react";
import NoteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getNotes } = context;

  useEffect(() => {
    getNotes();
  }, [getNotes]); // Adding getNotes as a dependency

  return (
    <>
      <AddNote />
      <div className="row mt-3">
        <h1>Your Notes</h1>
        {notes.map(note => (
          <NoteItem key={note._id} note={note} />
        ))}
      </div>
    </>
  );
};

export default Notes;
