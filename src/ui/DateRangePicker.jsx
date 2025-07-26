// 日期範圍選擇元件
import styled, { css } from "styled-components";
import { zhTW } from "react-day-picker/locale";
import { format } from "date-fns";
import { useRef, useState } from "react";
import useClickOutside from "../hooks/ui/useClickOutside";
import { PiCalendar } from "react-icons/pi";
import StyledDayPicker from "./StyledDayPicker";

const StyledDatePicker = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const DateField = styled.div`
  height: 3.8rem;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  padding: 0.2rem 0.8rem;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 6px;
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
    cursor: pointer;
  }

  span {
    display: inline-flex;
    color: #3b82f6;
  }
`;

const Wrapper = styled.div`
  background-color: #fff;
  box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 6px;
  padding: 1.3rem;
  position: absolute;
  top: 5rem;
  z-index: 2;
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
    return `${format(selectedDate, "yyyy/MM/dd")}`;
  }

  return (
    <StyledDatePicker>
      <DateField
        $isActive={isOpenDayPicker}
        onClick={() => setIsOpenDayPicker(true)}
      >
        <input
          name="startDate"
          value={selected ? formatRangeDate(selected?.from) : ""}
          placeholder="開始日期"
          readOnly
        />
        <span>
          <PiCalendar size={20} />
        </span>
      </DateField>
      <span>至</span>
      <DateField
        $isActive={isOpenDayPicker}
        onClick={() => setIsOpenDayPicker(true)}
      >
        <input
          name="endDate"
          value={selected ? formatRangeDate(selected?.to) : ""}
          placeholder="結束日期"
          readOnly
        />
        <span>
          <PiCalendar size={20} />
        </span>
      </DateField>

      {isOpenDayPicker && (
        <Wrapper ref={daypickerRef}>
          <StyledDayPicker
            animate
            captionLayout="dropdown"
            mode="range"
            weekStartsOn={0}
            locale={zhTW}
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
        </Wrapper>
      )}
    </StyledDatePicker>
  );
}

export default DateRangePicker;
