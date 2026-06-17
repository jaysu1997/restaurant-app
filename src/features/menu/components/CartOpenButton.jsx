import styled from "styled-components";

const StyledCartOpenButton = styled.button`
  display: none;

  @media (max-width: 50em) {
    position: fixed;
    bottom: 1.8rem;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100dvw - 5.6rem);
    height: 4rem;
    padding: 0.8rem 2rem;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    background-color: #2563eb;
    color: #fff;
    font-size: 1.4rem;
    font-weight: 500;
    box-shadow:
      0 4px 10px rgba(0, 0, 0, 0.2),
      0 0 6px rgba(37, 99, 235, 0.2);
  }
`;

const Dot = styled.span`
  width: 0.4rem;
  height: 0.4rem;
  background-color: #fff;
  border-radius: 50%;
`;

function CartOpenButton({ totalServings, totalPrice, onOpen }) {
  return (
    <StyledCartOpenButton onClick={onOpen}>
      <span>{`共 ${totalServings} 份餐點`}</span>
      <Dot />
      <span>{`$ ${totalPrice}`}</span>
    </StyledCartOpenButton>
  );
}

export default CartOpenButton;
