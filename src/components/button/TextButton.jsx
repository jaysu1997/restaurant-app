import styled from "styled-components";
import Button from "./Button";

const TextButton = styled(Button).attrs({ $variant: "ghost" })`
  color: #2563eb;
  padding: 0.6rem 0.8rem;
  border-radius: 4px;
  height: 3.6rem;

  & svg {
    width: 1.8rem;
    height: 1.8rem;
  }

  &:not(:disabled):hover {
    background-color: #eff6ff;
  }
`;

export default TextButton;
