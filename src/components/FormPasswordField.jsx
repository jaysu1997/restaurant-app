import { useState } from "react";
import FormInputField from "./FormInputField";
import { Eye, EyeClosed } from "lucide-react";

function FormPasswordField({ label, name, ...rest }) {
  const [showPassword, setShowPassword] = useState(false);
  const type = showPassword ? "text" : "password";

  return (
    <FormInputField
      label={label}
      name={name}
      type={type}
      endAdornment={
        <button type="button" onClick={() => setShowPassword((prev) => !prev)}>
          {showPassword ? <Eye /> : <EyeClosed />}
        </button>
      }
      {...rest}
    />
  );
}

export default FormPasswordField;
