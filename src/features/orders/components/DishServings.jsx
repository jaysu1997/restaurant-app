// ok
// 控制和設定餐點份數的元件
import styled, { css } from "styled-components";
import { Minus, Plus } from "lucide-react";
import { hoverStyles, insetFocusVisible } from "../../../style/helpers";
import useOrderDraft from "../../../context/orders/useOrderDraft";

const ServingDisplay = styled.div`
  position: absolute;
  bottom: 1.6rem;
  right: 0;
  z-index: 3;
  flex-shrink: 0;
  height: 3.2rem;
  width: 9rem;
  display: inline-flex;
  align-items: center;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  line-height: 3.2rem;
`;

const ServingStepper = styled(ServingDisplay)`
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  background-color: var(--color-surface);
`;

const AdjustButtonLeft = styled.button`
  height: 100%;
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-surface);
  color: var(--color-text-primary);
  border-radius: var(--radius-md) 0px 0px var(--radius-md);

  ${hoverStyles(css`
    background-color: var(--color-background);
  `)}

  svg {
    width: 1.6rem;
    height: 1.6rem;
  }

  &:focus-visible {
    ${insetFocusVisible}
  }
`;

const AdjustButtonRight = styled(AdjustButtonLeft)`
  border-radius: 0px var(--radius-md) var(--radius-md) 0px;
`;

const ServingValue = styled.span`
  width: 3.2rem;
  height: 3.2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-primary);
  border-left: 1px solid var(--color-border);
  border-right: 1px solid var(--color-border);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
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
      <AdjustButtonLeft
        type="button"
        disabled={!canModifyItems}
        aria-label={servings <= 1 ? "刪除餐點" : "減少餐點數量"}
        onClick={() =>
          servings <= 1 ? handleDelete() : handleChange(servings - 1)
        }
      >
        <Minus />
      </AdjustButtonLeft>

      <ServingValue>{servings}</ServingValue>

      <AdjustButtonRight
        type="button"
        disabled={!canIncrease || !canModifyItems}
        title={!canIncrease ? "庫存不足，無法再增加份數" : undefined}
        onClick={() => handleChange(servings + 1)}
        aria-label="增加餐點數量"
      >
        <Plus />
      </AdjustButtonRight>
    </ServingStepper>
  );
}

export default DishServings;
