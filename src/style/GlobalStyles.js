import * as styled from "styled-components";

// focus-visiable需要設定
// focus color
// #2684ff

// &:focus-visible {
//   outline: 2px solid #93c5fd;
//   outline-offset: 2px;
//   border-radius: 2px;
// }

// 像是border-radius和border color這些或許建議都要做系統差異化。

// | 元件                               | 建議 Radius   | 理由                                            |
// | -------------------------------- | ----------- | --------------------------------------------- |
// | input、select            | **4px| 表單控制項通常不要太圓，看起來比較專業，也容易和內容區分。你目前維持 4px 我覺得很好。 |
// | textarea                         | **4px    | 和 input 保持一致。                                 |
// | 小型 popup (dropdown、context menu) | **8px   | 比 input 圓一點，看起來比較輕盈。                          |
// | Modal                    | **16px**    | 大面積容器圓角可以大一點，質感提升很多。                          |
// | 大型 Section Container             | **16px**    | Dashboard 卡片、白色區塊都很適。                        |
// | 小型資訊 Card                        | **12px**    | 不會太圓，又有現代感。                                   |
// | 商品圖片 Preview                     | **12px**    | 比 card 稍微圓一點，看起來舒服。                           |
// | Banner 圖                         | **16px**    | 大圖片通常會更大一點。                                   |
// | 一般 Button                        | **10~12px** | 現在很多網站都是這個範圍。                                 |
// | Hero CTA Button                  | **12~16px** | 「立即開始」、「加入購物車」這種主要按鈕可以更有份量。                   |
// | Tag、Badge                        | **999px**   | 做成膠囊。                                         |

export const GlobalStyles = styled.createGlobalStyle`
  :root {
    /* Layout & surface */
    --color-bg-canvas: #f9fafb; /* 頁面底色：整體背景、所有頁面主背景 */
    --color-bg-surface: #ffffff; /* 卡片、面板、modal、section 背景 */
    --color-bg-subtle: #f3f4f6; /* 次級區塊、hover、列表項背景 */
    --color-bg-muted: #f8fafc; /* 輕量資訊區塊、表格行背景 */

    /* Border */
    --color-border-default: #e5e7eb; /* 通用邊框：section、card、分隔線 */
    --color-border-strong: #d1d5db; /* 輸入框、選單邊框 */
    --color-border-contrast: #b3b3b3; /* hover 或強化狀態的邊框 */

    /* Text */
    --color-text-primary: #111827; /* 標題、重要內容文字 */
    --color-text-secondary: #374151; /* 一般內容文字 */
    --color-text-muted: #6b7280; /* 說明文字、輔助資訊 */
    --color-text-placeholder: #9ca3af; /* input / select placeholder */

    /* Brand */
    --color-brand-50: #eff6ff; /* 輕量選中背景 */
    --color-brand-100: #dbeafe; /* hover / active 背景 */
    --color-brand-600: #2563eb; /* 主要品牌色、主要按鈕、連結 */
    --color-brand-700: #1d4ed8; /* hover / pressed 狀態 */

    /* Status */
    --color-danger-50: #fef2f2; /* 錯誤背景、刪除操作 */
    --color-danger-600: #dc2626; /* 錯誤/刪除主要色 */
    --color-danger-700: #b91c1c; /* 錯誤 hover */
    --color-success-50: #f0fdf4; /* 成功背景 */
    --color-success-600: #16a34a; /* 成功主色 */
    --color-success-700: #15803d; /* 成功 hover */
    --color-warning-50: #fffbeb; /* 警告背景 */
    --color-warning-600: #f59e0b; /* 警告主色 */

    /* Radius */
    --radius-xs: 4px; /* input / select / textarea */
    --radius-sm: 6px; /* 小型 chip / tag / 小卡片 */
    --radius-md: 8px; /* 卡片、按鈕、dropdown */
    --radius-lg: 12px; /* 大區塊、section */
    --radius-xl: 16px; /* modal / large panel */
    --radius-full: 999px; /* pill / badge / circle icon */

    /* Spacing */
    --space-1: 0.4rem; /* 4px */
    --space-2: 0.8rem; /* 8px */
    --space-3: 1.2rem; /* 12px */
    --space-4: 1.6rem; /* 16px */
    --space-5: 2rem; /* 20px */
    --space-6: 2.4rem; /* 24px */
    --space-8: 3.2rem; /* 32px */
    --space-10: 4rem; /* 40px */

    /* Component sizes */
    --size-input-height: 3.8rem; /* 標準 input / select 高度 */
    --size-input-height-sm: 3.6rem; /* 小型 input 高度 */
    --size-button-height: 4rem; /* 一般按鈕高度 */
    --size-button-height-sm: 3.2rem; /* 小型按鈕高度 */
    --size-button-height-lg: 4.8rem; /* CTA / 主要操作按鈕高度 */

    /* Shadow */
    --shadow-sm: 0 1px 2px rgba(15, 23, 42, 0.06); /* 輕卡片陰影：小卡片、次級區塊 */
    --shadow-md: 0 8px 24px rgba(15, 23, 42, 0.08); /* 卡片 / dropdown：一般交互層 */
    --shadow-lg: 0 16px 40px rgba(15, 23, 42, 0.12); /* modal / major surface：重要浮層 */
    --shadow-focus: 0 0 0 3px rgba(37, 99, 235, 0.18); /* focus ring：input / button focus */

    /* Font size */
    --font-size-xs: 1.2rem; /* 小標籤、輔助資訊 */
    --font-size-sm: 1.3rem; /* 輔助說明、提示文字 */
    --font-size-md: 1.4rem; /* 表單文字、一般內容 */
    --font-size-lg: 1.6rem; /* body 文字、主要內容 */
    --font-size-xl: 2rem; /* 卡片標題、區塊標題 */
    --font-size-2xl: 2.2rem; /* section title */
    --font-size-3xl: 2.8rem; /* page hero title */

    /* Font weight */
    --font-weight-regular: 400; /* 一般內容、說明文字 */
    --font-weight-medium: 500; /* 按鈕、次級強調 */
    --font-weight-semibold: 600; /* 次要標題、強調內容 */
    --font-weight-bold: 700; /* 標題、重要內容 */

    /* Transition */
    --transition-fast: 0.2s ease;
    --transition-medium: 0.25s ease;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html {
    font-size: 62.5%;
    scrollbar-gutter: stable;
  }

  body {
    font-family: "Noto Sans TC", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 1.5;
    color: #1f2937;
    background-color: #f9fafb;
    min-height: 100dvh;
    overflow-y: auto;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 700;
  }

  input,
  textarea,
  select,
  button {
    font: inherit;
  }

  input::placeholder,
  textarea::placeholder {
    color: #9ca3af;
    font-weight: 400;
  }

  img,
  svg {
    display: block;
    max-width: 100%;
  }

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;
    border: none;
    background-color: transparent;
    font: inherit;
    user-select: none;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  svg {
    flex-shrink: 0;
  }

  input {
    outline: none;
    border: none;
  }

  /* 覆蓋會自動以本地系統顏色(windows色彩)為勾選顏色的小問題 */
  input[type="radio"]:checked,
  input[type="checkbox"]:checked {
    accent-color: #2563eb;
  }

  .icon-sm {
    width: 1.4rem;
    height: 1.4rem;
  }

  .icon-md {
    width: 1.6rem;
    height: 1.6rem;
  }

  .icon-lg {
    width: 2rem;
    height: 2rem;
  }

  .icon-xl {
    width: 2.4rem;
    height: 2.4rem;
  }
`;
