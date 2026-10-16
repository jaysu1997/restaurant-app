import * as styled from "styled-components";

export const GlobalStyles = styled.createGlobalStyle`
  /* 以下的設定，可能有命名需要修正的，也有可能可以替換合併使用的，而且好像有些根本沒用到? */
  :root {
    --color-brand: #2563eb;
    --color-brand-hover: #1d4ed8;
    --color-brand-subtle: #eff6ff;
    --color-info: #3b82f6;
    --color-control-active: #007bff;
    --color-danger-strong: #e11d48;
    --color-focus: #2684ff;
    --color-focus-ring: rgba(38, 132, 255, 0.2);

    --color-text-primary: #1f2937;
    --color-text-strong: #111827;
    --color-text-secondary: #374151;
    --color-text-tertiary: #4b5563;
    --color-text-slate: #475569;
    --color-text-slate-muted: #64748b;
    --color-text-slate-strong: #1e293b;
    --color-text-muted: #6b7280;
    --color-text-placeholder: #9ca3af;
    --color-text-disabled: #d1d5db;

    --color-surface: #fff;
    --color-background: #f9fafb;
    --color-background-rgb: 249, 250, 251;
    --color-surface-subtle: #f3f4f6;
    --color-border: #e5e7eb;
    --color-border-strong: #d1d5db;
    --color-border-subtle: #e3e5e7;
    --color-border-slate: #e2e8f0;
    --color-border-hover: #b3b3b3;
    --color-danger-border: #fecaca;

    --color-success: #16a34a;
    --color-success-subtle: #f0fdf4;
    --color-success-text: #166534;
    --color-warning: #f59e0b;
    --color-warning-subtle: #fff7ed;
    --color-warning-text: #9a3412;
    --color-danger: #dc2626;
    --color-danger-subtle: #fef2f2;
    --color-danger-text: #b91c1c;

    --shadow-focus-control: 0 0 0 3px rgba(38, 132, 255, 0.15);
    --shadow-focus-error: 0 0 0 3px rgba(220, 38, 38, 0.15);

    --font-family-base: "Noto Sans TC", sans-serif;
    --font-size-xs: 1.2rem;
    --font-size-sm: 1.4rem;
    --font-size-base: 1.6rem;
    --font-size-lg: 2rem;
    --font-size-xl: 2.4rem;
    --font-weight-regular: 400;
    --font-weight-medium: 500;
    --font-weight-semibold: 600;
    --font-weight-bold: 700;
    --line-height-base: 1.5;

    --space-0-5: 0.2rem;
    --space-1: 0.4rem;
    --space-1-5: 0.6rem;
    --space-2: 0.8rem;
    --space-2-5: 1rem;
    --space-3: 1.2rem;
    --space-3-5: 1.4rem;
    --space-4: 1.6rem;
    --space-5: 2rem;
    --space-6: 2.4rem;
    --space-7: 2.8rem;
    --space-8: 3.2rem;
    --space-9: 3.6rem;
    --space-10: 4rem;
    --space-11: 4.8rem;
    --space-12: 5.6rem;

    --radius-sm: 4px;
    --radius-md: 6px;
    --radius-lg: 8px;
    --radius-xl: 12px;
    --radius-2xl: 20px;
    --radius-full: 999px;

    --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.06);
    --shadow-md: 0 4px 12px rgba(15, 23, 42, 0.04);
    --shadow-lg: 0 20px 48px rgba(15, 23, 42, 0.08);
    --shadow-tooltip: 0 8px 24px rgba(0, 0, 0, 0.08);
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
    font-family: var(--font-family-base);
    font-optical-sizing: auto;
    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-base);
    line-height: var(--line-height-base);
    color: var(--color-text-primary);
    background-color: var(--color-background);
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
    color: var(--color-text-placeholder);
    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-sm);
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
    user-select: none;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  svg {
    flex-shrink: 0;
  }

  :where(a, button):focus-visible {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
  }

  /* 覆蓋會自動以本地系統顏色(windows色彩)為勾選顏色的小問題 */
  input[type="radio"]:checked,
  input[type="checkbox"]:checked {
    accent-color: var(--color-brand);
  }

  /* 如果使用者在作業系統中設定「減少動畫」，網站就自動把動畫與轉場效果大幅降低 */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;
