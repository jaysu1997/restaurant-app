import styled from "styled-components";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { IoMdCloseCircle } from "react-icons/io";

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.2);
  top: 0;
  left: 0;
  transition: all 0.5s;
  backdrop-filter: blur(2px);
`;

const StyleModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  grid-template-columns: auto;
  max-width: 56rem;

  overflow: auto;
  transition: all 0.5s;
  background-color: #fafaf9;
  border-radius: 5px;
  box-shadow: 0 2rem 2rem 0.2rem rgba(0, 0, 0, 0.25);
  max-height: 85dvh;
`;

const Button = styled.button`
  background: none;
  border: none;
  border-radius: 50%;
  transition: all 0.5s;
  cursor: pointer;
  width: 3.2rem;
  height: 3.2rem;
  justify-self: end;

  & svg {
    width: 3.2rem;
    height: 3.2rem;
    color: #334155;
  }
`;

function Modal({ children, onCloseModal }) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          onCloseModal();
          e.stopPropagation();
        }
      }

      document.addEventListener("click", handleClick, true);

      // cleanup function
      return () => document.removeEventListener("click", handleClick, true);
    },
    [onCloseModal]
  );

  return createPortal(
    <Overlay>
      <StyleModal ref={ref}>
        <Button onClick={() => onCloseModal()}>
          <IoMdCloseCircle />
        </Button>
        {children}
      </StyleModal>
    </Overlay>,
    document.body
  );
}

export default Modal;
