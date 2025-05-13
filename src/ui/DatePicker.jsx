import { useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import { zhTW } from "react-day-picker/locale";
import styled, { css } from "styled-components";
import { PiCalendar } from "react-icons/pi";
import { format, startOfMonth, startOfWeek, startOfYear } from "date-fns";
import useClickOutside from "../features/orders/useClickOutside";
import { useSearchParams } from "react-router-dom";

const StyledDatePicker = styled.div`
  position: relative;
`;

const DateField = styled.div`
  height: 3.8rem;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  padding: 0.2rem 0.8rem;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  overflow-y: auto;

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
  border-radius: 8px;
  padding: 1.3rem;
  position: absolute;
  top: 5rem;
  z-index: 2;
`;

const ShortcutsList = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ShortcutButton = styled.button`
  display: flex;
  border-radius: 16px;
  padding: 0.5rem 1.2rem;
  background-color: rgba(0, 0, 0, 0.08);
  font-weight: 500;
  font-size: 1.2rem;
  color: rgba(0, 0, 0, 0.87);
`;

const UtilityButton = styled(ShortcutButton)`
  color: #1d4ed8;
  background-color: transparent;
  font-size: 1.4rem;
`;

const CustomDayPicker = styled(DayPicker)`
  font-size: 1.2rem;
  font-weight: 600;

  --rdp-accent-color: #6366f1;
  --rdp-day-height: 3.2rem;
  --rdp-day-width: 3.2rem;
  --rdp-day_button-height: 3.2rem;
  --rdp-day_button-width: 3.2rem;

  button {
    transition: none;
  }

  .rdp-selected {
    font-size: 1.2rem;
  }

  .rdp-dropdown:focus-visible ~ .rdp-caption_label {
    outline: none;
  }

  .rdp-month {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .rdp-nav {
    padding: 0 0.5rem;
  }

  .rdp-month_caption {
    padding: 0 1rem;
  }

  .rdp-dropdown {
    cursor: pointer;
  }

  .rdp-chevron {
    fill: #1d4ed8;
    width: 1.4rem;
    height: 1.4rem;
  }

  .rdp-button_next,
  .rdp-button_previous {
    width: 2.4rem;
    height: 2.4rem;
  }

  :is(.rdp-button_next, .rdp-button_previous):not(
      [aria-disabled="true"]
    ):hover {
    background-color: #dbeafe;
    border-radius: 50%;
  }

  .rdp-caption_label {
    gap: 0.5rem;
  }

  .rdp-day:not(.rdp-selected):hover .rdp-day_button {
    border: 2px dashed #818cf8;
  }
`;

function DatePicker({ filterValue, handleValueChange, ...filters }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { queryKey, placeholder } = filters;
  const [isOpenDayPicker, setIsOpenDayPicker] = useState(false);
  const [month, setMonth] = useState(new Date());
  const daypickerRef = useRef(null);

  useClickOutside(daypickerRef, isOpenDayPicker, setIsOpenDayPicker);

  function formatRangeDate(selectedDate) {
    return `${format(selectedDate.from, "yyyy/MM/dd")} ~ ${format(
      selectedDate.to,
      "yyyy/MM/dd"
    )}`;
  }

  function handleShortcuts(from, to) {
    handleValueChange(queryKey, { from, to });
    setMonth(from);
  }

  return (
    <StyledDatePicker>
      <DateField
        $isActive={isOpenDayPicker}
        onClick={() => setIsOpenDayPicker((isOpen) => !isOpen)}
      >
        <input
          value={filterValue ? formatRangeDate(filterValue) : ""}
          placeholder={placeholder}
          readOnly
        />
        <span>
          <PiCalendar size={20} />
        </span>
      </DateField>

      {isOpenDayPicker && (
        <Wrapper ref={daypickerRef}>
          <ShortcutsList>
            <li>
              <ShortcutButton
                onClick={() =>
                  handleShortcuts(startOfYear(new Date()), new Date())
                }
              >
                今年
              </ShortcutButton>
            </li>
            <li>
              <ShortcutButton
                onClick={() =>
                  handleShortcuts(startOfMonth(new Date()), new Date())
                }
              >
                本月
              </ShortcutButton>
            </li>
            <li>
              <ShortcutButton
                onClick={() =>
                  handleShortcuts(startOfWeek(new Date()), new Date())
                }
              >
                本周
              </ShortcutButton>
            </li>
            <li>
              <ShortcutButton
                onClick={() => handleShortcuts(new Date(), new Date())}
              >
                今天
              </ShortcutButton>
            </li>
          </ShortcutsList>
          <CustomDayPicker
            animate
            captionLayout="dropdown-years"
            mode="range"
            weekStartsOn={0}
            locale={zhTW}
            month={month}
            onMonthChange={setMonth}
            startMonth={new Date(2020, 0)}
            endMonth={new Date()}
            selected={filterValue}
            onSelect={(range) =>
              handleValueChange(queryKey, range ? range : "")
            }
          />
          <ShortcutsList>
            <li>
              <UtilityButton
                onClick={() => handleValueChange(queryKey, "")}
                disabled={!filterValue}
              >
                清除
              </UtilityButton>
            </li>
            <li>
              <UtilityButton onClick={() => setIsOpenDayPicker(false)}>
                關閉
              </UtilityButton>
            </li>
          </ShortcutsList>
        </Wrapper>
      )}
    </StyledDatePicker>
  );
}

export default DatePicker;
