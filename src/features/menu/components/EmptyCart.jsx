// ok
// 空購物車ui
import styled from "styled-components";
import emptyCartSvg from "../../../assets/empty-cart.svg";

const StyledEmptyCart = styled.div`
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-5);
  padding: var(--space-5) 0;
`;

const EmptyCartIcon = styled.div`
  height: 14rem;
  max-height: 75%;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    display: block;
    width: auto;
    height: 100%;
  }
`;

const EmptyCartTitle = styled.h3`
  color: #334155;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
`;

function EmptyCart() {
  return (
    <StyledEmptyCart>
      <EmptyCartIcon>
        <img src={emptyCartSvg} alt="購物車是空的" />
      </EmptyCartIcon>

      <EmptyCartTitle>購物車目前是空的</EmptyCartTitle>
    </StyledEmptyCart>
  );
}

export default EmptyCart;
