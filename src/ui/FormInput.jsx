import styled from "styled-components";

const StyledFormInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ddd;
  height: 3.8rem;
  border-radius: 6px;
  overflow: hidden;

  &:focus-within {
    border-color: transparent;
    outline: 2px solid #3b82f6;
  }
`;

const Input = styled.input`
  font-size: 1.4rem;
  font-weight: 400;
  padding: 0.2rem 0.8rem;
  height: 100%;
  flex: 1;
`;

const IconButton = styled.div`
  width: 3.6rem;
  height: 3.6rem;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  button {
    width: 20px;
    height: 20px;
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
function FormInput({ icon, action, errors, ...rest }) {
  return (
    <StyledFormInput>
      <InputWrapper>
        <Input {...rest} />
        {icon && (
          <IconButton>
            <button type="button" onClick={action}>
              {icon}
            </button>
          </IconButton>
        )}
      </InputWrapper>
      <ErrorMessage>{errors?.message}</ErrorMessage>
    </StyledFormInput>
  );
}

export default FormInput;
