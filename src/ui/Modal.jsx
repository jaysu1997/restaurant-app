import styled from "styled-components";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { IoIosClose } from "react-icons/io";

import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 100;
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
  margin: 0 0.6rem;
  transition: all 0.5s;
  /* background-color: #fafaf9; */
  background-color: #ffffff;
  box-shadow: 0 2rem 2rem 0.2rem rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  max-height: 95dvh;
`;

const Header = styled.header`
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  padding: 1.2rem 2.4rem;
  justify-content: space-between;
  align-items: center;
  font-size: 2.4rem;
  font-weight: 700;
  color: #374151;
  z-index: 1;
  color: ${(props) => props.$textColor};
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  background-color: #fafaf9;
`;

const Button = styled.button`
  background: none;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  width: 2.8rem;
  height: 2.8rem;
  color: #334155;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  & svg {
    width: 2.8rem;
    height: 2.8rem;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    border: 1px solid #334155;
    border-radius: 50%;
    transition: all 0.3s;
  }

  &:hover::before {
    transform: scale(1.1);
    box-shadow: 0 0 10px 6px rgba(0, 0, 0, 0.1);
  }
`;

function Modal({
  children,
  onCloseModal,
  modalHeader = "表單",
  headerColor = "inherit",
}) {
  // const ref = useRef();

  // useEffect(
  //   function () {
  //     function handleClick(e) {
  //       if (ref.current && !ref.current.contains(e.target)) {
  //         onCloseModal();
  //         e.stopPropagation();
  //       }
  //     }

  //     document.addEventListener("click", handleClick, true);

  //     return () => document.removeEventListener("click", handleClick, true);
  //   },
  //   [onCloseModal]
  // );

  return createPortal(
    <Overlay>
      <StyleModal>
        <Header $textColor={headerColor}>
          {modalHeader}
          <Button onClick={onCloseModal}>
            <IoIosClose />
          </Button>
        </Header>
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
