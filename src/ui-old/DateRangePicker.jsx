// 日期範圍選擇元件
import styled, { css } from "styled-components";
import { zhTW } from "react-day-picker/locale";
import { format } from "date-fns";
import { useRef, useState } from "react";
import useClickOutside from "../hooks/ui/useClickOutside";
import StyledDayPicker from "./StyledDayPicker";
import { CalendarRange } from "lucide-react";

const StyledDatePicker = styled.div`
  position: relative;
`;

const DateField = styled.div`
  height: 3.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.2rem;
  padding: 0.2rem 0.8rem;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;

  ${(props) =>
    props.$isActive &&
    css`
      border-color: #2684ff;
      box-shadow: 0 0 0 1px #2684ff;
    `}

  input {
    font-size: 1.4rem;
    width: 100%;
    max-width: 160px;
    cursor: pointer;
  }

  svg {
    color: #3b82f6;
  }
`;

const StyledPopup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  position: absolute;
  top: 5rem;
  left: 50%;
  z-index: 999;
  transform: translateX(-50%);

  background-color: #fff;
  border: 1px solid #e3e5e7;
  box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 1.2rem;

  @media (max-width: 40em) {
    top: auto;
    bottom: 5rem;
  }
`;

const Footer = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const UtilityButton = styled.button`
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
}) {
  const [isOpenDayPicker, setIsOpenDayPicker] = useState(false);
  const daypickerRef = useRef(null);

  useClickOutside(daypickerRef, isOpenDayPicker, setIsOpenDayPicker, true);

  function formatRangeDate(selectedDate) {
    return `${format(selectedDate.from, "yyyy/MM/dd")} ~ ${format(
      selectedDate.to,
      "yyyy/MM/dd"
    )}`;
  }

  return (
    <StyledDatePicker>
      <DateField
        $isActive={isOpenDayPicker}
        onClick={() => setIsOpenDayPicker((isOpen) => !isOpen)}
      >
        <input
          name="startDate"
          value={selected ? formatRangeDate(selected) : ""}
          placeholder="選擇日期範圍"
          readOnly
        />

        <CalendarRange size={20} />
      </DateField>

      {isOpenDayPicker && (
        <StyledPopup ref={daypickerRef}>
          <StyledDayPicker
            animate
            captionLayout="dropdown"
            mode="range"
            weekStartsOn={0}
            locale={zhTW}
            defaultMonth={defaultMonth || new Date()}
            startMonth={startMonth}
            endMonth={endMonth}
            selected={selected}
            onSelect={onSelect}
            disabled={disabledDate}
          />
          <Footer>
            <UtilityButton onClick={handleValueReset} disabled={!selected}>
              清除
            </UtilityButton>

            <UtilityButton onClick={() => setIsOpenDayPicker(false)}>
              確認
            </UtilityButton>
          </Footer>
        </StyledPopup>
      )}
    </StyledDatePicker>
  );
}

export default DateRangePicker;
