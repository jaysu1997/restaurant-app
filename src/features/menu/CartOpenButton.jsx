import styled from "styled-components";
import Dot from "../../ui/Dot";

const StyledCartOpenButton = styled.button`
  /* 基本隱藏：大螢幕不顯示 */
  display: none;

  /* 位置與尺寸 */
  position: fixed;
  bottom: 1.8rem;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100dvw - 3.2rem);
  padding: 0.8rem 2rem;
  border-radius: 999px;
  border: 1px solid transparent;

  /* 內容排版 */
  align-items: center;
  justify-content: center;
  gap: 0.6rem;

  /* 視覺樣式 */
  background-color: #2563eb;
  color: #fff;
  font-size: 1.4rem;
  font-weight: 500;

  /* 陰影與過渡 */
  box-shadow:
    0 4px 10px rgba(0, 0, 0, 0.2),
    0 0 6px rgba(37, 99, 235, 0.2);
  transition:
    transform 0.15s,
    box-shadow 0.15s;

  /* 點擊回饋 */
  &:active {
    transform: translateX(-50%) scale(0.97);
    box-shadow:
      0 2px 6px rgba(0, 0, 0, 0.2),
      0 0 4px rgba(37, 99, 235, 0.15);
  }

  /* 小螢幕（800px以下）時顯示 */
  @media (max-width: 50em) {
    display: flex;
  }
`;

function CartOpenButton({ totalServings, totalPrice, onOpen }) {
  return (
    <StyledCartOpenButton onClick={onOpen}>
      <span>{`共 ${totalServings} 份`}</span>
      <Dot $size={0.8} />
      <span>{`$ ${totalPrice}`}</span>
    </StyledCartOpenButton>
  );
}

export default CartOpenButton;
