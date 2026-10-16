// 日期範圍選擇元件
import styled, { css } from "styled-components";
import { useRef, useState } from "react";
import RangeCalendar from "../components/RangeCalendar";
import { CalendarRange } from "lucide-react";
import useClickOutside from "../hooks/ui/useClickOutside";
import { hoverStyles } from "../style/helpers";
import { formatRangeDate } from "../utils/dateTime.js";
import useRestoreFocus from "../hooks/ui/useRestoreFocus.js";

const StyledDateRangePicker = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
`;

const DateField = styled.button`
  height: 4.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
  padding: var(--space-0-5) var(--space-2);
  width: 100%;
  border-radius: var(--radius-lg);
  background-color: var(--color-surface);
  cursor: pointer;
  white-space: nowrap;

  border: 1px solid
    ${({ $isPickerOpen }) =>
      $isPickerOpen ? "var(--color-focus)" : "var(--color-border-strong)"};
  box-shadow: ${({ $isPickerOpen }) =>
    $isPickerOpen ? "var(--shadow-focus-control)" : "none"};

  svg {
    color: var(--color-info);
    width: 2rem;
    height: 2rem;
  }

  ${hoverStyles(css`
    &:not(:focus) {
      border-color: ${({ $isPickerOpen }) =>
        $isPickerOpen ? "var(--color-focus)" : "var(--color-border-hover)"};
    }
  `)}

  &:focus-visible {
    outline: none;
    border-color: var(--color-focus);
    box-shadow: var(--shadow-focus-control);
  }
`;

const Placeholder = styled.span`
  color: var(--color-text-placeholder);
  font-weight: var(--font-weight-regular);
  font-size: var(--font-size-sm);
`;

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-2-5);
  background-color: #fafafa;
  border-radius: var(--radius-lg);
  padding: ${({ $popover }) =>
    $popover ? "var(--space-4)" : "var(--space-2-5) 0"};

  ${({ $popover }) =>
    $popover &&
    css`
      position: absolute;
      top: 4.5rem;
      z-index: 10;
      box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.1);
      border: 1px solid var(--color-border-subtle);
    `}
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
`;

const ActionButton = styled.button`
  display: flex;
  padding: 0.5rem var(--space-3);
  color: var(--color-brand-hover);
  background-color: transparent;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
`;

function DateRangePicker({ display = "inline", onClear, ...rest }) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [dayCellSize, setDayCellSize] = useState(null);
  const wrapperRef = useRef(null);

  const onClose = () => setIsPickerOpen(false);
  const isPopover = display === "popover";

  const handleCloseModal = useRestoreFocus(onClose, isPopover && isPickerOpen);
  useClickOutside(wrapperRef, isPickerOpen && isPopover, handleCloseModal);

  function handleClick() {
    if (!isPickerOpen) {
      const rect = wrapperRef.current?.getBoundingClientRect();
      setDayCellSize(rect.width / 7);
    }

    setIsPickerOpen((open) => !open);
  }

  return (
    <StyledDateRangePicker ref={wrapperRef}>
      <DateField
        type="button"
        $isPickerOpen={isPickerOpen}
        onClick={handleClick}
      >
        {rest.selected ? (
          formatRangeDate(rest.selected)
        ) : (
          <Placeholder>選擇日期範圍</Placeholder>
        )}
        <CalendarRange />
      </DateField>

      {isPickerOpen && (
        <Panel
          $isPickerOpen={isPickerOpen}
          inert={!isPickerOpen}
          $popover={isPopover}
        >
          <RangeCalendar $dayCellSize={dayCellSize} {...rest} />
          {isPopover && (
            <Footer>
              <ActionButton
                type="button"
                onClick={onClear}
                disabled={!rest.selected}
              >
                清除
              </ActionButton>

              <ActionButton type="button" onClick={handleCloseModal}>
                確認
              </ActionButton>
            </Footer>
          )}
        </Panel>
      )}
    </StyledDateRangePicker>
  );
}

export default DateRangePicker;
