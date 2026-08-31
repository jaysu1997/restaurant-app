// ok
import styled, { css } from "styled-components";
import { hoverStyles } from "../../../style/helpers";
import { ArrowLeft, ArrowRight } from "lucide-react";

const ScrollFade = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${({ $direction }) => ($direction === "left" ? 0 : "auto")};
  right: ${({ $direction }) => ($direction === "right" ? 0 : "auto")};
  z-index: 1;
  width: 6rem;
  pointer-events: none;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  background: linear-gradient(
    ${({ $direction }) => ($direction === "left" ? "90deg" : "270deg")},
    rgba(249, 250, 251, 1) 0%,
    rgba(249, 250, 251, 0.9) 28%,
    rgba(249, 250, 251, 0) 100%
  );

  @media (pointer: coarse) {
    display: none;
  }
`;

const StyledScrollNavButton = styled.button`
  position: absolute;
  top: 50%;
  left: ${({ $direction }) => ($direction === "left" ? 0 : "auto")};
  right: ${({ $direction }) => ($direction === "right" ? 0 : "auto")};
  transform: translateY(-50%);
  z-index: 3;
  width: 3.6rem;
  height: 3.6rem;

  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 50%;
  color: #fff;
  background-color: rgba(38, 38, 38, 0.68);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(8px);

  ${({ $visible }) =>
    !$visible &&
    css`
      opacity: 0;
      pointer-events: none;
      visibility: hidden;
    `}

  svg {
    width: 1.6rem;
    height: 1.6rem;
    stroke-width: 3;
  }

  ${hoverStyles(css`
    background-color: rgba(38, 38, 38, 0.88);
    box-shadow:
      0 4px 12px rgba(0, 0, 0, 0.2),
      0 1px 3px rgba(0, 0, 0, 0.1);
  `)}

  &:active {
    transform: translateY(-50%) scale(0.94);
  }

  transition:
    background-color 0.1s ease,
    box-shadow 0.1s ease,
    transform 0.1s ease;

  @media (pointer: coarse) {
    display: none;
  }
`;

function ScrollNavButton({ ref, direction, visible, handleScroll }) {
  const ariaLabel = direction === "left" ? "上一個分類" : "下一個分類";

  return (
    <>
      <ScrollFade
        $direction={direction}
        $visible={visible}
        aria-hidden="true"
      />

      <StyledScrollNavButton
        type="button"
        ref={ref}
        $visible={visible}
        $direction={direction}
        onClick={() => handleScroll(direction)}
        aria-label={ariaLabel}
      >
        {direction === "left" ? <ArrowLeft /> : <ArrowRight />}
      </StyledScrollNavButton>
    </>
  );
}

export default ScrollNavButton;
