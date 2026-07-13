import styled from "styled-components";
import { trimString } from "../utils/helpers";
import { useFormContext } from "react-hook-form";

const StyledNote = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const TextArea = styled.textarea`
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
    box-shadow: 0 0 0 3px rgba(38, 132, 255, 0.15);
  }
`;

function Note({ label, maxLength, className }) {
  const { register } = useFormContext();

  return (
    <StyledNote className={className}>
      {label && <label htmlFor="note">{label}</label>}
      <TextArea
        id="note"
        maxLength={maxLength}
        placeholder={
          maxLength ? `備註內容最多${maxLength}個字` : "可輸入備註內容"
        }
        {...register("note", {
          setValueAs: trimString,
        })}
      />
    </StyledNote>
  );
}

export default Note;
