import { useState } from "react";

import DeleteModal from "./DeleteModal";
import { NoteBody, NoteContainer, NoteTitle } from "./style";
import { ButtonsGrid, FlexNoteButton } from "components/utils";

export default function NoteViewer({ note, setNoteView }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { id, title, body } = note;

  const handleDeleteNote = () => {
    setShowDeleteModal(true);
  };

  return (
    <NoteContainer>
      <NoteTitle>{title}</NoteTitle>
      <NoteBody>{body}</NoteBody>
      {showDeleteModal ? (
        <DeleteModal noteId={id} setShowDeleteModal={setShowDeleteModal} />
      ) : (
        <ButtonsGrid>
          <FlexNoteButton onClick={() => setNoteView("editing")}>
            Edit
          </FlexNoteButton>
          <FlexNoteButton onClick={() => handleDeleteNote()}>
            Delete
          </FlexNoteButton>
        </ButtonsGrid>
      )}
    </NoteContainer>
  );
}
