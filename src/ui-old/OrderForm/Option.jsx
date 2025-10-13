import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
import styled from "styled-components";

// 不同選項要求和狀態的樣式設定
const colorStyle = {
  optionHover: {
    optional: "#e7e5e4",
    required: "#fecdd3",
    isAnswered: "#bae6fd",
  },
};

const StyledOption = styled.label`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1.2rem;
  height: 4rem;
  line-height: 1.4;
  position: relative;
  padding: 0.6rem;
  border-radius: 6px;

  &:hover {
    background-color: ${(props) => props.$colorStyle};
    cursor: pointer;
  }

  input {
    display: none;
  }

  span[role="optionName"] {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  svg[role="unchecked"] {
    transition: opacity 0.2s;
    color: rgba(0, 0, 0, 0.6);
  }

  svg[role="checked"] {
    color: #007bff;
    position: absolute;
    opacity: 0;
    // 和padding相同
    left: 0.6rem;
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

// 單一選項ui
function Option({
  isAnswered,
  customizeData,
  register,
  optionData,
  handleClick,
  curDishCustomizeOption,
}) {
  const { customizeId, choiceType, isRequired, title } = customizeData;

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
          choiceType === "single" &&
          curDishCustomizeOption[customizeId]?.detail.length > 0 &&
          !checked
        }
        {...register(`customizeField.${isRequired}.${customizeId}`, {
          required: isRequired === "optional" ? false : `${title}必須填選`,
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

export default Option;
