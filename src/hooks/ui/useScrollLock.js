import { useEffect } from "react";

function lockScroll(locked) {
  document.documentElement.style.overflowY = locked ? "hidden" : "scroll";
}

function useScrollLock(breakPoint, isOpen, onClose, mode = "conditional") {
  useEffect(() => {
    // 當前裝置的寬度低於斷點，且元件處於開啟狀態才會套用滾軸鎖定
    const mediaQuery = window.matchMedia(`(width > ${breakPoint}em)`);

    if (isOpen) {
      if (mode === "always" || !mediaQuery.matches) {
        lockScroll(isOpen);
      }
    }

    function handleMediaChange(e) {
      const isMatched = e.matches;

      if (isOpen && !isMatched) {
        lockScroll(isOpen);
      }

      if (isMatched && isOpen) {
        lockScroll(false);
        onClose();
      }
    }

    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      lockScroll(false);
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, [breakPoint, isOpen, onClose, mode]);
}

export default useScrollLock;
