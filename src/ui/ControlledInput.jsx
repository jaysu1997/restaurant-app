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

function ControlledInput({ control, name, rules, ...rest }) {
  const { field } = useController({ name, control, rules });
  return <Input {...field} {...rest} />;
}

export default ControlledInput;
