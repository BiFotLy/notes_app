import styled from "styled-components";

export const EditNoteForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 2px;
`;

export const NoteTitleInput = styled.input`
  background-color: var(
    ${(props) =>
      (props.$isInvalid & (props.value === "") && "--note-err") ||
      "--note-title-bg"}
  );

  flex: 1 1 auto;

  padding: 4px;

  border-style: solid;
  border-width: 1px;
  border-color: #777777;
`;

export const NoteBodyInput = styled.textarea`
  background-color: var(
    ${(props) =>
      (props.$isInvalid & (props.value === "") && "--note-err") ||
      "--note-body-bg"}
  );

  flex: 1 1 auto;

  padding: 4px;

  border-style: solid;
  border-width: 1px;
  border-color: #777777;

  resize: vertical;
`;
