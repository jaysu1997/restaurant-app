import styled from "styled-components";

const StyledRequiredMark = styled.span`
  color: var(--color-danger);
  font-size: inherit;
  font-weight: inherit;
`;

function RequiredMark() {
  return <StyledRequiredMark aria-hidden="true">*</StyledRequiredMark>;
}

export default RequiredMark;
