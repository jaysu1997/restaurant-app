import styled from "styled-components";
import ServingsControl from "../../../ui/ServingsControl";
import useOrderDraft from "../../../context/orders/useOrderDraft";
import { summarizeMealChoices } from "../../../utils/orderHelpers";
import OrderItemActions from "../../../ui/OrderItemActions";
import Price from "../../../components/Price";

const StyledCartItem = styled.li`
  border-bottom: 1px solid #d3d3d3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  font-weight: 500;
`;

const SelectedOptions = styled.p`
  font-size: 1.2rem;
`;

const DishNote = styled(SelectedOptions)`
  color: #707070;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function CartItem({ item }) {
  const {
    dispatch,
    state: { inventoryObj },
  } = useOrderDraft();

  const customizeChoices = summarizeMealChoices(item);
  const itemTotalPrice = item.unitPrice * item.servings;

  // 計算剩餘食材是否能夠支持再增加更多份數
  const canIncrease = Object.entries(item.unitUsage).every(
    ([uuid, { quantity }]) =>
      quantity <= (inventoryObj[uuid]?.remainingQuantity ?? 0),
  );

  return (
    <StyledCartItem>
      <Row>
        <OrderName>{item.name}</OrderName>
        <OrderItemActions item={item} />
      </Row>

      {customizeChoices && (
        <SelectedOptions>{customizeChoices}</SelectedOptions>
      )}

      {item.note && <DishNote>&quot;{item.note}&quot;</DishNote>}

      <Row>
        <Price>$ {itemTotalPrice}</Price>
        <ServingsControl
          canIncrease={canIncrease}
          servings={item.servings}
          onChange={(next) => {
            dispatch({
              type: "items/updateServings",
              payload: {
                servings: next,
                uniqueId: item.uniqueId,
              },
            });
          }}
        />
      </Row>
    </StyledCartItem>
  );
}

export default CartItem;
