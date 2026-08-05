import styled from "styled-components";
import { trimString } from "../utils/helpers";
import { useFormContext } from "react-hook-form";

const Textarea = styled.textarea`
  resize: none;
  width: 100%;
  font-size: 1.4rem;
  min-height: 10rem;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid #d1d5db;
  outline: none;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: #2684ff;
    box-shadow: 0 0 0 3px rgba(38, 132, 255, 0.15);
  }
`;

function Note({ id = "note", maxLength }) {
  const { register } = useFormContext();

  return (
    <Textarea
      id={id}
      maxLength={maxLength}
      placeholder={maxLength ? `備註內容最多${maxLength}個字` : "輸入備註"}
      {...register("note", {
        setValueAs: trimString,
      })}
    />
  );
}

export default Note;
