import Note from "./Note";
import { NotesListContainer, NotesListHeader, NotesListBody } from "./style";

export default function NotesList({ notes }) {
  return (
    <NotesListContainer>
      <NotesListHeader>Notes List</NotesListHeader>
      <NotesListBody>
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </NotesListBody>
    </NotesListContainer>
  );
}
