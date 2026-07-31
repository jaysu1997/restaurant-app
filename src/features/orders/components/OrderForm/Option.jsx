// ok
import styled, { css } from "styled-components";
import { Check, Square } from "lucide-react";
import { hoverStyles } from "../../../../style/helpers";

const OptionRow = styled.label`
  display: grid;
  grid-template-columns: 2rem 1fr auto;
  align-items: center;
  gap: 1.6rem;
  padding: 1.2rem 0.6rem;

  border-radius: 12px;
  cursor: pointer;
  font-size: 1.4rem;
  font-weight: 500;
  user-select: none;

  transition: background-color 0.18s ease;

  ${hoverStyles(css`
    background-color: #f3f4f6;
  `)}

  &:active {
    transform: scale(0.99);
  }
`;

const Checkbox = styled.div`
  position: relative;

  svg:first-of-type {
    color: ${({ $checked }) => ($checked ? "#007bff" : "currentColor")};
    fill: ${({ $checked }) => ($checked ? "#007bff" : "transparent")};
    width: 2rem;
    height: 2rem;
  }

  svg:last-of-type {
    position: absolute;
    top: 0.2rem;
    left: 0.2rem;
    color: #fff;
    opacity: ${({ $checked }) => ($checked ? "1" : "0")};
    width: 1.6rem;
    height: 1.6rem;
  }
`;

const OptionName = styled.span`
  color: #111827;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  /* line-height: 1.45; */
`;

const OptionPrice = styled.span`
  color: #374151;
`;

function Option({ optionData, onToggle, selectedOptions }) {
  const { optionId, name, extraPrice } = optionData;

  // 當前選項是否是被選中的選項
  const isChecked = selectedOptions.some(
    (option) => option.optionId === optionId,
  );

  return (
    <OptionRow htmlFor={optionId} $checked={isChecked}>
      <input
        type="checkbox"
        hidden
        id={optionId}
        // 避免數據尚未處理完成時isChecked = undefined報出受控元件error，所以設false為默認值
        checked={isChecked ?? false}
        onChange={(e) => onToggle(e)}
      />

      <Checkbox $checked={isChecked}>
        <Square />
        <Check strokeWidth={3} />
      </Checkbox>

      <OptionName>{name}</OptionName>

      <OptionPrice>
        {extraPrice === 0 ? "免費" : `+ $ ${extraPrice}`}
      </OptionPrice>
    </OptionRow>
  );
}

export default Option;
