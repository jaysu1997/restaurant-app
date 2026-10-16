import styled from "styled-components";
import DiningMethodSegmented from "../../../components/DiningMethodSegmented";
import DiningInfoField from "../../orders/components/DiningInfoField";
import PaymentStatusField from "../../orders/components/PaymentStatusField";
import Note from "../../../components/Note";
import Label from "../../../components/Label";

const Container = styled.div`
  padding: var(--space-5) 0;
  display: flex;
  flex-direction: column;
`;

const NoteGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-1-5);

  label {
    font-size: 1.3rem;
    font-weight: var(--font-weight-medium);
    color: var(--color-text-secondary);
  }
`;

function CartOrderInfo({ canPlaceOrder }) {
  return (
    <Container>
      <DiningMethodSegmented disabled={!canPlaceOrder} />
      <DiningInfoField disabled={!canPlaceOrder} />
      <PaymentStatusField />
      <NoteGroup>
        <Label htmlFor="cart-note">訂單備註</Label>
        <Note id="cart-note" label="訂單備註" />
      </NoteGroup>
    </Container>
  );
}

export default CartOrderInfo;
