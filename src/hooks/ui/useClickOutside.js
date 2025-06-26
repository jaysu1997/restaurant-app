// 用來處理點擊外部關閉Modal或popup的功能
import { useEffect } from "react";

function useClickOutside(ref, isOpenMenu, setIsOpenMenu, useCapture = true) {
  useEffect(
    function () {
      if (!isOpenMenu) return;

      function handleClickOutside(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          e.stopPropagation();
          setIsOpenMenu(false);
        }
      }

      document.addEventListener("click", handleClickOutside, useCapture);
      return () => {
        document.removeEventListener("click", handleClickOutside, useCapture);
      };
    },
    [ref, isOpenMenu, setIsOpenMenu, useCapture]
  );
}

export default useClickOutside;
