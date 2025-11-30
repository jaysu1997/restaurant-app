// 控制和設定餐點份數的元件
import styled from "styled-components";
import { useOrder } from "../context/OrderContext";
import { useRef, useState } from "react";
import StyledHotToast from "./StyledHotToast";
import { compareInventory } from "../utils/orderHelpers";
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
  dishData = {},
  liveUpdate = false,
}) {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const {
    state: { inventoryMap },
    dispatch,
  } = useOrder();

  const prevServingsRef = useRef(servings);

  // 處理份數調整的函式
  function handleServingsChange(servings, dishData) {
    // 如果是在OrderForm上使用，不需要再次檢查庫存剩餘食材(沒有使用即時更新)
    if (!liveUpdate) {
      prevServingsRef.current = servings;
      setServings(servings);
      return;
    }

    // 即時更新功能需要先檢查庫存並修改剩餘數量
    let result = [];

    if (servings - prevServingsRef.current > 0) {
      result = compareInventory({
        ingredientsUsage: dishData.ingredientsUsage,
        servings: servings - prevServingsRef.current,
        inventoryMap: new Map(inventoryMap),
      });
    }

    // 庫存充足
    if (result.length === 0) {
      prevServingsRef.current = servings;
      setServings(servings);
      dispatch({
        type: "dishes/updateDishServings",
        payload: {
          servings,
          uniqueId: dishData.uniqueId,
        },
      });
      setButtonDisabled(false);
    } else {
      // 庫存不足
      setServings(prevServingsRef.current);
      // 當前庫存無法再多製作1份餐點則禁用按鈕
      result.find((ingredients) => ingredients.maxCapacity === 0) &&
        setButtonDisabled(true);

      StyledHotToast({
        type: "error",
        title: "庫存食材不足",
        content: (
          <ul>
            {result.map((ingredient, index) => (
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
        $size={size}
        disabled={servings <= 1}
        onClick={() => handleServingsChange(servings - 1, dishData)}
      >
        <Minus />
      </CountButton>

      <CountInputField
        type="text"
        value={servings}
        onChange={(e) => {
          setServings(e.target.value.replace(/\D/g, ""));
        }}
        onBlur={() =>
          handleServingsChange(Math.max(1, Number(servings)), dishData)
        }
        required
        inputMode="numeric"
      />

      <CountButton
        type="button"
        disabled={buttonDisabled}
        onClick={() => handleServingsChange(servings + 1, dishData)}
      >
        <Plus />
      </CountButton>
    </Serving>
  );
}

export default ServingsControl;
