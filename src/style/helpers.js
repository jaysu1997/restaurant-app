import { css } from "styled-components";

// 只有非觸控裝置 + 非disabled才可套用hover效果
export const hoverStyles = (styles) => css`
  @media (hover: hover) and (pointer: fine) {
    &:not(:disabled):hover {
      ${styles}
    }
  }
`;

// 覆蓋部分不適合使用通用focus樣式的地方
export const insetFocusVisible = css`
  outline: 2px solid var(--color-focus);
  outline-offset: -2px;
`;

// focus樣式(好像有很多地方可以使用這個替換，但是可能忘記使用了，上面那個也是)
export const focusRingStyles = css`
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
  /* box-shadow: 0 0 0 3px var(--color-focus-ring); */
`;
