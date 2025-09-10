// react hook form 受控input欄位
import { useController } from "react-hook-form";
import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  background-color: #fff;
  font-size: 1.4rem;
  font-weight: 400;
  padding: 0 0.8rem;
  height: 3.8rem;
  border-radius: 6px;

  /* &:focus {
    border-color: #2684ff;
    box-shadow: 0 0 0 1px #2684ff;
  } */
`;

function ControlledInput({ control, id, name, rules, type, placeholder }) {
  const { field } = useController({ name, control, rules });

  // 使用Controller後，RHF提供的valueAsNumber好像會失效，所以必須使用onChange手動轉換value型別
  return (
    <Input
      {...field}
      id={id}
      type={type === "number" ? "text" : type}
      placeholder={placeholder}
      // 一開始沒獲得值會因為undefined而跳出非受控與受控元件切換的錯誤訊息，所以先加上一個空字串(這個或許可以不用)
      value={field.value}
      onChange={(e) => {
        const finalValue =
          type === "number" || type === "tel"
            ? e.target.value.replace(/\D/g, "")
            : e.target.value;

        field.onChange(finalValue);
      }}
    />
  );
}

export default ControlledInput;
