import styled from "styled-components";
import CloseButton from "../../../components/CloseButton";

const Header = styled.header`
  flex-shrink: 0;
  height: 6.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-5);
  border-bottom: 1px solid var(--color-border);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.025);
`;

const CartTitle = styled.h2`
  color: var(--color-text-strong);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
`;

const CartCloseButton = styled(CloseButton)`
  display: none;

  @media (max-width: 50em) {
    display: inline-flex;
  }
`;

function CartHeader({ onClose }) {
  return (
    <Header>
      <CartTitle>購物車</CartTitle>
      <CartCloseButton onClose={onClose} ariaLabel="關閉購物車" />
    </Header>
  );
}

export default CartHeader;
