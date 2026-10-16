import { useEffect, useRef } from "react";

function useFocusTrap(enabled = true) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    function handleKeyDown(e) {
      if (e.key !== "Tab") return;

      const modal = containerRef.current;

      const focusableElements = [
        ...modal.querySelectorAll(
          `button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex^="-"])`,
        ),
      ].filter((element) => !element.closest("[inert]"));

      if (focusableElements.length === 0) return;
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const activeElement = document.activeElement;
      const isInsideModal = modal.contains(activeElement);

      // 尚未進入container內，第一次Tab
      if (!isInsideModal) {
        e.preventDefault();

        if (e.shiftKey) {
          lastElement.focus();
        } else {
          firstElement.focus();
        }

        return;
      }

      // Tab在第一個元素且使用Shift + tab
      if (e.shiftKey && activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
        return;
      }

      // Tab 到最後一個元素且使用 Tab
      if (!e.shiftKey && activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [enabled]);

  return containerRef;
}

export default useFocusTrap;
