import styled from "styled-components";
import { DayPicker } from "react-day-picker";
import { zhTW } from "react-day-picker/locale";

const StyledDayPicker = styled(DayPicker)`
  --rdp-accent-color: #6366f1;
  --rdp-range_middle-background-color: #e0e7ff;

  width: 100%;

  font-size: 1.3rem;
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

  .rdp-dropdown {
    cursor: pointer;
  }

  .rdp-chevron {
    fill: #1d4ed8;
    width: 1.8rem;
    height: 1.8rem;
  }

  /* 左右移動按鈕 */
  [class^="rdp-button_"] {
    width: 2.75rem;
    height: 2.75rem;
  }

  /* 左右移動按鈕hover效果 */
  [class^="rdp-button_"]:not([aria-disabled="true"]):hover {
    background-color: #dbeafe;
    border-radius: 50%;
  }

  /* :hover日期的效果 */
  .rdp-day:not(.rdp-selected):not(.rdp-disabled):hover .rdp-day_button {
    border: 2px dashed #818cf8;
  }

  /* 隨著容器寬度調整日期的尺寸 */
  [class^="rdp-day"] {
    width: ${({ $cellSize }) => ($cellSize ? `${$cellSize}px` : "3.8rem")};
    height: ${({ $cellSize }) => ($cellSize ? `${$cellSize}px` : "3.8rem")};
  }
`;

function StyledDayRangePicker({ ...rest }) {
  return (
    <StyledDayPicker
      animate
      navLayout="around"
      captionLayout="dropdown"
      mode="range"
      weekStartsOn={0}
      locale={zhTW}
      {...rest}
    />
  );
}

export default StyledDayRangePicker;
