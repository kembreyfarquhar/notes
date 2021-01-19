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
    hacker: HEADER + "border-b-2 border-solid border-green-800",
  },
  headerTitle: {
    default: HEADER_TITLE + "font-sans text-gray-800",
    cute: HEADER_TITLE + "font-sans text-red-800",
    hacker: HEADER_TITLE + "font-mono text-green-400",
  },
  addButton: {
    default: ADD_BUTTON + "font-sans text-blue-600 hover:bg-blue-100",
    cute: ADD_BUTTON + "font-sans text-red-600 hover:bg-red-50",
    hacker:
      ADD_BUTTON +
      "font-mono text-yellow-500 hover:bg-white hover:bg-opacity-10",
  },
  grid: {
    default: GRID + "divide-gray-300",
    cute: GRID + "divide-red-300",
    hacker: GRID + "divide-green-900",
  },
  noteCell: {
    default: NOTE_CELL + "hover:bg-blue-100",
    cute: NOTE_CELL + "hover:bg-red-50",
    hacker: NOTE_CELL + "hover:bg-white hover:bg-opacity-10",
  },
  noteTitle: {
    default: "font-sans text-gray-800",
    cute: "font-sans text-red-800",
    hacker: "font-mono text-green-300",
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
            <p>No notes</p>
          )}
        </div>
      </div>
    );
}

export default Home;
