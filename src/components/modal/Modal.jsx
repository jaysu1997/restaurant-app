import styled from "styled-components";
import useScrollLock from "../../hooks/ui/useScrollLock";
import ModalCloseButton from "../ModalCloseButton";
import StyledOverlay from "../StyledOverlay";
import { createPortal } from "react-dom";

const Overlay = styled(StyledOverlay)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyleModal = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: min(${({ $maxWidth }) => `${$maxWidth}rem`}, 95dvw);
  max-height: 90dvh;
  margin: 0 0.6rem;
  background-color: #fff;
  box-shadow: 0 20px 20px 2px rgba(0, 0, 0, 0.25);
  border-radius: 18px;
  overflow: hidden;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 6rem;
  padding: 1.4rem 2.4rem;
  box-shadow: inset 0 -1px #e5e7eb;
  gap: 1.2rem;
  flex-shrink: 0;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ $color }) => $color};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// Modal的容器
export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

// Modal內容放置處(可壓縮、可滾動區塊)
export const ModalContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding: 2.4rem;
  overflow-y: auto;
`;

// Modal底部(固定顯示)
export const ModalFooter = styled.footer`
  height: 7.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  gap: 2rem;
  padding: 0 2.4rem;
  background-color: #fff;
  border-top: 1px solid #e5e7eb;
`;

function Modal({
  children,
  onClose,
  title = "表單",
  titleColor = "#374151",
  maxWidth = 36,
}) {
  useScrollLock(true);

  return createPortal(
    <Overlay>
      <StyleModal $maxWidth={maxWidth}>
        <Header>
          <Title $color={titleColor}>{title}</Title>
          <ModalCloseButton onClose={onClose} />
        </Header>

        {children}
      </StyleModal>
    </Overlay>,
    document.body,
  );
}

export default Modal;
