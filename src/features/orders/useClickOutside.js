// 用來處理點擊外部關閉Modal或popup的功能
import { useEffect } from "react";

function useClickOutside(ref, isOpenMenu, setIsOpenMenu) {
  useEffect(
    function () {
      if (!isOpenMenu) return;

      const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
          e.stopPropagation();
          setIsOpenMenu(false);
        }
      };

      document.addEventListener("click", handleClickOutside, true);
      return () => {
        document.removeEventListener("click", handleClickOutside, true);
      };
    },
    [ref, isOpenMenu, setIsOpenMenu]
  );
}

export default useClickOutside;
