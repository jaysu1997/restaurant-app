// ok
// 餐點的新增/刪除按鈕
import styled from "styled-components";
import Button from "./Button";
import { SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";
import useOrder from "../context/order/useOrder";
import OrderForm from "./OrderForm/OrderForm";

const StyledItemActions = styled.div`
  display: flex;
  justify-content: end;
  gap: 0.2rem;
`;

function ItemActions({ dish }) {
  const [editingDish, setEditingDish] = useState(null);
  const { dispatch } = useOrder();

  return (
    <>
      <StyledItemActions>
        <Button $variant="ghost" onClick={() => setEditingDish(dish)}>
          <SquarePen />
        </Button>
        <Button
          $variant="ghost"
          onClick={() =>
            dispatch({
              type: "dishes/removeDish",
              payload: dish.uniqueId,
            })
          }
        >
          <Trash2 />
        </Button>
      </StyledItemActions>

      {editingDish && (
        <OrderForm
          orderDish={editingDish}
          onCloseModal={() => setEditingDish(null)}
          isEdit={true}
        />
      )}
    </>
  );
}

export default ItemActions;
