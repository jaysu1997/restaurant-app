import styled, { css } from "styled-components";
import Price from "../../../components/Price";
import { summarizeMealChoices } from "../../../utils/orderData.js";
import DishImage from "../../../components/DishImage";
import Button from "../../../components/button/Button";
import { hoverStyles } from "../../../style/helpers";
import useOrderDraft from "../../../context/orders/useOrderDraft";

const TableRow = styled.div`
  display: grid;
  grid-template-columns:
    minmax(0, 1fr) repeat(2, 8rem)
    ${({ $isEdit }) => ($isEdit ? "8rem" : "")};
  justify-items: center;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-4) var(--space-5);
  background-color: var(--color-surface);
  border-top: 1px solid var(--color-border);
  font-size: var(--font-size-base);
`;

const DishInfo = styled.div`
  justify-self: start;
  display: flex;
  align-items: center;
  gap: var(--space-4);
`;

const ImageWrapper = styled.div`
  width: 5.6rem;
  height: 5.6rem;
`;

const DishMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  font-weight: var(--font-weight-regular);
`;

const DishName = styled.span`
  font-weight: var(--font-weight-semibold);
`;

const DishOptions = styled.span`
  font-size: var(--font-size-sm);
  word-break: break-all;
  color: var(--color-text-secondary);
`;

const DishNote = styled.span`
  font-size: var(--font-size-xs);
  word-break: break-all;
  color: var(--color-text-muted);
`;

const DishLineTotal = styled(Price)`
  font-weight: var(--font-weight-medium);
`;

const DishServings = styled.span`
  font-weight: var(--font-weight-medium);
`;

const DishAction = styled.div`
  display: flex;
  gap: var(--space-3);
  font-size: var(--font-size-sm);
`;

const EditButton = styled(Button)`
  padding: 0;
  height: 2.4rem;

  ${hoverStyles(css`
    color: var(--color-info);
  `)}
`;

const DeleteButton = styled(EditButton)`
  color: var(--color-danger-text);

  ${hoverStyles(css`
    color: var(--color-danger);
  `)}
`;

function OrderDishesTableRow({ item, isEdit, onEditDish, canModifyItems }) {
  const { dispatch } = useOrderDraft();
  const customizeChoices = summarizeMealChoices(item);
  const { image, name, note, unitPrice, servings, uniqueId } = item;

  return (
    <TableRow $isEdit={isEdit}>
      <DishInfo>
        <ImageWrapper>
          <DishImage image={image} alt={name} />
        </ImageWrapper>

        <DishMeta>
          <DishName>{name}</DishName>
          {customizeChoices && <DishOptions>{customizeChoices}</DishOptions>}
          {note && <DishNote>&quot; {note} &quot;</DishNote>}
        </DishMeta>
      </DishInfo>

      <DishLineTotal value={unitPrice * servings} />

      <DishServings>{servings} 份</DishServings>

      {isEdit && (
        <DishAction>
          <EditButton
            $variant="plain"
            disabled={!canModifyItems}
            onClick={() => onEditDish(item)}
          >
            編輯
          </EditButton>
          <DeleteButton
            $variant="plain"
            disabled={!canModifyItems}
            onClick={() => {
              dispatch({
                type: "items/remove",
                payload: uniqueId,
              });
            }}
          >
            刪除
          </DeleteButton>
        </DishAction>
      )}
    </TableRow>
  );
}

export default OrderDishesTableRow;
