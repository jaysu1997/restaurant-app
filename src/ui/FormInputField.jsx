// 表單的輸入框ui元件

import { forwardRef } from "react";
import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  background-color: #ffffff;
  border-radius: 6px;
  font-size: 1.4rem;
  font-weight: 400;
  padding: 0 1rem;
  border: none;
  outline: none;
  height: 3.6rem;
`;

const Fieldset = styled.fieldset`
  width: 100%;
  height: min-content;
  border-radius: 6px;
  border: 2px solid rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  background-color: #ffffff;

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
  margin-left: 1rem;
  color: rgba(0, 0, 0, 0.6);
`;

// 需要藉由forwardRef解決error訊息
export const InputField = forwardRef(function InputField(
  { legendValue, children, ...restProps },
  ref
) {
  // 有children就展示children，沒有則顯示Input
  return (
    <Fieldset>
      {legendValue && <Legend>{legendValue}</Legend>}
      {children ? children : <Input {...restProps} ref={ref} />}
    </Fieldset>
  );
});

export default InputField;
