import styled from "styled-components";

const StyleShoppingList = styled.aside`
  grid-row: 1 / -1;
  grid-column: 2 / 3;
  background-color: cadetblue;
  height: 100%;
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
