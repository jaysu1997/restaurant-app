import styled from "styled-components";
import Button from "./Button";

const HeaderActionButton = styled(Button)`
  svg {
    width: 1.8rem;
    height: 1.8rem;
  }

  @media (max-width: 30em) {
    width: 4rem;
    min-width: 4rem;
    height: 4rem;
    padding: 0;
    border-radius: 50%;

    span {
      display: none;
    }
  }
`;

export default HeaderActionButton;
