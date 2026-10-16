// ok
// 表格的狀態標籤ui
import { ClipboardClock, ClipboardCheck, Check, X } from "lucide-react";
import styled, { css } from "styled-components";

const tagIcons = {
  準備中: ClipboardClock,
  已完成: ClipboardCheck,
  已付款: Check,
  未付款: X,
};

const tagStyles = {
  準備中: css`
    color: var(--color-text-tertiary);
    background-color: var(--color-surface-subtle);
  `,
  已完成: css`
    color: var(--color-brand-hover);
    background-color: var(--color-brand-subtle);
  `,
  已付款: css`
    color: #15803d;
    background-color: var(--color-success-subtle);
  `,
  未付款: css`
    color: var(--color-danger-text);
    background-color: var(--color-danger-subtle);
  `,
  內用: css`
    color: #6d28d9;
    background-color: transparent;
    border: 1px solid #c4b5fd;
  `,
  外帶: css`
    color: #c2410c;
    background-color: transparent;
    border: 1px solid #fed7aa;
  `,
};

const StyledTag = styled.span`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: 2.8rem;
  padding: 0 var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  gap: var(--space-0-5);

  ${({ $status }) => tagStyles[$status] || tagStyles["準備中"]}

  svg {
    width: 1.4rem;
    height: 1.4rem;
  }
`;

function Tag({ $status }) {
  const Icon = tagIcons[$status];
  return (
    <StyledTag $status={$status}>
      {Icon && <Icon />}
      {$status}
    </StyledTag>
  );
}

export default Tag;
