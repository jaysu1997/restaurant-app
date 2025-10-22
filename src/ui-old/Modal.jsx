import styled from "styled-components";
import { createPortal } from "react-dom";
import { IoIosClose } from "react-icons/io";
import { useEffect } from "react";

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.2);
  top: 0;
  left: 0;
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyleModal = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  max-width: ${({ $maxWidth }) => `min(${$maxWidth}rem, 95dvw)`};
  /* 原本為90dvh，看看100dvh的效果 */
  max-height: 90dvh;
  /* max-height: 100dvh; */
  margin: 0 0.6rem;
  background-color: #fff;
  box-shadow: 0 2rem 2rem 0.2rem rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

const Header = styled.header`
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 2rem;
  justify-content: space-between;
  height: 5.2rem;
  flex-shrink: 0;
  align-items: center;
  z-index: 1;
  width: 100%;
  overflow: hidden;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  background-color: #fafaf9;
  gap: 1.2rem;
`;

const Title = styled.h2`
  font-size: 2.4rem;
  font-weight: 700;
  color: ${(props) => props.$textColor || "#374151"};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Button = styled.button`
  width: 2.8rem;
  height: 2.8rem;
  color: #334155;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

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

const Content = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: ${(props) => (props.$scrollbar ? "auto" : "hidden")};
  overflow-x: hidden;
`;

function Modal({
  children,
  onCloseModal,
  modalHeader = "表單",
  headerColor = "inherit",
  maxWidth = 56,
  scrollBar = true,
}) {
  // 用來處理使用原生滾動軸時，打開Modal後出現body仍然可以滾動的問題
  useEffect(() => {
    // 鎖垂直滾動
    document.documentElement.style.overflowY = "hidden";

    return () => {
      document.documentElement.style.overflowY = "scroll";
    };
  }, []);

  return createPortal(
    <Overlay>
      <StyleModal $maxWidth={maxWidth}>
        <Header>
          <Title $textColor={headerColor}>{modalHeader}</Title>
          <Button onClick={onCloseModal}>
            <IoIosClose size={28} />
          </Button>
        </Header>
        <Content $scrollbar={scrollBar}>{children}</Content>
      </StyleModal>
    </Overlay>,
    document.body
  );
}

export default Modal;
