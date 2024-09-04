import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Note = ({
  id,
  title,
  text,
  category,
  handleDeleteNote,
  handleEditClick,
}) => {
  return (
    <div className="note">
      <h3 className="note-tag">{title}</h3>
      <span className="note-tag">{text}</span>
      <div className="note-footer">
        <MdDeleteForever
          onClick={() => handleDeleteNote(id)}
          className="delete-icon"
          size="1.3em"
        />
        <FaEdit
          className="edit-icon"
          size="1.3em"
          onClick={() => handleEditClick({ id, title, text, category })}
        />
      </div>
    </div>
  );
};

export default Note;
