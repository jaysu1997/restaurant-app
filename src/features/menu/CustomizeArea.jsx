import styled from "styled-components";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
import { useOrder } from "../../context/OrderContext";
import { useState } from "react";

// 不同選項要求和狀態的樣式設定
const colorStyle = {
  background: {
    optional: "#fafaf9",
    required: "#fff1f2",
    isAnswered: "#f0f9ff",
  },
  label: {
    optional: { background: "#e7e5e4", font: "#000" },
    required: { background: "#f43f5e", font: "#fff" },
    isAnswered: { background: "#3b82f6", font: "#fff" },
  },
  optionHover: {
    optional: "#e7e5e4",
    required: "#fecdd3",
    isAnswered: "#bae6fd",
  },
};

const Customize = styled.section`
  display: flex;
  flex-direction: column;
  border: 1px solid #cacaca;
  padding: 1.2rem;
  border-radius: 10px;
  background-color: ${(props) => props.$colorStyle};
  transition: all 0.2s;
`;

const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2.8rem;
`;

const Title = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  letter-spacing: 0.1rem;
`;

const RequiredLabel = styled.span`
  text-align: center;
  font-size: 1.2rem;
  line-height: 1.5;
  background-color: ${(props) => props.$colorStyle.background};
  color: ${(props) => props.$colorStyle.font};
  border-radius: 50px;
  padding: 0.4rem 1rem;
  font-weight: 400;
`;

const ChoiceLabel = styled.span`
  font-weight: 500;
  margin-bottom: 1.6rem;
  color: rgba(0, 0, 0, 0.6);
`;

const OptionsArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const StyledOption = styled.label`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  height: 4rem;
  line-height: 1.4;
  position: relative;
  padding: 0.6rem;
  border-radius: 5px;

  &:hover {
    background-color: ${(props) => props.$colorStyle};
    cursor: pointer;
  }

  input {
    display: none;
  }

  svg[role="unchecked"] {
    transition: opacity 0.2s;
    color: rgba(0, 0, 0, 0.6);
  }

  svg[role="checked"] {
    color: #007bff;
    position: absolute;
    opacity: 0;
    transform: scale(0.5);
    transition: opacity 0.2s, transform 0.5s;
  }

  &:has(input:disabled) {
    cursor: not-allowed;
    opacity: 0.6;
  }

  input:checked ~ svg[role="checked"] {
    opacity: 1;
    transform: scale(1);
  }

  input:checked ~ svg[role="unchecked"] {
    opacity: 0;
  }

  span[role="price"] {
    margin-left: auto;
    letter-spacing: 0.15rem;
  }
`;

// 自訂選項區塊
function CustomizeArea({ type, customizeData, register, isEdit = false }) {
  // 用來控制細項CSS樣式(填寫狀態)
  const [isAnswered, setIsAnswered] = useState(isEdit ? "isAnswered" : type);

  const {
    state: { curDishCustomizeOption },
    dispatch,
  } = useOrder();

  const { choice, customizeId } = customizeData;

  function handleClick(e, payload) {
    // 單選新增
    if (choice === "單選" && e.target.checked) {
      dispatch({
        type: "curDishCustomizeOption/setSingleChoice",
        payload,
      });
      // 必填
      type === "required" && setIsAnswered("isAnswered");
    }

    // 單選刪除
    if (choice === "單選" && !e.target.checked) {
      dispatch({
        type: "curDishCustomizeOption/clearSingleChoice",
        payload,
      });
      // 必填
      type === "required" && setIsAnswered("required");
    }

    // 多選新增
    if (choice === "多選" && e.target.checked) {
      dispatch({
        type: "curDishCustomizeOption/addMultipleChoice",
        payload,
      });
      // 必填
      type === "required" && setIsAnswered("isAnswered");
    }

    // 多選移除
    if (choice === "多選" && !e.target.checked) {
      // 如果此多選項目是必填，則在沒有選取任何值的情況下，整體樣式需恢復成未填寫狀態
      if (type === "required") {
        const curDishCustomizeOptionIndex = curDishCustomizeOption.findIndex(
          (customize) => customize.customizeId === customizeId
        );

        // 當前選項長度為1，代表目前只有存在一個選項，被移除後就沒有選取任何值
        curDishCustomizeOption[curDishCustomizeOptionIndex].detail.length ===
          1 && setIsAnswered("required");
      }

      // 移除選項
      dispatch({
        type: "curDishCustomizeOption/removeMultipleChoice",
        payload,
      });
    }
  }

  return (
    <Customize
      type={type}
      $colorStyle={colorStyle.background[isAnswered]}
      key={customizeData.customizeId}
    >
      <Heading>
        <Title>{customizeData.title}</Title>
        <RequiredLabel type={type} $colorStyle={colorStyle.label[isAnswered]}>
          {type === "required"
            ? isAnswered === "isAnswered"
              ? "完成"
              : "必填"
            : "選填"}
        </RequiredLabel>
      </Heading>
      <ChoiceLabel>
        {customizeData.choice === "單選" ? "只能單選" : "可以多選"}
      </ChoiceLabel>
      <OptionsArea>
        {customizeData.options.map((optionData) => (
          <Option
            isAnswered={isAnswered}
            type={type}
            choice={choice}
            customizeId={customizeId}
            register={register}
            optionData={optionData}
            handleClick={handleClick}
            curDishCustomizeOption={curDishCustomizeOption}
            key={optionData.optionId}
          />
        ))}
      </OptionsArea>
    </Customize>
  );
}

export default CustomizeArea;

// 單一選項ui
function Option({
  isAnswered,
  type,
  choice,
  customizeId,
  register,
  optionData,
  handleClick,
  curDishCustomizeOption,
}) {
  const { optionId, optionLabel, extraPrice, ingredientName, quantity } =
    optionData;

  // 數據內容與格式
  const payload = {
    customizeId,
    optionId,
    optionLabel,
    extraPrice,
    ingredientName: ingredientName.value,
    quantity,
  };

  // 獨一無二的值(避免如果不小心設定相同選項名稱所導致的功能異常)
  const uniqueValue = `${customizeId}-${optionId}-${optionLabel}`;

  // 當前選項是否是被選中的選項(單選細項需要)
  const checked = curDishCustomizeOption[customizeId]?.detail.some(
    (option) => option.optionId === optionId
  );

  return (
    <StyledOption
      $colorStyle={colorStyle.optionHover[isAnswered]}
      htmlFor={uniqueValue}
    >
      <input
        type="checkbox"
        id={uniqueValue}
        value={uniqueValue}
        onClick={(e) => handleClick(e, payload)}
        // 如果是單選細項且已經有選定選項，就禁止選擇其他選項
        disabled={
          choice === "單選" &&
          curDishCustomizeOption[customizeId]?.detail.length > 0 &&
          !checked
        }
        {...register(`customizeField.${type}.${customizeId}`, {
          required: type === "optional" ? false : true,
        })}
      />

      <ImCheckboxUnchecked size={18} role="unchecked" />
      <ImCheckboxChecked size={18} role="checked" />

      <span role="optionName">{optionData.optionLabel}</span>
      <span role="price">
        {optionData.extraPrice === 0 ? "免費" : `+$ ${optionData.extraPrice}`}
      </span>
    </StyledOption>
  );
}
