import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 32rem;
  padding: 2.4rem;
  gap: 1.6rem;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 600;
  width: 95dvw;
  background-color: #fafaf9;
`;

export const Description = styled.header`
  display: flex;
  flex-direction: column;
  font-size: 1.4rem;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 1.2rem;
  border: 2px dashed #475569;
  border-radius: 4px;
`;

export const Title = styled.label`
  font-size: 2.4rem;
  font-weight: 700;
  /* color: #ea580c; */
  color: #431407;
`;

export const Input = styled.input`
  height: 2.8rem;
  border: 2px solid rgba(0, 0, 0, 0.6);
  border-radius: 5px;
  font-size: 1.4rem;
  padding: 0.4rem;
  font-weight: 600;

  &:focus {
    outline: none;
    border: 2px solid #3b82f6;
  }
`;

export const SubRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-bottom: 2px dashed #475569;
  /* border-top: 2px dashed #475569; */

  padding: 1.2rem 0;
`;

export const SubHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SubTitle = styled.div`
  color: #6366f1;
  font-size: 1.8rem;
  border-bottom: 2px solid #6366f1;
`;

export const Fieldset = styled.fieldset`
  width: 100%;
  height: min-content;

  border-radius: 5px;
  border: 2px solid rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;

  &:focus-within {
    border: 2px solid #3b82f6;
  }

  &:focus-within legend {
    color: #3b82f6;
  }
`;

export const Legend = styled.legend`
  font-size: 1.4rem;
  padding: 0;
  margin-left: 1rem;
  color: rgba(0, 0, 0, 0.6);
`;

export const NestedInput = styled.input`
  width: 100%;
  height: 3.6rem;
  background-color: inherit;
  border-radius: 4px;
  border: none;
  outline: none;
  font-size: 1.4rem;
  font-weight: 600;
  padding: 0 0.8rem;
`;

export const NestedRow = styled.div`
  padding: 0 0 0 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

export const NestedTitle = styled.li`
  list-style: disclosure-open;
  list-style-position: inside;
  color: #0284c7;
  font-size: 1.6rem;
`;

export const Label = styled.label`
  font-size: 1.4rem;
`;

export const Span = styled.span`
  font-size: 1.4rem;
`;

export const Select = styled.select`
  width: 100%;
  height: 2.8rem;
  border: 2px solid rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  outline: none;

  &:focus {
    border: 2px solid #3b82f6;
  }
`;

export const RadioButton = styled.label`
  display: flex;
  gap: 0.6rem;
  align-items: center;
  color: #4b5563;
  font-size: 1.4rem;
`;

export const Footer = styled.footer`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const ButtonGroup = styled.div`
  grid-column: 2 / 3;
  display: flex;
  justify-content: space-between;
  padding: 0 0.6rem;
`;

export const CancelButton = styled.button`
  width: 5.6rem;
  cursor: pointer;
  border-radius: 9999999px;
  font-size: 1.4rem;
  font-weight: 600;
  height: 3.2rem;
  padding: 0.6rem 1.2rem;
  border: 1px solid rgba(0, 0, 0, 0.15);
  background-color: inherit;
  color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.3s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

export const SubmitButton = styled.button`
  width: 5.6rem;
  cursor: pointer;
  border-radius: 50px;
  font-size: 1.4rem;
  font-weight: 600;
  height: 3.2rem;
  padding: 0.6rem 1.2rem;
  border: none;
  background-color: #1d4ed8;
  color: #fff;
  box-shadow: 0 0 10px 1px rgba(96, 165, 250, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;

  &:hover {
    background-color: #2563eb;
  }
`;

export const RemoveButton = styled.button`
  width: fit-content;
  height: fit-content;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: #b91c1c;
  color: #f8fafc;
  padding: 0.1rem;
  transition: all 0.3s;

  & svg {
    font-size: 1.6rem;
  }

  &:hover {
    background-color: #dc2626;
  }
`;

export const AddButton = styled.button`
  width: fit-content;
  height: fit-content;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #059669;

  background-color: #f8fafc;
  color: #059669;
  padding: 0.2rem 0.4rem;
  font-weight: 600;
  font-size: 1.2rem;
  gap: 0.2rem;
  transition: all 0.3s;

  & svg {
    font-size: 1.4rem;
  }

  &:hover {
    box-shadow: 0px 0px 10px 1px rgba(5, 150, 105, 0.15);
  }
`;
