import { DayPicker } from "react-day-picker";
import styled from "styled-components";
import { zhTW } from "react-day-picker/locale";

const StyledDayPicker = styled(DayPicker)`
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

function DateRangePicker({
  month,
  setMonth,
  filterValue,
  handleValueChange,
  queryKey,
}) {
  return (
    <StyledDayPicker
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
      onSelect={(range) => handleValueChange(queryKey, range ? range : "")}
    />
  );
}

export default DateRangePicker;
