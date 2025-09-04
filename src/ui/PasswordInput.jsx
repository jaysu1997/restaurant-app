import { useState } from "react";
import styled from "styled-components";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

const Wrapper = styled.div`
  position: relative;
`;

// 這個沒用到，但或許可以變成Wrapper底下的input{}樣式
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

// 密碼input ui元件
function PasswordInput({ render }) {
  const [isHidden, setIsHidden] = useState(true);
  const type = isHidden ? "password" : "text";

  return (
    <Wrapper>
      {render(type)}
      <ToggleButton type="button" onClick={() => setIsHidden((prev) => !prev)}>
        {isHidden ? <HiEyeSlash size={18} /> : <HiEye size={18} />}
      </ToggleButton>
    </Wrapper>
  );
}

export default PasswordInput;
