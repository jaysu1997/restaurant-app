import styled from "styled-components";

const StyledErrorsMessage = styled.span`
  color: #f87171;
  margin-top: -4px;
  display: contents;

  font-size: 1.3rem;
  font-weight: 500;
`;

function FormErrorsMessage({ fieldName }) {
  if (!fieldName) return null;

  return <StyledErrorsMessage>{fieldName.message}</StyledErrorsMessage>;
}

export default FormErrorsMessage;
