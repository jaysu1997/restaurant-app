import styled from "styled-components";

export const FormLayout = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 56rem;
  max-width: 100%;
  padding: 2rem;

  h3 {
    font-size: 2.4rem;
  }

  h4 {
    font-size: 1.8rem;
    color: #6366f1;

    &::before {
      content: "";
      width: 0.4rem;
      height: 2rem;
      background-color: #6366f1;
      margin-right: 0.2rem;
    }
  }

  h5 {
    color: #0d9488;
    font-size: 1.6rem;
  }
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2rem;
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  label {
    font-size: 1.4rem;
  }
`;

export const FormDescription = styled.p`
  grid-column: 1 / -1;
  font-size: 1.4rem;
  color: #6b7280;
`;

export const FormHeading = styled.h3`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  width: fit-content;
  font-weight: 600;
`;

export const FormList = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  /* padding-left: 1rem; */
`;

export const FromListItem = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 2rem;
  row-gap: 1rem;

  & > button {
    justify-self: end;
  }
`;
