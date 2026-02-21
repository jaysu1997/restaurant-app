import { useEffect, useState } from "react";
// RWD的監聽(用來控制元件RWD動畫)
function useMediaQuery(query, onClose) {
  const [isMatched, setIsMatched] = useState(
    () => window.matchMedia(`(max-width: ${query}em)`).matches,
  );

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${query}em)`);

    function handler() {
      setIsMatched(media.matches);
      // 當寬度超過斷點時自動將isOpen設為關閉
      if (!media.matches) onClose();
    }

    media.addEventListener("change", handler);

    return () => media.removeEventListener("change", handler);
  }, [query, onClose]);

  // 回傳是否在RWD斷點範圍內
  return isMatched;
}

export default useMediaQuery;
