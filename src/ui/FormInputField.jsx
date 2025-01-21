// 表單的輸入框ui元件

import { forwardRef } from "react";
import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  background-color: #ffffff;
  font-size: 1.4rem;
  font-weight: 400;
  padding: 0 0.8rem;
  border: none;
  height: 3.6rem;
  border-radius: 6px;

  &:focus {
    outline: none;
  }
`;

const Fieldset = styled.fieldset`
  width: 100%;
  height: min-content;
  border-radius: 6px;
  border: 2px solid rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;

  &:focus-within {
    border: none;
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
