import axios from "axios";
import { useState, useContext } from "react";
import { NotesListUpdateFunctionContext } from "App";

import BaseNoteEditor from "components/BaseNoteEditor";
import { FlexNoteButton } from "components/utils";

export default function NoteEditor({ note, setNoteView }) {
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [noteTitle, setNoteTitle] = useState(note.title);
  const [noteBody, setNoteBody] = useState(note.body);
  const [isInvalidSave, setIsInvalidSave] = useState(false);

  const setNotes = useContext(NotesListUpdateFunctionContext);

  const handleNoteSave = async (event, id) => {
    event.preventDefault();
    const API_URL = "http://localhost:8000";
    try {
      await axios.put(`${API_URL}/api/note/${id}`, {
        title: noteTitle,
        body: noteBody,
      });
      const { data } = await axios.get(`${API_URL}/api/notes`);
      setNotes(data);
      setNoteView("viewing");
    } catch (err) {
      if (err.response.status === 400) {
        setIsInvalidSave(true);
      }
    }
  };

  return (
    <BaseNoteEditor
      noteTitle={noteTitle}
      setNoteTitle={setNoteTitle}
      noteBody={noteBody}
      setNoteBody={setNoteBody}
      onSubmit={(event) => handleNoteSave(event, note.id)}
      hasError={isInvalidSave}
      setHasError={setIsInvalidSave}
    >
      <FlexNoteButton type="submit">
        {isFormSubmitting ? "..." : "Save"}
      </FlexNoteButton>
      <FlexNoteButton type="button" onClick={() => setNoteView("viewing")}>
        Cancel
      </FlexNoteButton>
    </BaseNoteEditor>
  );
}
