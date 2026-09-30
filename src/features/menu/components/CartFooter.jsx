import styled from "styled-components";
import Price from "../../../components/Price";
import SubmitButton from "../../../components/button/SubmitButton";

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 1.6rem 2rem;
  border-top: 1px solid #e5e7eb;
  box-shadow: 0 -4px 12px rgba(15, 23, 42, 0.025);
`;

const CartTotalRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
`;

const CartTotalLabel = styled.span`
  color: #475569;
  font-size: 1.4rem;
  font-weight: 600;
`;

const CartTotalAmount = styled(Price)`
  font-size: 2rem;
  font-weight: 700;
`;

const SubmitOrderButton = styled(SubmitButton)`
  height: 5.2rem;
  font-weight: 600;

  &:not(:disabled):active {
    transform: translateY(1px);
  }
`;

function CartFooter({ totalAmount, isCreatingOrder, onSubmit, isValid }) {
  return (
    <Footer>
      <CartTotalRow>
        <CartTotalLabel>訂單總計</CartTotalLabel>
        <CartTotalAmount value={totalAmount} />
      </CartTotalRow>

      <SubmitOrderButton
        fullWidth
        processing={isCreatingOrder}
        disabled={isCreatingOrder || !isValid}
        onClick={onSubmit}
      >
        提交訂單
      </SubmitOrderButton>
    </Footer>
  );
}

export default CartFooter;
