import styled from "styled-components";
import Button from "./Button";

const HeaderActionButton = styled(Button)`
  svg {
    width: 1.8rem;
    height: 1.8rem;
  }

  @media (max-width: 30em) {
    height: 3.6rem;
    padding: 0.8rem 1rem;
    font-size: 1.2rem;
    font-weight: 600;
    border-radius: 16px;

    svg {
      width: 1.6rem;
      height: 1.6rem;
    }
  }
`;

export default HeaderActionButton;
