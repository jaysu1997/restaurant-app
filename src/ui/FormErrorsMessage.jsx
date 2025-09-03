import styled from "styled-components";

const StyledErrorsMessage = styled.p`
  ${({ $gridColumn }) => $gridColumn && `grid-column: ${$gridColumn};`}
  ${({ $gridRow }) => $gridRow && `grid-row: ${$gridRow};`}
  color: #f87171;
  padding: 0 0.2rem;
  font-size: 1.3rem;
  font-weight: 500;
  min-height: ${({ $minHeight }) => `${$minHeight}rem`};
`;

function FormErrorsMessage({
  errors,
  minHeight = 0,
  gridColumn = null,
  gridRow = null,
}) {
  return (
    <StyledErrorsMessage
      $minHeight={minHeight}
      $gridColumn={gridColumn}
      $gridRow={gridRow}
    >
      {errors?.message}
    </StyledErrorsMessage>
  );
}

export default FormErrorsMessage;
