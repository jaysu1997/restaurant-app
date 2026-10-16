import styled from "styled-components";

const StyledPrice = styled.span`
  color: var(--color-text-primary);
  font-weight: var(--font-weight-semibold);
`;

function Price({ value, className }) {
  const formattedValue = Number(value).toLocaleString("zh-TW");

  return <StyledPrice className={className}>${formattedValue}</StyledPrice>;
}

export default Price;
