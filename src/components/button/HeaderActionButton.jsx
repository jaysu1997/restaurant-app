import styled from "styled-components";
import Button from "./Button";

const HeaderActionButton = styled(Button)`
  svg {
    width: 1.8rem;
    height: 1.8rem;
  }

  @media (max-width: 30em) {
    height: 3.6rem;
    padding: var(--space-2) var(--space-2-5);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-semibold);
    border-radius: 16px;

    svg {
      width: 1.6rem;
      height: 1.6rem;
    }
  }
`;

export default HeaderActionButton;
