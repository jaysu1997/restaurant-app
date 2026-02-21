import { useEffect } from "react";

let lockCount = 0; //

function applyLock() {
  if (lockCount === 0) {
    document.documentElement.style.overflow = "hidden";
  }
  lockCount += 1;
}

function releaseLock() {
  lockCount -= 1;

  if (lockCount <= 0) {
    lockCount = 0;
    document.documentElement.style.overflow = "";
  }
}

// 當元件處於RWD且正開啟中的狀態下，鎖定scrollbar(不能滾動)
function useScrollLock(shouldLock) {
  useEffect(() => {
    if (!shouldLock) return;

    applyLock();

    return () => {
      releaseLock();
    };
  }, [shouldLock]);
}

export default useScrollLock;
