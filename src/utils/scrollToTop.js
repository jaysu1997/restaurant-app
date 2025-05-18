// 滾動到頁面頂部功能(切換分頁時使用)
function scrollToTop() {
  const top = document.querySelector("#top");
  top?.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });
}

export { scrollToTop };
