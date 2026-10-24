import styled, { css } from "styled-components";
import { Check, Square } from "lucide-react";
import { focusRingStyles, hoverStyles } from "../../../../style/helpers";
import VisuallyHiddenInput from "../../../../components/VisuallyHiddenInput";

const OptionRow = styled.label`
  position: relative;
  display: grid;
  grid-template-columns: 2rem 1fr auto;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-3) var(--space-1-5);
  border-radius: var(--radius-xl);
  cursor: pointer;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  user-select: none;
  transition: background-color 0.18s ease;

  ${hoverStyles(css`
    background-color: var(--color-surface-subtle);
  `)}

  &:has(input:focus-visible) {
    ${focusRingStyles}
  }
`;

const Checkbox = styled.div`
  position: relative;

  svg:first-of-type {
    color: ${({ $checked }) =>
      $checked ? "var(--color-control-active)" : "currentColor"};
    fill: ${({ $checked }) =>
      $checked ? "var(--color-control-active)" : "transparent"};
    width: 2rem;
    height: 2rem;
  }

  svg:last-of-type {
    position: absolute;
    top: 0.2rem;
    left: 0.2rem;
    color: var(--color-surface);
    opacity: ${({ $checked }) => ($checked ? "1" : "0")};
    width: 1.6rem;
    height: 1.6rem;

    transform: ${({ $checked }) => ($checked ? "scale(1)" : "scale(0.6)")};

    transition:
      opacity 0.12s ease,
      transform 0.12s ease;
  }
`;

const OptionName = styled.span`
  color: var(--color-text-strong);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const OptionPrice = styled.span`
  color: var(--color-text-secondary);
`;

function Option({ optionData, onToggle, selectedOptions }) {
  const { optionId, name, extraPrice } = optionData;

  // 當前選項是否是被選中的選項
  const isChecked = selectedOptions.some(
    (option) => option.optionId === optionId,
  );

  return (
    <OptionRow htmlFor={optionId} $checked={isChecked}>
      <VisuallyHiddenInput
        type="checkbox"
        id={optionId}
        // 避免數據尚未處理完成時isChecked = undefined報出受控元件error，所以設false為默認值
        checked={isChecked ?? false}
        onChange={(e) => onToggle(e)}
        onKeyDown={(e) => {
          // checkbox input不應該被enter觸發form提交
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
      />

      <Checkbox $checked={isChecked}>
        <Square />
        <Check strokeWidth={3} />
      </Checkbox>

      <OptionName>{name}</OptionName>

      <OptionPrice>
        {extraPrice === 0 ? "免費" : `+ $${extraPrice.toLocaleString()}`}
      </OptionPrice>
    </OptionRow>
  );
}

export default Option;
