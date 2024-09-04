import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import NotesList from "./components/NotesList";
import Search from "./components/Search";
import Header from "./components/Header";
import EditNote from "./components/EditNote";
import CategoryList from "./components/CategoryList";

const App = () => {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("react-notes-app-data")) || []
  );

  const [searchText, setSearchText] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [editingNote, setEditingNote] = useState("");
  const [searchCategory, setSearchCategory] = useState(
    notes.reduce((acc, curr) => {
      acc.push({ category: curr.category, clicked: false });
      return acc;
    }, [])
  );
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("react-notes-app-data"));
    if (savedNotes) {
      setNotes(savedNotes);
      setSearchCategory(
        getUniqueCategories(savedNotes).map((category) => ({
          category,
          clicked: false,
        }))
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("react-notes-app-data", JSON.stringify(notes));
  }, [notes]);

  const getUniqueCategories = (notes) => {
    const categories = notes.map((note) => note.category);
    return [...new Set(categories)];
  };

  const addNote = (title, text, category) => {
    const newNote = {
      id: nanoid(),
      title: title,
      text: text,
      category: category,
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
    setSearchCategory((prevCategories) => {
      const categories = getUniqueCategories(newNotes);
      return categories.map((category) => ({
        category,
        clicked:
          prevCategories.find((c) => c.category === category)?.clicked || false,
      }));
    });
    setTrigger(!trigger);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  const editNote = (id, title, text, category) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, title, text, category } : note
    );
    setNotes(updatedNotes);
    setEditingNote("");
    setSearchCategory((prevCategories) => {
      const categories = getUniqueCategories(updatedNotes);
      return categories.map((category) => ({
        category,
        clicked:
          prevCategories.find((c) => c.category === category)?.clicked || false,
      }));
    });
    setTrigger(!trigger);
  };

  const handleEditClick = (note) => {
    setEditingNote(note);
  };

  const handleCancelEdit = () => {
    setEditingNote(null);
  };

  const processedNotes = (notes) => {
    const allFalse = searchCategory.every((category) => !category.clicked);
    if (allFalse) {
      return notes.filter(
        (note) =>
          note.text.toLowerCase().includes(searchText) ||
          note.title.toLowerCase().includes(searchTitle)
      );
    } else {
      const clickedCategories = searchCategory
        .filter((category) => category.clicked)
        .map((category) => category.category);
      return notes.filter((note) => clickedCategories.includes(note.category));
    }
  };

  const processNotes = processedNotes(notes);

  return (
    <div>
      <div className="container">
        <Header />
        {notes.length ? (
          <Search
            handleSearchNote={setSearchText}
            setSearchTitle={setSearchTitle}
          />
        ) : null}
        {editingNote ? (
          <EditNote
            note={editingNote}
            handleEditNote={editNote}
            handleCancelEdit={handleCancelEdit}
          />
        ) : (
          <>
            <CategoryList
              notes={notes.filter(
                (note) =>
                  note.text.toLowerCase().includes(searchText) ||
                  note.title.toLowerCase().includes(searchTitle)
              )}
              handleSearchCategory={setSearchCategory}
            />
            <NotesList
              notes={processNotes}
              handleAddNote={addNote}
              handleDeleteNote={deleteNote}
              handleEditClick={handleEditClick}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
