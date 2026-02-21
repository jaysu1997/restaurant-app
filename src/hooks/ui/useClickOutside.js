// 用來處理點擊外部關閉Modal或popup的功能
import { useEffect } from "react";

function useClickOutside(ref, isOpen, onClose) {
  useEffect(() => {
    if (!isOpen) return;

    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    }

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref, isOpen, onClose]);
}

export default useClickOutside;
