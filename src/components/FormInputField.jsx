import BaseInput from "./BaseInput";
import FormFieldLayout from "./FormFieldLayout";
import { get, useFormContext } from "react-hook-form";

function FormInputField({ label, name, rules = {}, ...rest }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = get(errors, name);

  return (
    <FormFieldLayout id={name} label={label} error={error}>
      <BaseInput
        id={name}
        error={error}
        {...register(name, {
          ...rules,
        })}
        {...rest}
      />
    </FormFieldLayout>
  );
}

export default FormInputField;
