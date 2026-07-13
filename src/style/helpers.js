import { css } from "styled-components";

// 只有非觸控裝置 + 非disabled才可套用hover效果
export const hoverStyles = (styles) => css`
  @media (hover: hover) and (pointer: fine) {
    &:not(:disabled):hover {
      ${styles}
    }
  }
`;
