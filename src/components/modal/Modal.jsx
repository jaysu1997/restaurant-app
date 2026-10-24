import styled from "styled-components";
import useScrollLock from "../../hooks/ui/useScrollLock";
import CloseButton from "../CloseButton";
import StyledOverlay from "../StyledOverlay";
import { createPortal } from "react-dom";
import useFocusTrap from "../../hooks/ui/useFocusTrap";

const Overlay = styled(StyledOverlay)`
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${({ $isSuspended }) => ($isSuspended ? "hidden" : "visible")};
`;

const StyleModal = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: min(${({ $maxWidth }) => `${$maxWidth}rem`}, 95dvw);
  max-height: 90dvh;
  margin: 0 var(--space-1-5);
  background-color: var(--color-surface);
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
  padding: var(--space-3-5) var(--space-6);
  box-shadow: inset 0 -1px var(--color-border);
  gap: var(--space-3);
  flex-shrink: 0;
`;

const Title = styled.h2`
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: ${({ $color }) => $color};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// Modal的容器
const ModalContainer = styled.form`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

// Modal內容放置處(可壓縮、可滾動區塊)
export const ModalContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  padding: var(--space-7) var(--space-6) var(--space-8);
  overflow-y: auto;
`;

// Modal底部(固定顯示)
export const ModalFooter = styled.footer`
  height: 7.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  gap: var(--space-5);
  padding: 0 var(--space-6);
  background-color: var(--color-surface);
  border-top: 1px solid var(--color-border);
`;

function Modal({
  isSuspended = false,
  children,
  onClose,
  onSubmit,
  title = "表單",
  titleColor = "var(--color-text-secondary)",
  maxWidth = 40,
}) {
  const containerRef = useFocusTrap(!isSuspended);

  useScrollLock(true);

  return createPortal(
    <Overlay
      $isSuspended={isSuspended}
      inert={isSuspended ? true : undefined}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <StyleModal $maxWidth={maxWidth} ref={containerRef}>
        <Header>
          <Title $color={titleColor}>{title}</Title>
          <CloseButton onClose={onClose} />
        </Header>

        <ModalContainer
          as={onSubmit ? "form" : "div"}
          onSubmit={(e) => {
            if (onSubmit) {
              e.stopPropagation();
              onSubmit(e);
            }
          }}
        >
          {children}
        </ModalContainer>
      </StyleModal>
    </Overlay>,
    document.body,
  );
}

export default Modal;
