import styled from "styled-components";

const StyleShoppingList = styled.aside`
  background-color: cadetblue;
  width: 100dvw;
`;

function ShoppingList({ shoppingCart }) {
  return (
    <StyleShoppingList>
      <label htmlFor="place">內用/外帶</label>
      <input type="checkbox" />
    </StyleShoppingList>
  );
}

export default ShoppingList;
