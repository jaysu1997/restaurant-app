import styled from "styled-components";

// 圓點ui
const Dot = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: ${({ $size }) => ($size ? `${$size}rem` : "0.36rem")};
  height: ${({ $size }) => ($size ? `${$size}rem` : "0.36rem")};

  &::before {
    content: "";
    width: ${({ $size }) => ($size ? `${$size / 2}rem` : "0.18rem")};
    height: ${({ $size }) => ($size ? `${$size / 2}rem` : "0.18rem")};
    background-color: currentColor;
    border-radius: 50%;
  }
`;

export default Dot;
