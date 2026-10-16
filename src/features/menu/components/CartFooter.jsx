import styled from "styled-components";
import Price from "../../../components/Price";
import SubmitButton from "../../../components/button/SubmitButton";

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-5);
  border-top: 1px solid var(--color-border);
  box-shadow: 0 -4px 12px rgba(15, 23, 42, 0.025);
`;

const CartTotalRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
`;

const CartTotalLabel = styled.span`
  color: var(--color-text-slate);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
`;

const CartTotalAmount = styled(Price)`
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
`;

const SubmitOrderButton = styled(SubmitButton)`
  height: 5.2rem;
  font-weight: var(--font-weight-semibold);

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
