import { useState } from "react";

function NumericInput() {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    // 過濾非阿拉伯數字
    const numeric = e.target.value.replace(/\D/g, "");
    setValue(numeric);
  };

  return (
    <input
      type="text"
      inputMode="numeric"
      value={value} // 受控元件
      onChange={handleChange}
    />
  );
}

export default NumericInput;
