import { useContext } from "react";
import axios from "axios";

import { NotesListUpdateFunctionContext } from "App";
import { ButtonsGrid, FlexNoteButton } from "components/utils";

export default function DeleteModal({ noteId, setShowDeleteModal }) {
  const setNotes = useContext(NotesListUpdateFunctionContext);

  const handleYesClick = async () => {
    const API_URL = "http://localhost:8000";
    await axios.delete(`${API_URL}/api/note/${noteId}`);
    const { data } = await axios.get(`${API_URL}/api/notes`);
    setNotes(data);
    setShowDeleteModal(false);
  };

  const handleNoClick = () => {
    setShowDeleteModal(false);
  };

  return (
    <ButtonsGrid>
      <p>Delete this Note?</p>
      <FlexNoteButton onClick={() => handleYesClick()}>Yes</FlexNoteButton>
      <FlexNoteButton onClick={handleNoClick}>No</FlexNoteButton>
    </ButtonsGrid>
  );
}
