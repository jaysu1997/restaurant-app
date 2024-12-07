// 表單列ui元件

import styled, { css } from "styled-components";

const type = {
  oneColumn: css`
    border: 1px solid #d6d3d1;
    border-radius: 6px;
    gap: 1.4rem;
    padding: 1.4rem;
    flex-direction: column;
  `,
  twoColumn: css`
    border: 1px solid #d6d3d1;
    border-radius: 6px;
    gap: 1.4rem;
    padding: 1.4rem;
    flex-direction: column;

    @media (min-width: 768px) {
      grid-column: 1 / -1;
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  `,
  sub: css`
    background-color: #f5f5f4;
    border: 1px dashed #d6d3d1;
    border-radius: 6px;
    gap: 1.4rem;
    padding: 1.4rem;
    flex-direction: column;
  `,
  nested: css`
    padding-left: 1.6rem;
    gap: 0.6rem;
    margin-top: 1.2rem;
    flex-direction: column;
  `,
  subHeader: css`
    justify-content: space-between;
    align-items: center;
  `,
  footer: css`
    grid-column: 1 / -1;
    justify-content: end;
    gap: 1.6rem;
    padding: 0.6rem 1.2rem;
  `,
};

const FormRow = styled.div`
  display: flex;

  ${({ $formRowStyle = "oneColumn" }) => type[$formRowStyle]}
`;

export default FormRow;
