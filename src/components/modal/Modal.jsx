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
  border-radius: 6px;
  overflow: hidden;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 5.6rem;
  padding: 1rem 2rem;
  background-color: #fafaf9;
  box-shadow: inset 0 -1px #e5e7eb;
  gap: 1.2rem;
  flex-shrink: 0;
`;

const Title = styled.h2`
  font-size: 2.4rem;
  font-weight: 700;
  color: ${({ $color }) => $color};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
