import styled from "styled-components";

export const NoteButton = styled.button`
  border-width: 1px;
  border-style: solid;
  border-color: #777777;
`;

export const FlexNoteButton = styled(NoteButton)`
  flex: 1 1 auto;
`;

export const ButtonsGrid = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;
  gap: 2px;
`;
