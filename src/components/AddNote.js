import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";

const AddNote = ({ handleAddNote, existingTitles }) => {
  const [noteText, setNoteText] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [noteCategory, setNoteCategory] = useState("");
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const characterLimit = 200;

  useEffect(() => {
    const allFieldsFilled =
      noteTitle.trim().length > 0 &&
      noteCategory.trim().length > 0 &&
      noteText.trim().length > 0;
    setIsSaveEnabled(allFieldsFilled);
    setErrorMessage(""); // Clear error message when fields change
  }, [noteTitle, noteCategory, noteText]);

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
    const titleExists = existingTitles.includes(noteTitle.trim());
    if (titleExists) {
      setErrorMessage("Note with the same title already exists!");
      return;
    }

    if (isSaveEnabled) {
      handleAddNote(noteTitle.trim(), noteText.trim(), noteCategory.trim());
      setNoteText("");
      setNoteTitle("");
      setNoteCategory("");
      setIsAddingNote(false);
      setErrorMessage(""); // Clear error message on successful save
    }
  };

  const handleCancelClick = () => {
    setNoteText("");
    setNoteTitle("");
    setNoteCategory("");
    setIsAddingNote(false);
    setErrorMessage(""); // Clear error message on cancel
  };

  return (
    <div>
      {isAddingNote ? (
        <div className="note-container">
          <div className="note new">
            <textarea
              rows="1"
              cols="1"
              autoFocus
              placeholder="Add title..."
              value={noteTitle}
              onChange={handleTitleChange}
            ></textarea>
            <textarea
              rows="1"
              cols="1"
              autoFocus
              placeholder="Add category..."
              value={noteCategory}
              onChange={handleCategoryChange}
            ></textarea>
            <textarea
              autoFocus
              rows="8"
              cols="10"
              placeholder="Type to add a note..."
              value={noteText}
              onChange={handleChange}
            ></textarea>
            <div className="note-footer">
              <button
                className="note-btn"
                onClick={handleSaveClick}
                disabled={!isSaveEnabled}
              >
                Save
              </button>
              <button className="note-btn" onClick={handleCancelClick}>
                Cancel
              </button>
            </div>
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
          </div>
        </div>
      ) : (
        <div className="note-container-add">
          <div className="button-container">
            <span>Add Item:</span>
            <button
              className="add-note-button"
              onClick={() => setIsAddingNote(true)}
            >
              <FaPlus className="button-icon" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNote;
