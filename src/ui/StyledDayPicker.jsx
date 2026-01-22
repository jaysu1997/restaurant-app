import { DayPicker } from "react-day-picker";
import styled from "styled-components";

const StyledDayPicker = styled(DayPicker)`
  --rdp-accent-color: #6366f1;

  font-size: 1.4rem;
  font-weight: 500;

  .rdp-selected {
    font-size: 1em;
  }

  .rdp-dropdown:focus-visible ~ .rdp-caption_label {
    outline: none;
  }

  .rdp-month {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .rdp-month_caption {
    padding: 0 1rem;
  }

  .rdp-dropdown {
    cursor: pointer;
  }

  .rdp-chevron {
    fill: #1d4ed8;
    width: 1.6rem;
    height: 1.6rem;
  }

  /* 左右移動按鈕 */
  [class^="rdp-button_"]:not([aria-disabled="true"]):hover {
    background-color: #dbeafe;
    border-radius: 50%;
  }

  .rdp-nav {
    padding: 0 0.5rem;
    gap: 0.3rem;
  }

  /* :hover日期的效果 */
  .rdp-day:not(.rdp-selected):not(.rdp-disabled):hover .rdp-day_button {
    border: 2px dashed #818cf8;
  }

  @media (max-width: 48em) {
    [class^="rdp-day"] {
      width: 3.6rem;
      height: 3.6rem;
    }
  }

  @media (max-width: 20em) {
    font-size: 1.2rem;

    [class^="rdp-day"] {
      width: 3.2rem;
      height: 3.2rem;
    }
  }
`;

export default StyledDayPicker;
