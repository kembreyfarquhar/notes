export function getNotes() {
  const notes = window.localStorage.getItem("notes");
  if (notes) {
    let parsedNotes = JSON.parse(notes);
    return parsedNotes;
  } else return null;
}

export function getSingleNote(title) {
  const notes = window.localStorage.getItem("notes");
  const parsedNotes = JSON.parse(notes);
  return parsedNotes.filter((note) => note.title === title);
}

export function deleteNote(title) {
  const notes = window.localStorage.getItem("notes");
  const parsedNotes = JSON.parse(notes);
  const filteredNotes = parsedNotes.filter((note) => note.title !== title);
  window.localStorage.setItem("notes", JSON.stringify(filteredNotes));
}

export function saveNote(title, body) {
  const note = { title, body };
  const notes = window.localStorage.getItem("notes");
  if (notes) {
    let parsedNotes = JSON.parse(notes);
    let saved = false;
    let mappedNotes = parsedNotes.map((savedNote) => {
      if (savedNote.title === title) {
        saved = true;
        return note;
      } else {
        return savedNote;
      }
    });
    if (!saved) mappedNotes.push(note);
    window.localStorage.setItem("notes", JSON.stringify(mappedNotes));
  } else {
    const noteToStore = [note];
    window.localStorage.setItem("notes", JSON.stringify(noteToStore));
  }
}
