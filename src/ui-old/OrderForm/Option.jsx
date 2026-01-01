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
  register,
  optionData,
  handleClick,
  currentCustomization,
}) {
  const { customizeId, choiceType, isRequired, title } = customizeData;

  const { optionId, optionLabel, extraPrice, ingredient, quantity } =
    optionData;

  // 數據內容與格式
  const payload = {
    customizeId,
    optionId,
    optionLabel,
    extraPrice,
    ingredientName: ingredient.value,
    quantity,
  };

  // 當前選項是否是被選中的選項(單選項目需要)
  const checked = currentCustomization
    .find((c) => c.customizeId === customizeId)
    ?.selectedOptions.some((option) => option.optionId === optionId);

  return (
    <StyledOption
      $hoverBgColor={hoverBgColor[isAnswered]}
      htmlFor={optionId}
      $checked={checked}
    >
      <input
        type={choiceType === "single" ? "radio" : "checkbox"}
        hidden
        id={optionId}
        value={optionId}
        onClick={(e) => handleClick(e, payload)}
        {...register(`customizeField.${isRequired}.${customizeId}`, {
          required: isRequired === "optional" ? false : `${title}必須填選`,
        })}
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
