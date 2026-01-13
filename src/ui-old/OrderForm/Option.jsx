import { Check, Square } from "lucide-react";
import styled from "styled-components";

// 不同選項要求和狀態的樣式設定
const hoverBgColor = {
  optional: "#e7e5e4",
  required: "#fecdd3",
  isAnswered: "#bae6fd",
};

const StyledOption = styled.label`
  display: grid;
  grid-template-columns: 2rem 1fr auto;
  align-items: center;
  gap: 1.2rem;
  height: 4rem;
  line-height: 1.4;
  position: relative;
  padding: 0.6rem;
  border-radius: 6px;
  cursor: pointer;

  &:not(:has(input:disabled)):hover {
    background-color: ${({ $hoverBgColor }) => $hoverBgColor};
  }

  svg {
    transition: all 0.2s;
  }

  svg:first-of-type {
    color: ${({ $checked }) => ($checked ? "#007bff" : "currentColor")};
    fill: ${({ $checked }) => ($checked ? "#007bff" : "transparent")};
  }

  svg:last-of-type {
    position: absolute;
    left: 0.8rem;
    color: #fff;
    opacity: ${({ $checked }) => ($checked ? "1" : "0")};
    transform: ${({ $checked }) => ($checked ? "scale(1)" : "scale(0.5)")};
  }
`;

const OptionName = styled.span`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

// 單一選項ui
function Option({
  isAnswered,
  customizeData,
  optionData,
  handleClick,
  currentCustomization,
}) {
  const { customizeId, choiceType, isRequired } = customizeData;

  const { optionId, optionLabel, extraPrice, ingredient, quantity } =
    optionData;

  // 數據內容與格式
  const payload = {
    customizeId,
    optionId,
    optionLabel,
    extraPrice,
    ingredientUuid: ingredient.uuid || null,
    ingredientName: ingredient.value,
    quantity,
  };

  // 當前選項是否是被選中的選項
  const isChecked = currentCustomization
    .find((customize) => customize.customizeId === customizeId)
    ?.selectOptions.some((option) => option.optionId === optionId);

  return (
    <StyledOption
      $hoverBgColor={hoverBgColor[isAnswered]}
      htmlFor={optionId}
      $checked={isChecked}
    >
      <input
        // type={
        //   choiceType === "single" && isRequired === "required"
        //     ? "radio"
        //     : "checkbox"
        // }
        type="checkbox"
        hidden
        id={optionId}
        // 避免數據尚未處理完成時isChecked = undefined報出受控元件error，所以設false為默認值
        checked={isChecked ?? false}
        onChange={(e) => {
          handleClick(e, payload);
        }}
      />

      <Square size={20} />
      <Check size={16} strokeWidth={3} />

      <OptionName>{optionData.optionLabel}</OptionName>
      <span>
        {optionData.extraPrice === 0 ? "免費" : `+ $ ${optionData.extraPrice}`}
      </span>
    </StyledOption>
  );
}

export default Option;
