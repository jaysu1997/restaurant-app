import styled from "styled-components";

const StyledPrice = styled.span`
  color: #1f2937;
  font-weight: 600;
`;

function Price({ value, className }) {
  const formattedValue = Number(value).toLocaleString("zh-TW");

  return <StyledPrice className={className}>${formattedValue}</StyledPrice>;
}

export default Price;
