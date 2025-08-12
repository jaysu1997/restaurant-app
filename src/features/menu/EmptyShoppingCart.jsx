// 空購物車ui
import styled from "styled-components";
import { GiShoppingCart } from "react-icons/gi";

const StyledEmptyShoppingCart = styled.div`
  max-height: 0;
  max-height: 58.7rem;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;

  svg {
    color: #a1a1aa;
  }

  p {
    font-size: 1.6rem;
  }
`;

function EmptyShoppingCart() {
  return (
    <StyledEmptyShoppingCart>
      <GiShoppingCart size={80} />
      <p>開始選擇美味的餐點吧！</p>
    </StyledEmptyShoppingCart>
  );
}

export default EmptyShoppingCart;
