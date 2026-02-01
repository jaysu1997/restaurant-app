// 控制和設定餐點份數的元件
import styled from "styled-components";
import useOrder from "../context/order/useOrder";
import { useState } from "react";
import StyledHotToast from "./StyledHotToast";
import { checkInventoryAvailability } from "../utils/orderHelpers";
import { Minus, Plus } from "lucide-react";

const Serving = styled.div`
  flex-shrink: 0;

  display: grid;
  grid-template-columns: ${({ $size }) =>
    $size === "sm" ? "2rem 3.2rem 2rem" : "2.8rem 4rem 2.8rem"};
  grid-template-rows: ${({ $size }) => ($size === "sm" ? "2rem " : "2.8rem")};
  font-size: ${({ $size }) => ($size === "sm" ? "1.2rem" : "1.4rem")};

  border: 1px solid #d1d5db;
  border-radius: 4px;
  overflow: hidden;
`;

const CountInputField = styled.input`
  border-left: 1px solid #d1d5db;
  border-right: 1px solid #d1d5db;
  text-align: center;
  padding: 0.2rem 0.4rem;

  &:read-only {
    cursor: default;
    background-color: #f9fafb;
  }
`;

const CountButton = styled.button`
  height: 100%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    /* 由父元素字體尺寸控制 */
    width: 1em;
    height: 1em;
  }

  &:hover {
    background-color: #e0f2fe;
  }

  &:disabled {
    background-color: #f4f4f5;
    cursor: not-allowed;
  }
`;

function ServingsControl({
  size = "sm",
  servings,
  setServings,
  orderDish = {},
  liveUpdate = false,
}) {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const {
    state: { inventoryMap },
    dispatch,
  } = useOrder();

  // 處理份數調整的函式
  function handleServingsChange(servings, orderDish) {
    // 如果是在OrderForm上使用，不需要再次檢查庫存剩餘食材(沒有使用即時更新)
    if (!liveUpdate) {
      setServings(servings);
      return;
    }

    // 即時更新功能需要先檢查庫存並修改剩餘數量
    let shortages = [];

    // 分量調整增加需要檢查庫存是否足夠
    if (servings > orderDish.servings) {
      shortages = checkInventoryAvailability({
        ingredientsUsagePerServing: orderDish.ingredientsUsagePerServing,
        servings: servings - orderDish.servings,
        inventoryMap,
      });
    }

    // 庫存充足
    if (shortages.length === 0) {
      setServings(servings);
      dispatch({
        type: "dishes/updateDishServings",
        payload: {
          servings,
          uniqueId: orderDish.uniqueId,
        },
      });
      setButtonDisabled(false);
    } else {
      // 庫存不足
      setButtonDisabled(true);

      StyledHotToast({
        type: "error",
        title: "庫存食材不足",
        content: (
          <ul>
            {shortages.map((ingredient, index) => (
              <li key={index}>
                {ingredient.maxCapacity === 0
                  ? `${ingredient.name}已用完`
                  : `${ingredient.name}不足（最多供應${ingredient.maxCapacity}份）`}
              </li>
            ))}
          </ul>
        ),
      });
    }
  }

  return (
    <Serving $size={size}>
      <CountButton
        type="button"
        disabled={servings <= 1}
        onClick={() => handleServingsChange(servings - 1, orderDish)}
      >
        <Minus />
      </CountButton>

      <CountInputField
        type="text"
        value={servings}
        readOnly={liveUpdate}
        onChange={(e) => setServings(e.target.value)}
        required
        inputMode="numeric"
      />

      <CountButton
        type="button"
        disabled={buttonDisabled}
        onClick={() => handleServingsChange(servings + 1, orderDish)}
      >
        <Plus />
      </CountButton>
    </Serving>
  );
}

export default ServingsControl;
