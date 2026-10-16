import styled from "styled-components";
import { DayPicker } from "@daypicker/react";
import { zhTW } from "@daypicker/react/locale";
import { normalizeCalendarDate } from "../utils/dateTime.js";
import { focusRingStyles } from "../style/helpers.js";

const StyledDayPicker = styled(DayPicker)`
  --rdp-accent-color: #6366f1;
  --rdp-range_middle-background-color: #e0e7ff;

  width: 100%;

  font-size: 1.3rem;
  font-weight: var(--font-weight-medium);

  .rdp-selected {
    font-size: 1em;
  }

  .rdp-dropdown:focus-visible ~ .rdp-caption_label {
    ${focusRingStyles}
  }

  .rdp-month {
    display: flex;
    flex-direction: column;
    gap: var(--space-2-5);
  }

  .rdp-dropdown {
    cursor: pointer;
  }

  .rdp-chevron {
    fill: var(--color-brand-hover);
    width: 1.8rem;
    height: 1.8rem;
  }

  /* 左右移動按鈕 */
  [class^="rdp-button_"] {
    width: 2.75rem;
    height: 2.75rem;
  }

  @media (hover: hover) and (pointer: fine) {
    /* 左右移動按鈕hover效果 */
    [class^="rdp-button_"]:not([aria-disabled="true"]):hover {
      background-color: #dbeafe;
      border-radius: 50%;
    }

    /* :hover日期的效果 */
    .rdp-day:not(.rdp-selected):not(.rdp-disabled):hover .rdp-day_button {
      border: 2px dashed #818cf8;
    }
  }

  /* 隨著容器寬度調整日期的尺寸 */
  [class^="rdp-day"] {
    width: ${({ $dayCellSize }) =>
      $dayCellSize ? `${$dayCellSize}px` : "3.8rem"};
    height: ${({ $dayCellSize }) =>
      $dayCellSize ? `${$dayCellSize}px` : "3.8rem"};
  }
`;

function RangeCalendar({ defaultMonth, selected, ...rest }) {
  return (
    <StyledDayPicker
      animate
      navLayout="around"
      captionLayout="dropdown"
      mode="range"
      weekStartsOn={0}
      locale={zhTW}
      defaultMonth={normalizeCalendarDate(defaultMonth)}
      selected={
        selected
          ? {
              from: normalizeCalendarDate(selected.from),
              to: normalizeCalendarDate(selected.to),
            }
          : ""
      }
      {...rest}
    />
  );
}

export default RangeCalendar;
