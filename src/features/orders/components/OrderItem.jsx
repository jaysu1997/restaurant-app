import styled from "styled-components";
import DishServings from "./DishServings";
import useOrderDraft from "../../../context/orders/useOrderDraft";
import { summarizeMealChoices } from "../../../utils/orderData.js";
import IconButton from "../../../components/button/IconButton";
import { Trash2 } from "lucide-react";
import Price from "../../../components/Price";
import DishImage from "../../../components/DishImage";

const Container = styled.li`
  position: relative;
  display: grid;
  grid-template-columns: 4rem minmax(0, 1fr);
  gap: var(--space-3);
  padding: var(--space-4) 0;
  min-height: 12rem;

  & + & {
    border-top: 1px solid var(--color-border);
  }
`;

const EditButton = styled.button`
  position: absolute;
  inset: 0;
  z-index: 2;
  background-color: transparent;
`;

const DeleteButton = styled(IconButton)`
  position: absolute;
  right: 0;
  top: 1.6rem;
  z-index: 3;
`;

const OrderItemImage = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: var(--radius-lg);
`;

const OrderItemBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  font-size: var(--font-size-sm);
`;

const OrderItemName = styled.span`
  padding-right: var(--space-6);
  font-weight: var(--font-weight-bold);
  line-height: 2.4rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const OrderItemOptions = styled.span`
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-regular);
  color: var(--color-text-secondary);
  overflow-wrap: anywhere;
`;

const OrderItemNote = styled(OrderItemOptions)`
  color: var(--color-text-muted);
`;

const LineTotal = styled(Price)`
  height: 3.2rem;
  line-height: 3.2rem;
  margin-top: auto;
  padding-right: 9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

function OrderItem({ item, canModifyItems, isEdit = true, onEditDish }) {
  const { dispatch } = useOrderDraft();
  const { image, name, note, unitPrice, servings, uniqueId } = item;
  const customizeChoices = summarizeMealChoices(item);
  const lineTotal = unitPrice * servings;

  return (
    <Container>
      {isEdit && canModifyItems && (
        <EditButton
          type="button"
          disabled={!canModifyItems}
          onClick={() => onEditDish(item)}
          aria-label={`編輯${name}`}
        />
      )}

      <OrderItemImage>
        <DishImage image={image} alt={name} />
      </OrderItemImage>

      <OrderItemBody>
        <OrderItemName>{name}</OrderItemName>

        {isEdit && (
          <DeleteButton
            $size="sm"
            disabled={!canModifyItems}
            onClick={() =>
              dispatch({
                type: "items/remove",
                payload: uniqueId,
              })
            }
            aria-label={`刪除${name}`}
            title="刪除餐點"
          >
            <Trash2 />
          </DeleteButton>
        )}

        {customizeChoices && (
          <OrderItemOptions>{customizeChoices}</OrderItemOptions>
        )}

        {note && <OrderItemNote>&quot;{note}&quot;</OrderItemNote>}

        <LineTotal value={lineTotal} />

        <DishServings
          item={item}
          isEdit={isEdit}
          canModifyItems={canModifyItems}
        />
      </OrderItemBody>
    </Container>
  );
}

export default OrderItem;
