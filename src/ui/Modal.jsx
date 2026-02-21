import styled from "styled-components";
import { createPortal } from "react-dom";
import useScrollLock from "../hooks/ui/useScrollLock";
import { X } from "lucide-react";
import CloseButton from "./CloseButton";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
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
  max-height: 90dvh;
  margin: 0 0.6rem;
  background-color: #fff;
  box-shadow: 0 20px 20px 2px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

const Header = styled.header`
  display: flex;
  padding: 1rem 2rem;
  justify-content: space-between;
  min-height: 5.6rem;
  align-items: center;
  width: 100%;
  overflow: hidden;
  box-shadow: inset 0px -1px #e5e7eb;
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
  maxWidth = 36,
  scrollBar = true,
}) {
  useScrollLock(true);

  return createPortal(
    <Overlay>
      <StyleModal $maxWidth={maxWidth}>
        <Header>
          <Title $textColor={headerColor}>{modalHeader}</Title>
          <CloseButton onClose={onCloseModal} />
        </Header>
        <Content $scrollbar={scrollBar}>{children}</Content>
      </StyleModal>
    </Overlay>,
    document.body,
  );
}

export default Modal;
