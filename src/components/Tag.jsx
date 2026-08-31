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
    color: #4b5563;
    background-color: #f3f4f6;
  `,
  已完成: css`
    color: #1d4ed8;
    background-color: #eff6ff;
  `,
  已付款: css`
    color: #15803d;
    background-color: #f0fdf4;
  `,
  未付款: css`
    color: #b91c1c;
    background-color: #fef2f2;
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
  padding: 0 1.2rem;
  border-radius: 999px;
  font-size: 1.2rem;
  font-weight: 700;
  gap: 0.2rem;

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
