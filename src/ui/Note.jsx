import styled from "styled-components";
import { trimString } from "../utils/helpers";

const StyledNote = styled.div`
  display: grid;
  grid-template-columns: minmax(8rem, auto) minmax(0, 1fr);
  column-gap: 1.6rem;
  row-gap: 0.6rem;
`;

const TextArea = styled.textarea`
  grid-row: 2;
  grid-column: 1 / -1;
  width: 100%;
  resize: none;
  min-height: 8rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 0.6rem 0.8rem;
  font-size: 1.4rem;

  &:focus {
    outline: none;
    border-color: #2684ff;
    box-shadow: 0 0 0 1px #2684ff;
  }
`;

const NoteView = styled.span`
  width: 100%;
  white-space: pre-wrap;
  word-break: break-word;
`;

function Note({ register, children, mode = "edit", value, maxLength = 50 }) {
  return (
    <StyledNote>
      {children}
      {mode === "view" && <NoteView>{value || "無"}</NoteView>}
      {mode === "edit" && (
        <TextArea
          maxLength={maxLength}
          placeholder={`備註內容最多${maxLength}個字`}
          {...register("note", {
            setValueAs: trimString,
          })}
        />
      )}
    </StyledNote>
  );
}

export default Note;
