import BaseNoteEditor from "components/BaseNoteEditor";
import { useState, useContext } from "react";
import axios from "axios";

import { AddNoteContainer } from "./style";

import { FlexNoteButton } from "components/utils";

import { NotesListUpdateFunctionContext } from "App";

export default function AddNoteEditor() {
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");
  const [hasInputError, setHasInputError] = useState(false);

  const setNotes = useContext(NotesListUpdateFunctionContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const API_URL = "http://localhost:8000";
    setIsFormSubmitting(true);
    try {
      const { data } = await axios.post(`${API_URL}/api/note`, {
        title: noteTitle,
        body: noteBody,
      });
      setNotes((prev) => [...prev, data]);
      setNoteTitle("");
      setNoteBody("");
    } catch (err) {
      if (err.response.status === 400) {
        setHasInputError(true);
      }
    }
    setIsFormSubmitting(false);
  };

  return (
    <AddNoteContainer>
      <BaseNoteEditor
        noteTitle={noteTitle}
        setNoteTitle={setNoteTitle}
        noteBody={noteBody}
        setNoteBody={setNoteBody}
        onSubmit={(event) => handleSubmit(event)}
        hasError={hasInputError}
        setHasError={setHasInputError}
      >
        <FlexNoteButton type="submit" disabled={isFormSubmitting}>
          {isFormSubmitting ? "..." : "Add Note"}
        </FlexNoteButton>
      </BaseNoteEditor>
    </AddNoteContainer>
  );
}
