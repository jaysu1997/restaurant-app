// 用來處理點擊外部關閉popup的功能
import { useEffect } from "react";

function useClickOutside(ref, enabled = true, onClose) {
  useEffect(() => {
    if (!enabled) return;

    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    }

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref, enabled, onClose]);
}

export default useClickOutside;
