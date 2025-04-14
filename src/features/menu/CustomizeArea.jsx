import styled from "styled-components";
import { ImRadioChecked, ImRadioUnchecked } from "react-icons/im";
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
  }

  input {
    display: none;
  }

  svg[role="unchecked"] {
    width: 1.8rem;
    height: 1.8rem;
    transition: opacity 0.2s;
    color: rgba(0, 0, 0, 0.6);
  }

  svg[role="checked"] {
    width: 1.8rem;
    height: 1.8rem;
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
function CustomizeArea({
  type,
  customizeData,
  customizeIndex,
  register,
  edit = false,
}) {
  const [isAnswered, setIsAnswered] = useState(edit ? "isAnswered" : type);

  return (
    <Customize
      type={type}
      $colorStyle={colorStyle.background[isAnswered]}
      key={customizeData.id}
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
        {customizeData.options.map((optionData, optionIndex) => (
          <Option
            isAnswered={isAnswered}
            setIsAnswered={setIsAnswered}
            type={type}
            mode={customizeData.choice}
            optionData={optionData}
            customizeIndex={customizeIndex}
            register={register}
            key={optionIndex}
          />
        ))}
      </OptionsArea>
    </Customize>
  );
}

export default CustomizeArea;

// 單一選項ui
function Option({
  type,
  mode,
  optionData,
  customizeIndex,
  register,
  isAnswered,
  setIsAnswered,
}) {
  const {
    state: { tempArray },
    dispatch,
  } = useOrder();

  // 數據內容與格式
  const payload = {
    customizeId: customizeIndex,
    optionLabel: optionData.optionLabel,
    extraPrice: optionData.extraPrice,
    ingredientName: optionData.ingredientName.value,
    quantity: optionData.quantity,
  };

  // 當前是否被選中的選項
  const checked = tempArray[customizeIndex]?.detail.some(
    (option) => option.optionLabel === optionData.optionLabel
  );

  function handleClick(e) {
    // 單選新增
    if (mode === "單選" && e.target.checked) {
      dispatch({
        type: "tempArray/setSingleChoice",
        payload,
      });
      // 必填
      type === "required" && setIsAnswered("isAnswered");
    }

    // 單選刪除
    if (mode === "單選" && !e.target.checked) {
      dispatch({
        type: "tempArray/clearSingleChoice",
        payload,
      });
      // 必填
      type === "required" && setIsAnswered("required");
    }

    // 多選新增
    if (mode === "多選" && e.target.checked) {
      dispatch({
        type: "tempArray/addMultipleChoice",
        payload,
      });

      type === "required" && setIsAnswered("isAnswered");
    }

    // 多選移除
    if (mode === "多選" && !e.target.checked) {
      // 如果此多選項目是必填，則在沒有選取任何值的情況下，整體樣式需恢復成未填寫狀態
      if (type === "required") {
        const tempArrayIndex = tempArray.findIndex(
          (customize) => customize.customizeId === customizeIndex
        );

        // 當前選項長度為1，代表目前只有存在一個選項，被移除後就沒有選取任何值
        tempArray[tempArrayIndex].detail.length === 1 &&
          setIsAnswered("required");
      }

      // 移除選項
      dispatch({
        type: "tempArray/removeMultipleChoice",
        payload,
      });
    }
  }

  return (
    <StyledOption
      type={type}
      $colorStyle={colorStyle.optionHover[isAnswered]}
      htmlFor={optionData.optionLabel}
    >
      <input
        type="checkbox"
        id={optionData.optionLabel}
        value={optionData.optionLabel}
        onClick={handleClick}
        disabled={
          mode === "單選" &&
          tempArray[customizeIndex]?.detail.length > 0 &&
          !checked
        }
        {...register(`customizeField.${type}.${customizeIndex}`, {
          required: type === "optional" ? false : true,
        })}
      />

      <ImCheckboxUnchecked role="unchecked" />
      <ImCheckboxChecked role="checked" />

      <span role="optionName">{optionData.optionLabel}</span>
      <span role="price">
        {optionData.extraPrice === 0 ? "免費" : `+$ ${optionData.extraPrice}`}
      </span>
    </StyledOption>
  );
}
