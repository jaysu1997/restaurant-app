import styled from "styled-components";

const StyledFormInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ddd;
  height: 3.8rem;
  border-radius: 4px;
  overflow: hidden;

  &:focus-within {
    border-color: #2684ff;
    box-shadow: 0 0 0 1px #2684ff;
  }
`;

const Input = styled.input`
  font-size: 1.4rem;
  font-weight: 400;
  padding: 0.2rem 0.8rem;
  height: 100%;
  flex: 1;
  min-width: 0px;
`;

const IconButton = styled.div`
  height: 3.6rem;
  width: 3.6rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  background-color: ${({ $disabled }) =>
    $disabled ? "rgba(239, 239, 239, 0.3)" : "#fff"};

  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "default")};

  button {
    width: 2rem;
    height: 2rem;
  }

  svg {
    height: 100%;
    width: 100%;
  }
`;

const ErrorMessage = styled.p`
  color: #ff3333;
  padding: 0 0.6rem;
  font-size: 1.3rem;
  font-weight: 500;
  min-height: 2rem;
`;

// 通用input + error message ui
function FormInput({ label, id, button, type, disabled, errors, ...rest }) {
  return (
    <StyledFormInput>
      <label htmlFor={id}>{label}</label>
      <InputWrapper>
        <Input
          id={id}
          type={type === "number" ? "text" : type}
          disabled={disabled}
          {...rest}
        />
        {button?.icon && (
          <IconButton $disabled={disabled}>
            <button type="button" onClick={button?.action}>
              {button?.icon}
            </button>
          </IconButton>
        )}
      </InputWrapper>
      <ErrorMessage>{errors?.message}</ErrorMessage>
    </StyledFormInput>
  );
}

export default FormInput;
