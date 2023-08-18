import styled from "styled-components";

export const NoteContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 2px;
`;

export const NoteTitle = styled.h3`
  background-color: var(--note-title-bg);

  flex: 1 1 auto;

  padding: 4px;
  margin: 0;

  border-style: solid;
  border-width: 1px;
  border-color: #777777;
`;

export const NoteBody = styled.p`
  background-color: #ffffdd;

  flex: 1 1 auto;

  text-align: left;

  padding: 4px;

  border-style: solid;
  border-width: 1px;
  border-color: #777777;

  resize: vertical;
`;
