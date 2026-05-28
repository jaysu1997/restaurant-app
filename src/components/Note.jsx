import styled from "styled-components";
import { trimString } from "../utils/helpers";
import { useFormContext } from "react-hook-form";

const TextArea = styled.textarea`
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

function Note({ maxLength }) {
  const { register } = useFormContext();

  return (
    <TextArea
      maxLength={maxLength}
      placeholder={
        maxLength ? `備註內容最多${maxLength}個字` : "可輸入備註內容"
      }
      {...register("note", {
        setValueAs: trimString,
      })}
    />
  );
}

export default Note;
