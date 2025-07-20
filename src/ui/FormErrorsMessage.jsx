import styled from "styled-components";

const StyledErrorsMessage = styled.p`
  ${({ $gridColumn }) => $gridColumn && `grid-column: ${$gridColumn};`}
  ${({ $gridRow }) => $gridRow && `grid-row: ${$gridRow};`}
  color: #f87171;
  padding: 0 0.2rem;
  font-size: 1.3rem;
  font-weight: 500;
`;

function FormErrorsMessage({ fieldName, gridColumn = null, gridRow = null }) {
  return (
    <StyledErrorsMessage $gridColumn={gridColumn} $gridRow={gridRow}>
      {fieldName?.message}
    </StyledErrorsMessage>
  );
}

export default FormErrorsMessage;
