import React from "react";
import { useContext } from "react";
import Notecontext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(Notecontext);
  const { notes } = context;
  // eslint-disable-next-line
  return (
    <>
    <AddNote/>
    <div className="row mt-3">
      <h1>Your Notes</h1>
      {notes.map((note) => {
        return <NoteItem key = {note._id} note={note} />;
      })}
    </div>
    </>
  );
};

export default Notes;
