// 表格的狀態標籤ui
import styled, { css } from "styled-components";

const tagStyles = {
  準備中: css`
    background-color: #e0e0e0;
    color: #333;
  `,
  待取餐: css`
    background-color: #e9ddf7;
    color: #5c2e91;
  `,
  已交付: css`
    background-color: #d9f2e3;
    color: #0f703c;
  `,
  未付款: css`
    background-color: #fde8e4;
    color: #c03b00;
  `,
  已付款: css`
    background-color: #d6e8ff;
    color: #0052b3;
  `,
};

const Tag = styled.span`
  display: inline-block;
  padding: 0.4rem 1.2rem;
  font-size: 1.4rem;
  font-weight: 700;
  border-radius: 12px;

  ${(props) => tagStyles[props.$tagStatus] || tagStyles["準備中"]}

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export default Tag;
