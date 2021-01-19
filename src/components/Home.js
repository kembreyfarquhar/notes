import { useEffect, useState } from "react";
import { getNotes } from "../utils/localStorage";

const HEADER = "flex w-full py-2 justify-between items-center ";

const HEADER_TITLE = "text-xl font-bold ";

const ADD_BUTTON =
  "font-medium text-2xl px-4 py-2 rounded hover:cursor-pointer transition duration-500 ease-in-out ";

const GRID = "grid grid-cols-1 divide-y w-full h-full overflow-y-scroll ";

const NOTE_CELL =
  "py-2 px-2 w-full hover:cursor-pointer transition duration-500 ease-in-out ";

const styles = {
  header: {
    default: HEADER + "border-b border-solid border-gray-400",
    cute: HEADER + "border-b-4 border-dotted border-red-400",
    hacker: HEADER + "border-b-2 border-solid border-green-dark",
    sleek: HEADER + "border-b-4 border-double border-yellow-900",
    pride: HEADER + "border-b border-solid border-gray-400",
  },
  headerTitle: {
    default: HEADER_TITLE + "font-sans text-gray-800",
    cute: HEADER_TITLE + "font-sans text-red-800",
    hacker: HEADER_TITLE + "font-mono text-green",
    sleek: HEADER_TITLE + "font-serif text-yellow-900",
    pride: HEADER_TITLE + "font-sans text-gray-800 font-black",
  },
  addButton: {
    default: ADD_BUTTON + "font-sans text-blue-600 hover:bg-blue-100",
    cute: ADD_BUTTON + "font-sans text-red-600 hover:bg-red-50",
    hacker:
      ADD_BUTTON +
      "font-mono text-yellow-400 hover:bg-white hover:bg-opacity-10",
    sleek: ADD_BUTTON + "font-serif font-bold text-blue-600 hover:bg-yellow-50",
    pride:
      ADD_BUTTON +
      "font-sans font-extrabold text-blue-600 hover:bg-black hover:bg-opacity-10",
  },
  grid: {
    default: GRID + "divide-gray-300",
    cute: GRID + "divide-red-300",
    hacker: GRID + "divide-green-dark",
    sleek: GRID + "divide-yellow-800",
    pride: GRID + "divide-gray-300",
  },
  noteCell: {
    default: NOTE_CELL + "hover:bg-blue-100",
    cute: NOTE_CELL + "hover:bg-red-50",
    hacker: NOTE_CELL + "hover:bg-white hover:bg-opacity-20",
    sleek: NOTE_CELL + "hover:bg-yellow-50",
    pride: NOTE_CELL + "hover:bg-black hover:bg-opacity-10",
  },
  noteTitle: {
    default: "font-sans text-gray-800",
    cute: "font-sans text-red-800",
    hacker: "font-mono text-green",
    sleek: "font-serif text-yellow-900",
    pride: "font-sans text-gray-800 font-medium",
  },
  noNotes: {
    default: "font-sans text-gray-800 m-4 text-lg",
    cute: "font-sans text-red-800 m-4 text-lg",
    hacker: "font-mono text-green m-4 text-lg",
    sleek: "font-serif text-yellow-900 m-4 text-lg",
    pride: "font-sans text-gray-800 font-medium m-4 text-lg",
  },
};

function Home({ history, theme }) {
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    setNotes(getNotes());
  }, []);

  const goToEditor = (path) => history.push("/editor");

  const goToNote = (title) => history.push(`/note/${title}`);

  if (!theme) return null;
  else
    return (
      <div className="w-full h-full flex flex-col">
        <div className={styles.header[theme]}>
          <h1 className={styles.headerTitle[theme]}>Notes</h1>
          <button onClick={goToEditor} className={styles.addButton[theme]}>
            +
          </button>
        </div>
        <div className={styles.grid[theme]}>
          {notes ? (
            notes.map((note, index) => (
              <div className={styles.noteCell[theme]} key={index}>
                <p
                  className={styles.noteTitle[theme]}
                  onClick={() => goToNote(note.title)}
                >
                  {note.title}
                </p>
              </div>
            ))
          ) : (
            <p className={styles.noNotes[theme]}>No notes</p>
          )}
        </div>
      </div>
    );
}

export default Home;
