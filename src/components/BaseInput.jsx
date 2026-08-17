import styled, { css } from "styled-components";
import { hoverStyles } from "../style/helpers";

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  overflow: hidden;
  height: 4.2rem;
  border-radius: 8px;
  border: 1px solid ${({ $isError }) => ($isError ? "#dc2626" : "#d1d5db")};
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  ${hoverStyles(css`
    &:not(:focus-within) {
      ${({ $isError }) =>
        !$isError &&
        css`
          border-color: #b3b3b3;
        `}
    }
  `)}

  &:focus-within {
    ${({ $isError }) =>
      $isError
        ? css`
            box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15);
          `
        : css`
            border-color: #2684ff;
            box-shadow: 0 0 0 3px rgba(38, 132, 255, 0.15);
          `}
  }
`;

const Input = styled.input`
  font-size: 1.4rem;
  font-weight: 400;
  padding: 0.2rem 1rem;
  height: 100%;
  flex: 1;
  min-width: 0px;
`;

const EndAdornment = styled.div`
  height: 100%;
  aspect-ratio: 1 / 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;

  button {
    width: 1.8rem;
    height: 1.8rem;
  }

  svg {
    height: 100%;
    width: 100%;
    color: #6b7280;

    ${hoverStyles(css`
      color: #111827;
    `)}
  }
`;

function BaseInput({ endAdornment = null, type = "text", error, ...rest }) {
  return (
    <InputWrapper $isError={!!error}>
      <Input
        type={type}
        // 這裡通常是用來放入RHF的props和input的原生屬性
        {...rest}
      />

      {endAdornment && <EndAdornment>{endAdornment}</EndAdornment>}
    </InputWrapper>
  );
}

export default BaseInput;
