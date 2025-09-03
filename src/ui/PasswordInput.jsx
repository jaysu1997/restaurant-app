import { forwardRef, useState } from "react";
import styled from "styled-components";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

const Wrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  font-size: 1.4rem;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 6px;
  width: 100%;

  &:focus {
    border-color: transparent;
    outline: 2px solid #3b82f6;
  }
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 1rem;
  z-index: 1;
  display: flex;
  align-items: center;
`;

const PasswordInput = forwardRef(({ ...rest }, ref) => {
  console.log(rest);
  const [isHidden, setIsHidden] = useState(true);

  return (
    <Wrapper>
      <Input ref={ref} type={isHidden ? "password" : "text"} {...rest} />
      <ToggleButton type="button" onClick={() => setIsHidden((prev) => !prev)}>
        {isHidden ? <HiEye size={18} /> : <HiEyeSlash size={18} />}
      </ToggleButton>
    </Wrapper>
  );
});

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
