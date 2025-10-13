import { useState } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import FormInput from "../ui/FormInput";

// 密碼input ui元件
function PasswordInput({ errors, ...rest }) {
  const [isHidden, setIsHidden] = useState(true);
  const type = isHidden ? "password" : "text";

  return (
    <FormInput
      icon={isHidden ? <HiEyeSlash /> : <HiEye />}
      action={() => setIsHidden((prev) => !prev)}
      type={type}
      errors={errors}
      {...rest}
    />
  );
}

export default PasswordInput;
