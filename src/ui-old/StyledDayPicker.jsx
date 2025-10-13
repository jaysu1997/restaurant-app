import { DayPicker } from "react-day-picker";
import styled from "styled-components";

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

  .rdp-day:not(.rdp-selected):not(.rdp-disabled):hover .rdp-day_button {
    border: 2px dashed #818cf8;
  }
`;

export default StyledDayPicker;
