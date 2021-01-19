import { useEffect, useState } from "react";
import { getSingleNote, deleteNote } from "../utils/localStorage";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";

const BUTTON =
  "text-2xl px-4 py-2 mx-4 rounded hover:cursor-pointer transition duration-500 ease-in-out ";

const PREVIEW_CONTAINER =
  "h-4/5 w-4/5 p-7 overflow-y-scroll rounded shadow bg-white ";

const styles = {
  homeBtn: {
    default: BUTTON + "self-start font-sans text-blue-600 hover:bg-blue-100",
    cute: BUTTON + "self-start font-sans text-red-700 hover:bg-red-50",
    hacker:
      BUTTON +
      "self-start font-mono text-yellow-300 hover:bg-white hover:bg-opacity-20",
    sleek: BUTTON + "self-start font-serif text-gray-800 hover:bg-yellow-50",
  },
  deleteBtn: {
    default: BUTTON + "font-sans text-gray-600 hover:bg-red-100",
    cute: BUTTON + "font-sans text-red-600 hover:bg-red-50",
    hacker: BUTTON + "font-mono text-white hover:bg-white hover:bg-opacity-20",
    sleek: BUTTON + "font-serif text-gray-800 hover:bg-yellow-50",
  },
  editBtn: {
    default: BUTTON + "font-sans text-blue-600 hover:bg-blue-100",
    cute: BUTTON + "font-sans text-gray-600 hover:bg-red-50",
    hacker:
      BUTTON + "font-mono text-yellow-300 hover:bg-white hover:bg-opacity-20",
    sleek: BUTTON + "font-serif text-blue-600 hover:bg-yellow-50",
  },
  previewContainer: {
    default: PREVIEW_CONTAINER + "border border-gray-300",
    cute: PREVIEW_CONTAINER + "border-2 border-red-300",
    hacker: PREVIEW_CONTAINER + "border-2 border-green",
    sleek: PREVIEW_CONTAINER + "border-4 border-double border-yellow-900",
  },
};

function Note({ history, theme }) {
  let { title } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    const thisNote = getSingleNote(title);
    setNote(thisNote[0]);
  }, []);

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  const goHome = () => history.push("/");

  const edit = () => history.push(`/editor/${note.title}`);

  const handleDelete = () => {
    deleteNote(title);
    history.push("/");
  };

  if (!note) return null;
  else
    return (
      <div className="h-full w-full flex flex-col p-4 justify-evenly items-center">
        <button className={styles.homeBtn[theme]} onClick={goHome}>
          Home
        </button>
        <div className={styles.previewContainer[theme]}>
          <h1 className="border-b border-gray-300 pb-2">{note.title}</h1>
          <div
            className="p-2 mt-2 html-container"
            dangerouslySetInnerHTML={createMarkup(note.body)}
          ></div>
        </div>
        <div className="flex flex-row">
          <button className={styles.deleteBtn[theme]} onClick={handleDelete}>
            Delete
          </button>
          <button className={styles.editBtn[theme]} onClick={edit}>
            Edit
          </button>
        </div>
      </div>
    );
}

export default Note;
