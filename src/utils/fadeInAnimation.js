// 表單欄位淡入動畫(或許)
function fadeInAnimation(elementId) {
  return requestAnimationFrame(() => {
    const element = document.getElementById(elementId);

    if (element) {
      element.classList.add("fadeIn");
    }
  });
}

export default fadeInAnimation;
