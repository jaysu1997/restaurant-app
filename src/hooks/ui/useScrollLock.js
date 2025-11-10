import { useEffect } from "react";

function lockScroll(locked) {
  const isLocked = locked ? "hidden" : "scroll";
  document.documentElement.style.overflowY = isLocked;
}

function useScrollLock(breakPoint, isOpen, onClose) {
  useEffect(() => {
    lockScroll(isOpen);

    const mediaQuery = window.matchMedia(`(width > ${breakPoint}em)`);

    function handleMediaChange(e) {
      const isMatched = e.matches;
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
  }, [breakPoint, isOpen, onClose]);
}

export default useScrollLock;
