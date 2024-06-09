import React from "react";
import { useContext } from "react";
import Notecontext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";

const Notes = () => {
  const context = useContext(Notecontext);
  const { notes, setNotes } = context;
  // eslint-disable-next-line
  return (
    <div className="row mt-3">
      <h1>Your Notes</h1>
      {notes.map((note) => {
        return <NoteItem key = {note._id} note={note} />;
      })}
    </div>
  );
};

export default Notes;
