import styled, { css } from "styled-components";
import Button from "./Button";
import { hoverStyles } from "../../style/helpers";

const TextButton = styled(Button).attrs({ $variant: "plain" })`
  color: #2563eb;
  padding: 0.6rem 0.8rem;
  border-radius: 4px;
  height: 3.6rem;
  width: fit-content;

  ${hoverStyles(css`
    background-color: #eff6ff;
  `)}
`;

export default TextButton;
