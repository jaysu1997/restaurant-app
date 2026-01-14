// 表單文本ui元件

import styled, { css } from "styled-components";

const type = {
  description: css`
    grid-column: 1 / -1;
    font-size: 1.4rem;
    line-height: 1.5;
    font-weight: 400;
    color: #6d6d6d;
  `,
  highlight: css`
    color: red;
  `,
  title: css`
    font-size: 2.2rem;
    font-weight: 600;
    color: #333333;
  `,
  subTitle: css`
    color: #6366f1;
    font-size: 1.8rem;
    border-bottom: 2px solid #6366f1;
  `,
  nestedTitle: css`
    color: #3b82f6;
    font-size: 1.6rem;
  `,
};

const FormTypography = styled.span`
  ${({ $titleStyle = "title" }) => type[$titleStyle]}
`;

export default FormTypography;
