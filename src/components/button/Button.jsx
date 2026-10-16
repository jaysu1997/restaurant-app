import styled, { css } from "styled-components";
import { hoverStyles } from "../../style/helpers";

const variant = {
  primary: css`
    color: var(--color-surface);
    background-color: var(--color-brand);

    ${hoverStyles(css`
      background-color: var(--color-brand-hover);
    `)}
  `,
  secondary: css`
    color: var(--color-brand);
    background: var(--color-surface);
    border: 1px solid #dbe4f0;

    ${hoverStyles(css`
      background: #f8fbff;
      border-color: #93c5fd;
    `)}
  `,
  outline: css`
    color: var(--color-text-secondary);
    background-color: var(--color-surface);
    border-color: var(--color-border-strong);

    ${hoverStyles(css`
      background-color: var(--color-background);
    `)}

    &:disabled {
      background-color: var(--color-background);
    }
  `,
  danger: css`
    color: var(--color-surface);
    background-color: var(--color-danger);

    ${hoverStyles(css`
      background-color: var(--color-danger-text);
    `)}
  `,
  ghost: css`
    color: var(--color-text-tertiary);
    border: none;
    padding: var(--space-1-5);
    height: 2.6rem;

    & svg {
      width: 1.4rem;
      height: 1.4rem;
    }

    ${hoverStyles(css`
      background-color: var(--color-surface-subtle);
    `)}
  `,
  plain: css`
    color: var(--color-text-muted);
    border: none;
  `,
};

const Button = styled.button.attrs((props) => ({
  type: props.type || "button",
}))`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-1-5);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  border: 1px solid transparent;
  border-radius: var(--radius-full);
  padding: var(--space-2) var(--space-5);
  height: 4rem;
  min-width: max-content;

  transition:
    color 0.2s ease,
    background-color 0.2s ease,
    border-color 0.2s ease;

  &:disabled {
    cursor: not-allowed;
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
  }

  ${({ $variant }) => variant[$variant || "primary"]}
`;

export default Button;
