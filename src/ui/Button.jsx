// 按鈕UI元件

import styled, { css } from "styled-components";

const type = {
  submit: css`
    width: 6.4rem;
    height: 3.2rem;
    border-radius: 50px;
    font-size: 1.4rem;
    font-weight: 600;
    padding: 0.6rem 1.2rem;
    background-color: #1d4ed8;
    color: #fff;
    box-shadow: 0 0px 15px 2px rgba(96, 165, 250, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      background-color: #3b82f6;
    }
  `,
  cancel: css`
    width: 6.4rem;
    height: 3.2rem;
    border-radius: 999px;
    font-size: 1.4rem;
    font-weight: 600;
    padding: 0.6rem 1.2rem;
    border: 1px solid rgba(0, 0, 0, 0.15);
    color: rgba(0, 0, 0, 0.75);
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
  `,
  remove: css`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: fit-content;
    height: fit-content;
    padding: 0.6rem;
    color: #4b5563;

    svg {
      height: 1.4rem;
      width: 1.4rem;
    }

    &:hover {
      background-color: #e5e7eb;
    }
  `,
  add: css`
    grid-column: 1 / -1;
    width: fit-content;
    height: fit-content;
    border-radius: 10px;
    background-color: #059669;
    color: #f8fafc;
    padding: 0.4rem 0.8rem;
    font-weight: 600;
    font-size: 1.2rem;

    svg {
      font-size: 1.4rem;
    }

    &:hover {
      box-shadow: 0px 0px 10px 1px rgba(5, 150, 105, 0.35);
    }
  `,
  createNewItem: css`
    background-color: #fff;
    border: 1px solid #3b82f6;
    font-size: 1.4rem;
    font-weight: 600;
    padding: 0.4rem 0.8rem;
    height: 3.6rem;
    display: flex;
    justify-content: start;
    align-items: center;
    color: #3b82f6;
    gap: 0.2rem;
    width: fit-content;
    border-radius: 50px;

    svg {
      height: 2rem;
      width: 2rem;
    }

    &:hover {
      background-color: #3b82f6;
      color: #fff;
    }
  `,
  confirmDelete: css`
    width: 6.4rem;
    height: 3.2rem;
    border-radius: 999px;
    box-shadow: 0px 2px 20px 2px rgba(220, 38, 38, 0.3);
    font-size: 1.4rem;
    padding: 0.6rem 1.2rem;
    color: #eef2ff;
    font-weight: 600;
    background-color: #b91c1c;

    &:not(:disabled):hover {
      background-color: #dc2626;
    }
  `,
};

const Button = styled.button`
  ${({ $buttonStyle = "cancel" }) => type[$buttonStyle]}
`;

export default Button;
