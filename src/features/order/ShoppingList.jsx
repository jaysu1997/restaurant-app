import styled from "styled-components";
import { useOrder } from "../../context/OrderContext";
import StyledOverlayScrollbars from "../../ui/StyledOverlayScrollbars";

const StyleShoppingList = styled.aside`
  grid-column: 2 / 3;
  grid-row: 1 / -1;
  background-color: cadetblue;
  max-height: calc(100vh - 16.2rem);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
`;

function ShoppingList({ shoppingCart }) {
  const { state } = useOrder();
  console.log(state.orderList?.[0]);
  return (
    <StyleShoppingList>
      <StyledOverlayScrollbars style={{ maxHeight: "100%" }} autoHide="scroll">
        <label htmlFor="place">內用/外帶</label>
        <input type="checkbox" />
        <div style={{ height: "100px" }}>aaaaa</div>
        <div style={{ height: "100px" }}>aaaaa</div>
        <div style={{ height: "100px" }}>aaaaa</div>
        <div style={{ height: "100px" }}>aaaaa</div>
        <div style={{ height: "100px" }}>aaaaa</div>
        <div style={{ height: "100px" }}>aaaaa</div>
        <div style={{ height: "100px" }}>aaaaa</div>
        <button>提交按鈕</button>
      </StyledOverlayScrollbars>
    </StyleShoppingList>
  );
}

export default ShoppingList;
