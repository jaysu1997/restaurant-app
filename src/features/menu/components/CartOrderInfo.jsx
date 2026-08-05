import styled from "styled-components";
import DiningMethodSegmented from "../../../components/DiningMethodSegmented";
import DiningInfoField from "../../orders/components/DiningInfoField";
import PaymentStatusField from "../../orders/components/PaymentStatusField";
import Note from "../../../components/Note";

const StyledCartOrderInfo = styled.div`
  padding: 2rem 0;
  display: flex;
  flex-direction: column;

  label {
    font-size: 1.4rem;
    display: flex;
    gap: 0.2rem;
    font-weight: 600;
    width: fit-content;
  }
`;

const NoteGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

function CartOrderInfo({ canPlaceOrder }) {
  return (
    <StyledCartOrderInfo>
      <DiningMethodSegmented disabled={!canPlaceOrder} />
      <DiningInfoField disabled={!canPlaceOrder} />
      <PaymentStatusField disabled={!canPlaceOrder} />
      <NoteGroup>
        <label htmlFor="cart-note">訂單備註</label>
        <Note id="cart-note" label="訂單備註" />
      </NoteGroup>
    </StyledCartOrderInfo>
  );
}

export default CartOrderInfo;
