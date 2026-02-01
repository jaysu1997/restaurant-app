import { useState } from "react";
import FormInput from "../ui/FormInput";
import { Eye, EyeClosed } from "lucide-react";

// 密碼input ui元件
function PasswordInput({ id, ...rest }) {
  const [isHidden, setIsHidden] = useState(true);
  const type = isHidden ? "password" : "text";

  return (
    <FormInput
      id={id}
      button={{
        icon: isHidden ? <EyeClosed /> : <Eye />,
        action: () => setIsHidden((prev) => !prev),
      }}
      type={type}
      {...rest}
    />
  );
}

export default PasswordInput;
