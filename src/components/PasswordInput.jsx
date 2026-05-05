import { useState } from "react";
import FormInput from "../ui/FormInput";
import { Eye, EyeClosed } from "lucide-react";

// 密碼input ui元件
function PasswordInput({ id, ...rest }) {
  const [showPassword, setShowPassword] = useState(false);
  const type = showPassword ? "text" : "password";

  return (
    <FormInput
      id={id}
      button={{
        icon: showPassword ? <Eye /> : <EyeClosed />,
        action: () => setShowPassword((prev) => !prev),
      }}
      type={type}
      {...rest}
    />
  );
}

export default PasswordInput;
