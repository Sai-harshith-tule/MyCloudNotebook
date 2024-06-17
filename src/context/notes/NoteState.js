import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // GET ALL NOTES
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        },
      });
      const json = await response.json();
      console.log("Fetched notes:", json);
      setNotes(json);
    } catch (error) {
      console.error("An error occurred while fetching notes:", error);
    }
  };

  // ADD NOTE
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const note = await response.json(); // Wait for the response json
      console.log("Added note:", note);
      setNotes(notes.concat(note));
    } catch (error) {
      console.error("An error occurred while adding a note:", error);
    }
  };

  // EDIT NOTE
  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      console.log("Updated note:", json);
      setNotes(notes.map(note => (note._id === id ? json : note)));
    } catch (error) {
      console.error("An error occurred while updating the note:", error);
    }
  };

  // DELETE NOTE
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("Deleted note:", id);
      setNotes(notes.filter(note => note._id !== id));
    } catch (error) {
      console.error("An error occurred while deleting the note:", error);
    }
  };

  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
