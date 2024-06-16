import React, { useEffect, useContext, useRef, useState } from "react";
import NoteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({ id: "", title: "", description: "", tag: "" });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, title: currentNote.title, description: currentNote.description, tag: currentNote.tag });
  };

  const handleClick = async () => {
    console.log("Updating the note...", note);
    await editNote(note.id, note.title, note.description, note.tag); // Call the update note function here
    refClose.current.click();
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea className="form-control" id="description" name="description" value={note.description} onChange={onChange}></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <h1>Your Notes</h1>
        {notes.length > 0 ? (
          notes.map((note) => (
            <NoteItem key={note._id} updateNote={updateNote} note={note} />
          ))
        ) : (
          <p>No notes to display</p>
        )}
      </div>
    </>
  );
};

export default Notes;
