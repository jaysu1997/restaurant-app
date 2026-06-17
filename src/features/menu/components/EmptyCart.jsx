// ok
// 空購物車ui
import styled from "styled-components";
import emptyCartSvg from "../../../assets/empty-cart.svg";

const StyledEmptyCart = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 2rem 0;

  img {
    height: 12.6rem;
    width: auto;
  }
`;

function EmptyCart() {
  return (
    <StyledEmptyCart>
      <img src={emptyCartSvg} alt="購物車是空的" />
      <p>開始選擇美味的餐點吧！</p>
    </StyledEmptyCart>
  );
}

export default EmptyCart;
