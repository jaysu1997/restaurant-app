// 控制和設定餐點份數的元件
import styled from "styled-components";
import { IoRemoveSharp, IoAddSharp } from "react-icons/io5";
import { useOrder } from "../context/OrderContext";
import { useEffect, useRef, useState } from "react";
import StyledHotToast from "./StyledHotToast";

const Serving = styled.div`
  display: flex;
  border: 1px solid #d1d5db;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  overflow: hidden;
  width: fit-content;
  height: ${({ $size }) => ($size === "sm" ? "2.4rem" : "3.2rem")};
  flex-shrink: 0;
`;

const CountInputField = styled.input`
  height: 100%;
  width: ${({ $size }) => ($size === "sm" ? "3.6rem" : "4.8rem")};
  border-left: 1px solid #d1d5db;
  border-right: 1px solid #d1d5db;
  text-align: center;
  font-size: ${({ $size }) => ($size === "sm" ? "1.2rem" : "1.4rem")};
  padding: 0.2rem 0.4rem;
`;

const CountButton = styled.button`
  height: 100%;
  width: 100%;
  aspect-ratio: 1 / 1;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 70%;
    height: 70%;
    color: #1d4ed8;
  }

  &:not(:disabled):hover {
    background-color: #e0f2fe;
  }

  &:disabled {
    background-color: #f4f4f5;

    svg {
      color: rgba(0, 0, 0, 0.35);
    }
  }
`;

function ServingsControl({
  servings,
  setServings,
  size = "sm",
  order = false,
}) {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const { state, dispatch, compareInventory } = useOrder();
  const prevServingsRef = useRef(servings);

  // 處理份數調整的函式
  function handleServingsChange(servings, order) {
    // 如果是在OrderForm上使用，不需要再次檢查庫存剩餘食材
    if (!order) {
      setServings(() => {
        prevServingsRef.current = servings;
        return servings;
      });

      return;
    }

    // 以下是如果餐點已經新增到訂單中會觸發的功能(需要再次檢查庫存食材是否充足)
    let result = [];

    if (servings - prevServingsRef.current > 0) {
      result = compareInventory({
        ingredientsUsage: order.ingredientsUsage,
        servings: servings - prevServingsRef.current,
        inventoryMap: new Map(state.inventoryMap),
      });
    }

    // 庫存充足
    if (result.length === 0) {
      setServings(() => {
        prevServingsRef.current = servings;
        return servings;
      });

      dispatch({
        type: "order/updateDishServings",
        payload: {
          servings,
          uniqueId: order.uniqueId,
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
        title: "點餐失敗",
        content: (
          <>
            <h4>庫存食材不足：</h4>
            <ul>
              {result.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.maxCapacity === 0
                    ? `${ingredient.name}已用完`
                    : `${ingredient.name}不足（最多供應${ingredient.maxCapacity}份）`}
                </li>
              ))}
            </ul>
          </>
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
        onClick={() => handleServingsChange(servings - 1, order)}
      >
        <IoRemoveSharp />
      </CountButton>

      <CountInputField
        type="number"
        $size={size}
        value={servings.toString()}
        onChange={(e) => {
          setServings(Number(e.target.value));
        }}
        onBlur={() =>
          handleServingsChange(Math.max(1, Number(servings)), order)
        }
        min={1}
        max={99}
        required
        inputMode="numeric"
      />

      <CountButton
        type="button"
        $size={size}
        disabled={buttonDisabled}
        onClick={() => handleServingsChange(servings + 1, order)}
      >
        <IoAddSharp />
      </CountButton>
    </Serving>
  );
}

export default ServingsControl;
