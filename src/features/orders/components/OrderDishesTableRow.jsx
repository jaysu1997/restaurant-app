import styled, { css } from "styled-components";
import Price from "../../../components/Price";
import { summarizeMealChoices } from "../../../utils/orderHelpers";
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
  gap: 1.6rem;
  padding: 1.6rem 2rem;
  background-color: #fff;
  border-top: 1px solid #e5e7eb;
  font-size: 1.6rem;
`;

const DishInfo = styled.div`
  justify-self: start;
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

const ImageWrapper = styled.div`
  width: 5.6rem;
  height: 5.6rem;
`;

const DishMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-weight: 400;
`;

const DishName = styled.span`
  font-weight: 600;
`;

const DishOptions = styled.span`
  font-size: 1.4rem;
  word-break: break-all;
  color: #374151;
`;

const DishNote = styled.span`
  font-size: 1.2rem;
  word-break: break-all;
  color: #6b7280;
`;

const DishLineTotal = styled(Price)`
  font-weight: 500;
`;

const DishServings = styled.span`
  font-weight: 500;
`;

const DishAction = styled.div`
  display: flex;
  gap: 1.2rem;
  font-size: 1.4rem;
`;

const EditButton = styled(Button)`
  padding: 0;
  height: 2.4rem;

  ${hoverStyles(css`
    color: #3b82f6;
  `)}
`;

const DeleteButton = styled(EditButton)`
  color: #b91c1c;

  ${hoverStyles(css`
    color: #dc2626;
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
