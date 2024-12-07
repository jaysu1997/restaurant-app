import styled from "styled-components";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { IoMdCloseCircle } from "react-icons/io";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

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

  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyleModal = styled.div`
  position: fixed;
  display: grid;
  grid-template-columns: auto;
  max-width: 56rem;
  margin: 0 0.6rem 0 0.6rem;

  transition: all 0.5s;
  background-color: #fafaf9;
  box-shadow: 0 2rem 2rem 0.2rem rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
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

  position: sticky;
  top: 0;
  color: #334155;

  & svg {
    width: 3.2rem;
    height: 3.2rem;
  }

  &:hover,
  &:active {
    color: #64748b;
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
        <OverlayScrollbarsComponent
          options={{
            scrollbars: {
              autoHide: "scroll", // 滾動條自動隱藏
              clickScrolling: true, // 點擊滾動條時可滾動
              dragScrolling: true, // 支援拖動滾動
              autoHideDelay: 1000,
            },
          }}
          style={{ maxHeight: "80dvh" }}
        >
          {children}
        </OverlayScrollbarsComponent>
      </StyleModal>
    </Overlay>,
    document.body
  );
}

export default Modal;
