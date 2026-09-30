// ok
// 控制和設定餐點份數的元件
import styled, { css } from "styled-components";
import { Minus, Plus } from "lucide-react";
import { hoverStyles } from "../../../style/helpers";
import useOrderDraft from "../../../context/orders/useOrderDraft";

const ServingDisplay = styled.div`
  position: absolute;
  bottom: 1.6rem;
  right: 0;
  z-index: 3;
  flex-shrink: 0;
  height: 3.2rem;
  display: inline-flex;
  align-items: center;
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 3.2rem;
`;

const ServingStepper = styled(ServingDisplay)`
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  overflow: hidden;
  background-color: #fff;
`;

const AdjustButton = styled.button`
  width: 2.8rem;
  height: 3.2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  color: #1f2937;

  ${hoverStyles(css`
    background-color: #f9fafb;
  `)}

  svg {
    width: 1.6rem;
    height: 1.6rem;
  }
`;

const ServingValue = styled.span`
  width: 3.2rem;
  height: 3.2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #1f2937;
  border-left: 1px solid #e5e7eb;
  border-right: 1px solid #e5e7eb;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: default;
`;

function DishServings({ item, isEdit, canModifyItems }) {
  const {
    dispatch,
    state: { inventoryObj },
  } = useOrderDraft();

  const { unitUsage, servings, uniqueId } = item;

  if (!isEdit) {
    return <ServingDisplay>{servings} 份</ServingDisplay>;
  }

  // 計算剩餘食材是否能夠支持再增加更多份數
  const canIncrease = Object.entries(unitUsage).every(
    ([uuid, { quantity }]) =>
      quantity <= (inventoryObj[uuid]?.remainingQuantity ?? 0),
  );

  function handleChange(next) {
    dispatch({
      type: "items/updateServings",
      payload: {
        servings: next,
        uniqueId: uniqueId,
      },
    });
  }

  function handleDelete() {
    dispatch({
      type: "items/remove",
      payload: uniqueId,
    });
  }

  return (
    <ServingStepper>
      <AdjustButton
        type="button"
        disabled={!canModifyItems}
        aria-label={servings <= 1 ? "刪除餐點" : "減少餐點數量"}
        onClick={() =>
          servings <= 1 ? handleDelete() : handleChange(servings - 1)
        }
      >
        <Minus />
      </AdjustButton>

      <ServingValue>{servings}</ServingValue>

      <AdjustButton
        type="button"
        disabled={!canIncrease || !canModifyItems}
        title={!canIncrease ? "庫存不足，無法再增加份數" : undefined}
        onClick={() => handleChange(servings + 1)}
        aria-label="增加餐點數量"
      >
        <Plus />
      </AdjustButton>
    </ServingStepper>
  );
}

export default DishServings;
