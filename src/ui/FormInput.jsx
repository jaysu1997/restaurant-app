import styled from "styled-components";

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ddd;
  height: 3.8rem;
  border-radius: 4px;
  overflow: hidden;

  &:hover {
    border-color: #b3b3b3;
  }

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

  background-color: ${({ $isDisabled }) =>
    $isDisabled ? "rgba(239, 239, 239, 0.3)" : "#fff"};

  button {
    width: 1.8rem;
    height: 1.8rem;
  }

  svg {
    height: 100%;
    width: 100%;
    color: #374151;
  }
`;

function FormInput({ id, type = "text", disabled, button, ...rest }) {
  return (
    <InputWrapper>
      <Input
        id={id}
        type={type}
        disabled={disabled}
        // 這裡通常是用來放入RHF的props
        {...rest}
      />
      {button?.icon && (
        <IconButton $isDisabled={disabled}>
          <button type="button" onClick={button?.action} disabled={disabled}>
            {button?.icon}
          </button>
        </IconButton>
      )}
    </InputWrapper>
  );
}

export default FormInput;
