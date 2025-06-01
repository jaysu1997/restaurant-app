import { useState } from "react";

function Homepage() {
  const [value, setValue] = useState(0);
  return (
    <form>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button>submit</button>
    </form>
  );
}

export default Homepage;
