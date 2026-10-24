import { useCallback, useEffect, useRef } from "react";

function useRestoreFocus(onClose, enabled = true) {
  const triggerElementRef = useRef(null);

  useEffect(() => {
    if (!enabled || triggerElementRef.current) return;

    const target = document.activeElement;
    triggerElementRef.current = target instanceof HTMLElement ? target : null;
    triggerElementRef.current?.blur();
  }, [enabled]);

  // 滑鼠點擊close button關閉
  const handleCloseModal = useCallback(() => {
    if (!triggerElementRef.current) return;

    onClose();

    requestAnimationFrame(() => {
      const target = triggerElementRef.current;

      if (target?.isConnected && !target.closest("[inert]")) {
        target.focus();
      }
    });
  }, [onClose]);

  useEffect(() => {
    if (!enabled) return;

    function handleKeyDown(e) {
      // esc按鍵關閉
      if (e.key === "Escape") {
        handleCloseModal();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [enabled, handleCloseModal]);

  return handleCloseModal;
}

export default useRestoreFocus;
