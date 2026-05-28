// 餐點的新增/刪除按鈕
import styled from "styled-components";
import { SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";
import useOrderDraft from "../context/orders/useOrderDraft";
import Modal from "./Modal";
import OrderForm from "../features/orders/components/OrderForm/OrderForm";
import IconButton from "../components/button/IconButton";

const StyledItemActions = styled.div`
  display: flex;
  justify-content: end;
  gap: 0.2rem;
`;

function OrderItemActions({ item }) {
  const { dispatch } = useOrderDraft();
  const [editingItem, setEditingItem] = useState(null);
  const onClose = () => setEditingItem(null);

  return (
    <>
      <StyledItemActions>
        <IconButton $variant="ghost" onClick={() => setEditingItem(item)}>
          <SquarePen />
        </IconButton>

        <IconButton
          $variant="ghost"
          onClick={() =>
            dispatch({
              type: "items/remove",
              payload: item.uniqueId,
            })
          }
        >
          <Trash2 />
        </IconButton>
      </StyledItemActions>

      {editingItem && (
        <Modal
          onClose={onClose}
          modalHeader={editingItem.name}
          scrollBar={false}
        >
          <OrderForm orderDish={editingItem} onClose={onClose} isEdit={true} />
        </Modal>
      )}
    </>
  );
}

export default OrderItemActions;
