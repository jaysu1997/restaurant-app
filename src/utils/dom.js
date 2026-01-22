// 表單欄位插入淡入動畫
export function fadeInAnimation(elementId) {
  requestAnimationFrame(() => {
    const element = document.getElementById(elementId);

    if (element) {
      element.classList.add("fadeIn");
    }
  });
}
