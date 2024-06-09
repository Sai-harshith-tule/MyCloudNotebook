import React from "react";

function NoteItem(props) {
  const { note } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description} Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit, eius! Quibusdam aliquid maxime, consequuntur praesentium quo at doloribus quis tempore aut ducimus similique non quos modi sequi cum et libero.</p>
          <i className="fa-regular fa-trash-can mx-2"></i>
          <i className="fa-regular fa-pen-to-square mx-2"></i>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
