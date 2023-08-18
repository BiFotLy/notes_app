import { useState, useEffect, createContext } from "react";
import axios from "axios";

import AddNoteEditor from "components/AddNoteEditor";
import NotesList from "components/NotesList";

import { AppTitle, AppRoot } from "./style";

export const NotesListUpdateFunctionContext = createContext(null);

export default function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const getNotes = async () => {
      const API_URL = "http://localhost:8000";
      const { data } = await axios.get(`${API_URL}/api/notes`);
      setNotes(data);
    };
    getNotes();
  }, []);

  return (
    <AppRoot>
      <NotesListUpdateFunctionContext.Provider value={setNotes}>
        <div>
          <AppTitle>Notes App</AppTitle>
          <AddNoteEditor />
          <NotesList notes={notes} />
        </div>
      </NotesListUpdateFunctionContext.Provider>
    </AppRoot>
  );
}
