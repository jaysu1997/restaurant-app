import { useEffect, useRef } from "react";

function useRestoreFocus(onClose, enabled = true) {
  const triggerElementRef = useRef(null);

  useEffect(() => {
    if (!enabled || triggerElementRef.current) return;

    const target = document.activeElement;
    triggerElementRef.current = target instanceof HTMLElement ? target : null;
    triggerElementRef.current?.blur();
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    function handleKeyDown(e) {
      // esc按鍵關閉
      if (e.key === "Escape") {
        onClose();
        triggerElementRef.current.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [enabled, onClose]);

  // 滑鼠點擊close button關閉
  function handleCloseModal() {
    if (!triggerElementRef.current) return;

    onClose();
    triggerElementRef.current?.focus();
  }

  return handleCloseModal;
}

export default useRestoreFocus;
