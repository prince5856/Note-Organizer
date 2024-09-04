import React, { useState } from "react";

const EditNote = ({ note, handleEditNote, handleCancelEdit }) => {
  const [noteText, setNoteText] = useState(note.text || "");
  const [noteTitle, setNoteTitle] = useState(note.title || "");
  const [noteCategory, setNoteCategory] = useState(note.category || "");
  const characterLimit = 200;

  const handleChange = (event) => {
    if (characterLimit - event.target.value.length >= 0) {
      setNoteText(event.target.value);
    }
  };

  const handleTitleChange = (event) => {
    setNoteTitle(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setNoteCategory(event.target.value);
  };

  const handleSaveClick = () => {
    handleEditNote(
      note.id,
      noteTitle.trim(),
      noteText.trim(),
      noteCategory.trim()
    );
  };

  return (
    <div className="note new">
      <span>Edit Title</span>
      <input
        className="input-cls"
        value={noteTitle}
        onChange={handleTitleChange}
      ></input>
      <span>Edit category</span>
      <input
        className="input-cls"
        value={noteCategory}
        onChange={handleCategoryChange}
      ></input>
      <span>Type to edit a note</span>
      <textarea
        autoFocus
        rows="8"
        cols="10"
        placeholder="Type to edit a note..."
        value={noteText}
        onChange={handleChange}
      ></textarea>
      <div className="note-footer">
        <button className="save" onClick={handleSaveClick}>
          Save
        </button>
        <button className="cancel" onClick={handleCancelEdit}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditNote;
