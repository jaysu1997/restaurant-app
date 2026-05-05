// 日期範圍選擇元件
import styled, { css } from "styled-components";
import { format } from "date-fns";
import { useRef, useState } from "react";
import StyledDayRangePicker from "./StyledDayRangePicker";
import { CalendarRange } from "lucide-react";
import useClickOutside from "../hooks/ui/useClickOutside";

const StyledDateRangePicker = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DateField = styled.div`
  height: 3.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.2rem;
  padding: 0.2rem 0.8rem;
  width: 100%;
  border: 1px solid
    ${({ $isPickerOpen }) => ($isPickerOpen ? "#2684ff" : "#ddd")};
  box-shadow: ${({ $isPickerOpen }) =>
    $isPickerOpen ? "0 0 0 1px #2684ff" : "none"};
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;

  input {
    font-size: 1.4rem;
    width: 100%;
    cursor: pointer;
  }

  svg {
    color: #3b82f6;
    width: 2rem;
    height: 2rem;
  }

  &:hover {
    border-color: ${({ $isPickerOpen }) =>
      $isPickerOpen ? "#2684ff" : "#b3b3b3"};
  }
`;

const Panel = styled.div`
  overflow: hidden;
  border-radius: 8px;

  max-height: ${({ $isPickerOpen }) => ($isPickerOpen ? "100rem" : "0px")};
  opacity: ${({ $isPickerOpen }) => ($isPickerOpen ? "1" : "0")};

  transition:
    max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.25s ease;

  ${({ $popover }) =>
    $popover &&
    css`
      position: absolute;
      top: 5rem;
      z-index: 10;
      margin: 0;
      box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.1);
      border: 1px solid #e3e5e7;
    `}
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #fafafa;
  margin-top: ${({ $popover }) => ($popover ? "0" : "1.2rem")};
  padding: ${({ $popover }) => ($popover ? "1.6rem" : "1rem 0")};
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
`;

const ActionButton = styled.button`
  display: flex;
  padding: 0.5rem 1.2rem;
  color: #1d4ed8;
  background-color: transparent;
  font-size: 1.4rem;
  font-weight: 500;
`;

function DateRangePicker({
  defaultMonth,
  startMonth,
  endMonth,
  selected,
  onSelect,
  handleValueReset,
  disabledDate,
  display = "inline",
}) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [dayCellSize, setDayCellSize] = useState(null);
  const wrapperRef = useRef(null);

  const onClose = () => setIsPickerOpen(false);
  const isPopover = display === "popover";

  useClickOutside(wrapperRef, isPickerOpen && isPopover, onClose);

  function formatRangeDate(selectedDate) {
    return `${format(selectedDate.from, "yyyy/MM/dd")} ~ ${format(
      selectedDate.to,
      "yyyy/MM/dd",
    )}`;
  }

  function handleClick() {
    if (!isPickerOpen) {
      const rect = wrapperRef.current?.getBoundingClientRect();
      setDayCellSize(rect.width / 7);
    }

    setIsPickerOpen((open) => !open);
  }

  return (
    <StyledDateRangePicker ref={wrapperRef}>
      <DateField $isPickerOpen={isPickerOpen} onClick={handleClick}>
        <input
          name="dateRange"
          value={selected ? formatRangeDate(selected) : ""}
          placeholder="選擇日期範圍"
          readOnly
        />
        <CalendarRange />
      </DateField>

      <Panel
        $isPickerOpen={isPickerOpen}
        inert={!isPickerOpen}
        $popover={isPopover}
      >
        <Content $popover={isPopover}>
          <StyledDayRangePicker
            $dayCellSize={dayCellSize}
            defaultMonth={defaultMonth || new Date()}
            startMonth={startMonth}
            endMonth={endMonth}
            selected={selected}
            onSelect={onSelect}
            disabled={disabledDate}
          />
          {isPopover && (
            <Footer>
              <ActionButton
                type="button"
                onClick={handleValueReset}
                disabled={!selected}
              >
                清除
              </ActionButton>

              <ActionButton type="button" onClick={onClose}>
                確認
              </ActionButton>
            </Footer>
          )}
        </Content>
      </Panel>
    </StyledDateRangePicker>
  );
}

export default DateRangePicker;
