import styled from "styled-components";
import { trimString } from "../utils/text.js";
import { useFormContext } from "react-hook-form";

const Textarea = styled.textarea`
  resize: none;
  width: 100%;
  font-size: var(--font-size-sm);
  min-height: 10rem;
  padding: var(--space-2-5);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border-strong);
  outline: none;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--color-focus);
    box-shadow: var(--shadow-focus-control);
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
