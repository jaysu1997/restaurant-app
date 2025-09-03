// 表單的fieldset ui元件
import styled from "styled-components";
import FormErrorsMessage from "./FormErrorsMessage";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const Fieldset = styled.fieldset`
  width: 100%;
  height: min-content;
  border-radius: 6px;
  border: 2px solid rgba(0, 0, 0, 0.6);
  background-color: #fff;

  &:focus-within {
    border: 2px solid #3b82f6;
  }

  &:focus-within legend {
    color: #3b82f6;
  }
`;

const Legend = styled.legend`
  font-size: 1.4rem;
  padding: 0;
  margin-left: 0.8rem;
  color: rgba(0, 0, 0, 0.6);
`;

const Field = styled.div`
  max-width: 100%;
`;

function FormFieldset({ legendValue = null, fieldName = null, children }) {
  return (
    <Wrapper>
      <Fieldset>
        {legendValue && <Legend>{legendValue}</Legend>}
        <Field>{children}</Field>
      </Fieldset>
      {fieldName && <FormErrorsMessage errors={fieldName} />}
    </Wrapper>
  );
}

export default FormFieldset;
