// 控制和設定餐點份數的元件
import styled from "styled-components";
import { IoRemoveSharp, IoAddSharp } from "react-icons/io5";
import { useOrder } from "../context/OrderContext";
import { useRef, useState } from "react";
import StyledHotToast from "./StyledHotToast";
import { compareInventory } from "../utils/orderHelpers";

const Serving = styled.div`
  display: flex;
  border: 1px solid #d1d5db;
  align-items: center;
  justify-content: space-between;
  border-radius: 6px;
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
        onClick={() => handleServingsChange(servings - 1, dishData)}
      >
        <IoRemoveSharp />
      </CountButton>

      <CountInputField
        type="number"
        $size={size}
        value={servings}
        onChange={(e) => {
          setServings(
            e.target.value !== "" ? Number(e.target.value) : e.target.value
          );
        }}
        onBlur={() =>
          handleServingsChange(Math.max(1, Number(servings)), dishData)
        }
        min={1}
        required
        inputMode="numeric"
      />

      <CountButton
        type="button"
        $size={size}
        disabled={buttonDisabled}
        onClick={() => handleServingsChange(servings + 1, dishData)}
      >
        <IoAddSharp />
      </CountButton>
    </Serving>
  );
}

export default ServingsControl;
