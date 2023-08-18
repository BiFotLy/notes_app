import { EditNoteForm, NoteTitleInput, NoteBodyInput } from "./style";

import { ButtonsGrid } from "components/utils";

export default function BaseNoteEditor({
  onSubmit,
  hasError,
  setHasError,
  noteTitle,
  setNoteTitle,
  noteBody,
  setNoteBody,
  children,
}) {
  return (
    <EditNoteForm onSubmit={onSubmit}>
      <NoteTitleInput
        type="text"
        placeholder="Enter Title"
        $isInvalid={hasError}
        value={noteTitle}
        onChange={(event) => {
          setNoteTitle(event.target.value);
          setHasError(false);
        }}
      />
      <NoteBodyInput
        placeholder="Enter Note"
        cols={30}
        rows={10}
        $isInvalid={hasError}
        value={noteBody}
        onChange={(event) => {
          setNoteBody(event.target.value);
          setHasError(false);
        }}
      />
      <ButtonsGrid>{children}</ButtonsGrid>
    </EditNoteForm>
  );
}
