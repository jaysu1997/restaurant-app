// 餐點的新增/刪除按鈕
import styled from "styled-components";
import Button from "./Button";
import { SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";
import useOrderDraft from "../context/orders/useOrderDraft";
import OrderForm from "./OrderForm/OrderForm";
import Modal from "./Modal";

const StyledItemActions = styled.div`
  display: flex;
  justify-content: end;
  gap: 0.2rem;
`;

function OrderItemActions({ item }) {
  const { dispatch } = useOrderDraft();
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <>
      <StyledItemActions>
        <Button $variant="ghost" onClick={() => setSelectedItem(item)}>
          <SquarePen />
        </Button>

        <Button
          $variant="ghost"
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

      {selectedItem && (
        <Modal
          onClose={() => setSelectedItem(null)}
          modalHeader={selectedItem.name}
          scrollBar={false}
        >
          <OrderForm
            orderDish={selectedItem}
            onClose={() => setSelectedItem(null)}
            isEdit={true}
          />
        </Modal>
      )}
    </>
  );
}

export default OrderItemActions;
