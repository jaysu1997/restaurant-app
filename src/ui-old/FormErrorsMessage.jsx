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

// 個地方使用的prop value可能需要整理，有的只依靠grid設定高度，有的則是有使用min-height
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
