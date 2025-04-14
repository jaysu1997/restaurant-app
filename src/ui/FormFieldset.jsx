// 表單的fieldset ui元件
import styled from "styled-components";

const Fieldset = styled.fieldset`
  width: 100%;
  height: min-content;
  border-radius: 6px;
  border: 2px solid rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;

  &:focus-within {
    border: 2px solid #3b82f6;
  }

  &:focus-within legend {
    color: #3b82f6;
  }
`;

const Legend = styled.legend`
  font-size: 1.4rem;
  padding: 0;
  margin-left: 0.8rem;
  color: rgba(0, 0, 0, 0.6);
`;

function FormFieldset({ legendValue = "", children }) {
  return (
    <Fieldset>
      {legendValue && <Legend>{legendValue}</Legend>}
      {children}
    </Fieldset>
  );
}

export default FormFieldset;
