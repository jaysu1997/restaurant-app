// ok
import styled, { css } from "styled-components";

const StyledButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  color: #fff;
  background-color: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  cursor: pointer;

  transition:
    background-color 0.2s,
    transform 0.2s;

  svg {
    width: 1.6rem;
    height: 1.6rem;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }

  @media (pointer: coarse) and (max-width: 30em) {
    display: none;
  }

  ${({ $direction }) =>
    $direction === "left"
      ? css`
          left: 1rem;
          &:hover {
            transform: translateY(-50%) translateX(-4px);
          }
        `
      : css`
          right: 1rem;
          &:hover {
            transform: translateY(-50%) translateX(4px);
          }
        `}
`;

function ScrollNavButton({ direction, children, handleClick }) {
  return (
    <StyledButton $direction={direction} onClick={handleClick}>
      {children}
    </StyledButton>
  );
}

export default ScrollNavButton;
