import styled from "styled-components";

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
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  gap: 2rem;
  padding: 2rem 2.4rem;
  background-color: #fff;
  box-shadow: inset 0 1px #e5e7eb;
`;
