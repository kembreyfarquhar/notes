import { useEffect, useState } from "react";
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState,
} from "draft-js";
import { Editor as RDEditor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { saveNote, getSingleNote } from "../utils/localStorage";
import { useParams } from "react-router-dom";

const INPUT =
  "focus:outline-none focus:ring py-2 px-2 shadow rounded text-xl font-medium mb-3 w-full ";

const BUTTON =
  "text-2xl px-4 py-2 mx-4 rounded hover:cursor-pointer transition duration-500 ease-in-out ";

const styles = {
  input: {
    default: INPUT + "ring-blue-300 bg-white font-sans text-gray-800",
    cute: INPUT + "ring-red-300 bg-white font-sans text-gray-800",
    hacker: INPUT + "ring-green bg-gray-200 font-mono text-black",
    sleek: INPUT + "ring-yellow-900 bg-white font-serif text-gray-800",
  },
  shadow: {
    boxShadow:
      "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  },
  toolbar: {
    default: {
      background: "rgba(191, 219, 254, 1)",
      border: "1px solid rgba(147, 197, 253, 1)",
    },
    cute: {
      background: "rgba(252, 165, 165, 1)",
      border: "2px solid rgba(248, 113, 113, 1)",
    },
    hacker: {
      background: "#249F00",
      border: "2px solid #3AFF00",
    },
    sleek: {
      background: "rgba(255, 251, 235, 1)",
      border: "4px double rgba(120, 53, 15, 1)",
      borderRadius: "4px",
    },
  },
  editor: {
    default: {
      background: "#fff",
      padding: "1rem",
      border: "1px solid #ccc",
    },
    cute: {
      background: "#fff",
      padding: "1rem",
      border: "2px solid rgba(252, 165, 165, 1)",
    },
    hacker: {
      background: "#fff",
      padding: "1rem",
      border: "2px solid #3AFF00",
    },
    sleek: {
      background: "#fff",
      padding: "1rem",
      border: "4px double rgba(120, 53, 15, 1)",
      borderRadius: "4px",
    },
  },
  cancelBtn: {
    default: BUTTON + "font-sans text-gray-600 hover:bg-red-100",
    cute: BUTTON + "font-sans text-red-600 hover:bg-red-50",
    hacker: BUTTON + "font-mono text-white hover:bg-white hover:bg-opacity-20",
    sleek: BUTTON + "font-serif text-gray-800 hover:bg-yellow-50",
  },
  saveBtn: {
    default: BUTTON + "font-sans text-blue-600 hover:bg-blue-100",
    cute: BUTTON + "font-sans text-gray-600 hover:bg-red-50",
    hacker:
      BUTTON + "font-mono text-yellow-400 hover:bg-white hover:bg-opacity-20",
    sleek: BUTTON + "font-serif text-blue-600 hover:bg-yellow-50",
  },
};

function Editor({ history, theme }) {
  const { notetitle } = useParams();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [convertedContent, setConvertedContent] = useState(null);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (notetitle) {
      const savedNote = getSingleNote(notetitle);
      setTitle(notetitle);
      setConvertedContent(savedNote[0].body);
      getContentState(savedNote[0].body);
    }
  }, [notetitle]);

  const getContentState = (markup) => {
    const blocksFromHtml = convertFromHTML(markup);
    const state = ContentState.createFromBlockArray(
      blocksFromHtml.contentBlocks,
      blocksFromHtml.entityMap
    );
    setEditorState(EditorState.createWithContent(state));
  };

  const getHtml = (state) => {
    let currentContentHtml = draftToHtml(
      convertToRaw(state.getCurrentContent())
    );
    setConvertedContent(currentContentHtml);
  };

  const handleEditorChange = (state) => {
    setEditorState(state);
    getHtml(state);
  };

  const saveNewNote = () => {
    if (!title || !convertedContent) return;
    saveNote(title, convertedContent);
    history.push(`/note/${title}`);
  };

  const cancel = () => history.goBack();

  const handleTitleChange = (e) => setTitle(e.target.value);

  return (
    <div className="flex flex-col p-4 w-full h-full justify-evenly items-center">
      <div className="flex flex-col h-5/6">
        <input
          className={styles.input[theme]}
          placeholder="Type title here"
          value={title}
          onChange={handleTitleChange}
          maxLength={40}
        />
        <RDEditor
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          wrapperStyle={{ height: "70%" }}
          toolbarStyle={styles.toolbar[theme]}
          editorStyle={{ ...styles.editor[theme], ...styles.shadow }}
        />
      </div>
      <div className="flex flex-row">
        <button onClick={cancel} className={styles.cancelBtn[theme]}>
          Cancel
        </button>
        <button onClick={saveNewNote} className={styles.saveBtn[theme]}>
          Save
        </button>
      </div>
    </div>
  );
}

export default Editor;
