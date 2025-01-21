import { useState } from "react";

function Homepage() {
  const [value, setValue] = useState(0);
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export default Homepage;
