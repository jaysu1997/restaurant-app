// 空購物車ui
import styled from "styled-components";
import EmptyCart from "../../assets/empty-cart.svg?react";

const StyledEmptyShoppingCart = styled.div`
  max-height: 58.7rem;
  display: flex;
  flex: 1 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 2rem 0;

  svg {
    height: 12.6rem;
    width: auto;
  }
`;

function EmptyShoppingCart() {
  return (
    <StyledEmptyShoppingCart>
      <EmptyCart />
      <p>開始選擇美味的餐點吧！</p>
    </StyledEmptyShoppingCart>
  );
}

export default EmptyShoppingCart;
