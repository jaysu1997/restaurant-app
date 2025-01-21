// 表單ui元件

import styled from "styled-components";

const FormTable = styled.form`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  max-width: 32rem;
  padding: 1.6rem;
  gap: 1.6rem;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 600;
  font-size: 1.4rem;
  transition: all 0.3s;
  background-color: transparent;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    max-width: 56rem;
  }
`;

export default FormTable;
