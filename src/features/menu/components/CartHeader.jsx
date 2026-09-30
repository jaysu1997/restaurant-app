import styled from "styled-components";
import ModalCloseButton from "../../../components/ModalCloseButton";

const Header = styled.header`
  flex-shrink: 0;
  height: 6.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.025);
`;

const CartTitle = styled.h2`
  color: #111827;
  font-size: 2rem;
  font-weight: 700;
`;

const CartCloseButton = styled(ModalCloseButton)`
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
