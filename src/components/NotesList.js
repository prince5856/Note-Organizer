import Note from "./Note";
import AddNote from "./AddNote";

const NotesList = ({
  notes,
  handleAddNote,
  handleDeleteNote,
  handleEditClick,
}) => {
  const existingTitles = () => {
    const arr = [];
    for (let i = 0; i < notes.length; i++) {
      arr.push(notes[i].title);
    }
    return arr;
  };
  return (
    <div className="notes-list">
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          title={note.title}
          text={note.text}
          category={note.category}
          handleDeleteNote={handleDeleteNote}
          handleEditClick={handleEditClick}
        />
      ))}
      <AddNote
        handleAddNote={handleAddNote}
        existingTitles={existingTitles()}
      />
    </div>
  );
};

export default NotesList;
