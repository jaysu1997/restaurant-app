// 空購物車ui
import styled from "styled-components";
import emptyCartSvg from "../../../assets/empty-cart.svg";

const StyledEmptyShoppingCart = styled.div`
  max-height: 58.7rem;
  display: flex;
  flex: 1 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 2rem 0;

  img {
    height: 12.6rem;
    width: auto;
    display: block;
  }
`;

function EmptyShoppingCart() {
  return (
    <StyledEmptyShoppingCart>
      <img src={emptyCartSvg} alt="購物車是空的" />
      <p>開始選擇美味的餐點吧！</p>
    </StyledEmptyShoppingCart>
  );
}

export default EmptyShoppingCart;
