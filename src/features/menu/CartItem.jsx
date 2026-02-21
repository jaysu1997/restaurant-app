// ok
import styled from "styled-components";
import ServingsControl from "../../ui/ServingsControl";
import { useMemo } from "react";
import useOrder from "../../context/order/useOrder";
import {
  checkInventoryAvailability,
  summarizeMealChoices,
} from "../../utils/orderHelpers";
import ItemActions from "../../ui/ItemActions";

const StyledCartItem = styled.li`
  list-style: none;
  border-bottom: 1px solid #d3d3d3;
  display: grid;
  grid-template-columns: 1fr minmax(5.4rem, auto);
  align-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem 0;
  font-size: 1.4rem;
  min-height: 12rem;
  width: 100%;
`;

const OrderName = styled.h4`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 600;
`;

const SelectedOptions = styled.p`
  font-size: 1.2rem;
  grid-column: 1 / -1;
`;

const DishNote = styled(SelectedOptions)`
  color: #707070;
`;

const OrderPrice = styled.span`
  color: #dc2626;
  font-weight: 600;
  justify-self: end;
`;

function CartItem({ dish }) {
  const {
    dispatch,
    state: { inventoryMap },
  } = useOrder();

  const customizeChoices = summarizeMealChoices(dish);
  const dishTotalPrice = dish.unitPrice * dish.servings;

  // 計算剩餘食材是否能夠支持再增加更多份數
  const canIncrease = useMemo(() => {
    const inventoryCheck = checkInventoryAvailability({
      unitUsage: dish.unitUsage,
      servings: 1, // 嘗試只加 1 份
      inventoryMap,
    });

    return inventoryCheck.isAvailable;
  }, [dish.unitUsage, inventoryMap]);

  return (
    <StyledCartItem>
      <OrderName>{dish.name}</OrderName>
      <ItemActions dish={dish} />

      {customizeChoices.length !== 0 && (
        <SelectedOptions>{customizeChoices}</SelectedOptions>
      )}

      {dish.note && <DishNote>&quot;{dish.note}&quot;</DishNote>}

      <ServingsControl
        canIncrease={canIncrease}
        servings={dish.servings}
        onChange={(next) => {
          dispatch({
            type: "dishes/updateDishServings",
            payload: {
              servings: next,
              uniqueId: dish.uniqueId,
            },
          });
        }}
      />
      <OrderPrice>$ {dishTotalPrice}</OrderPrice>
    </StyledCartItem>
  );
}

export default CartItem;
