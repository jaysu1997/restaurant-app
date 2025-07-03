import { useMemo, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { PiCalendar } from "react-icons/pi";
import {
  addDays,
  format,
  isAfter,
  isBefore,
  isEqual,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from "date-fns";
import useClickOutside from "../../hooks/ui/useClickOutside";
import DateRangePicker from "../DateRangePicker";

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

// 快捷選項設定
const shortcuts = [
  {
    label: "今年",
    start: startOfYear(new Date()),
  },
  {
    label: "本月",
    start: startOfMonth(new Date()),
  },
  {
    label: "本週",
    start: startOfWeek(new Date()),
  },
  {
    label: "今天",
    start: new Date(),
  },
];

function DateRangeFilter({ filterValue, handleValueChange, ...filters }) {
  const { queryKey, placeholder } = filters;
  const [isOpenDayPicker, setIsOpenDayPicker] = useState(false);
  const [month, setMonth] = useState(new Date());
  const daypickerRef = useRef(null);
  const [hoverPreview, setHoverPreview] = useState(undefined);

  const hoverRange = useMemo(() => {
    const from = filterValue.from;

    // 如果 hoverDate > from
    if (isAfter(hoverPreview, from)) {
      return { from: addDays(from, 1), to: hoverPreview };
    }

    // 如果 hoverDate < from
    if (isBefore(hoverPreview, from)) {
      return { from: hoverPreview, to: addDays(from, 1) };
    }
  }, [filterValue, hoverPreview]);

  useClickOutside(daypickerRef, isOpenDayPicker, setIsOpenDayPicker, true);

  function formatRangeDate(selectedDate) {
    return `${format(selectedDate.from, "yyyy / MM / dd")} ~ ${format(
      selectedDate.to,
      "yyyy / MM / dd"
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
        onClick={() => setIsOpenDayPicker(true)}
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
            {shortcuts.map((shortcut) => (
              <li key={shortcut.label}>
                <ShortcutButton
                  onClick={() => handleShortcuts(shortcut.start, new Date())}
                >
                  {shortcut.label}
                </ShortcutButton>
              </li>
            ))}
          </ShortcutsList>

          <DateRangePicker
            captionLayout="dropdown"
            mode="range"
            month={month}
            onMonthChange={setMonth}
            startMonth={new Date(2020, 0)}
            endMonth={new Date()}
            selected={filterValue}
            onSelect={(range) =>
              handleValueChange(queryKey, range ? range : "")
            }
            onDayMouseEnter={(date) => {
              if (isEqual(filterValue.from, filterValue.to)) {
                setHoverPreview(date);
              }
            }}
            onDayMouseLeave={() => setHoverPreview(undefined)}
            modifiers={{
              hoverPreview: hoverRange,
            }}
            modifiersClassNames={{
              hoverPreview: "rdp-range_middle",
            }}
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
                確認
              </UtilityButton>
            </li>
          </ShortcutsList>
        </Wrapper>
      )}
    </StyledDatePicker>
  );
}

export default DateRangeFilter;
