// react hook form 受控input欄位
import { useController } from "react-hook-form";
import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  background-color: #fff;
  font-size: 1.4rem;
  font-weight: 400;
  padding: 0 0.8rem;
  height: 3.6rem;
  border-radius: 6px;
`;

function ControlledInput({ control, name, rules, type, placeholder }) {
  const { field } = useController({ name, control, rules });

  // 使用Controller後，RHF提供的valueAsNumber好像會失效，所以必須使用onChange手動轉換value型別
  return (
    <Input
      {...field}
      type={type}
      placeholder={placeholder}
      value={field.value}
      onChange={(e) => {
        const finalValue =
          type === "number" && e.target.value !== ""
            ? Number(e.target.value)
            : e.target.value;

        field.onChange(finalValue);
      }}
    />
  );
}

export default ControlledInput;
