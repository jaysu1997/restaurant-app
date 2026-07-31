// ok
// 餐點的新增/刪除按鈕
import styled from "styled-components";
import { SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";
import useOrderDraft from "../../../context/orders/useOrderDraft";
import Modal from "../../../components/modal/Modal";
import OrderForm from "./OrderForm/OrderForm";
import Button from "../../../components/button/Button";

const StyledItemActions = styled.div`
  display: flex;
  justify-content: end;
  gap: 0.2rem;
`;

function OrderItemActions({ item, canModifyItems }) {
  const { dispatch } = useOrderDraft();
  const [editingItem, setEditingItem] = useState(null);
  const onClose = () => setEditingItem(null);

  return (
    <>
      <StyledItemActions>
        <Button
          $variant="ghost"
          disabled={!canModifyItems}
          onClick={() => setEditingItem(item)}
        >
          <SquarePen />
        </Button>

        <Button
          $variant="ghost"
          disabled={!canModifyItems}
          onClick={() =>
            dispatch({
              type: "items/remove",
              payload: item.uniqueId,
            })
          }
        >
          <Trash2 />
        </Button>
      </StyledItemActions>

      {editingItem && (
        <Modal onClose={onClose} title={editingItem.name} maxWidth={42}>
          <OrderForm orderDish={editingItem} onClose={onClose} isEdit={true} />
        </Modal>
      )}
    </>
  );
}

export default OrderItemActions;
