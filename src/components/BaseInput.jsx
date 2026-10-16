import styled, { css } from "styled-components";
import { hoverStyles } from "../style/helpers";

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--color-surface);
  overflow: hidden;
  height: 4.2rem;
  border-radius: var(--radius-lg);
  border: 1px solid
    ${({ $isError }) =>
      $isError ? "var(--color-danger)" : "var(--color-border-strong)"};
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  ${hoverStyles(css`
    &:not(:focus-within) {
      ${({ $isError }) =>
        !$isError &&
        css`
          border-color: var(--color-border-hover);
        `}
    }
  `)}

  &:focus-within {
    ${({ $isError }) =>
      $isError
        ? css`
            box-shadow: var(--shadow-focus-error);
          `
        : css`
            border-color: var(--color-focus);
            box-shadow: var(--shadow-focus-control);
          `}
  }
`;

const Input = styled.input`
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-regular);
  padding: var(--space-0-5) var(--space-2-5);
  height: 100%;
  flex: 1;
  min-width: 0px;
  border: none;
  outline: none;
`;

const EndAdornment = styled.div`
  height: 100%;
  aspect-ratio: 1 / 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-surface);

  button {
    width: 1.8rem;
    height: 1.8rem;
  }

  svg {
    height: 100%;
    width: 100%;
    color: var(--color-text-muted);

    ${hoverStyles(css`
      color: var(--color-text-strong);
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
