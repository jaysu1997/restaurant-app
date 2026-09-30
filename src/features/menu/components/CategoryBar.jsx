// ok
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import ScrollNavButton from "./ScrollNavButton";
import CategoryChipButton from "./CategoryChipButton";

const StyledCategoryBar = styled.div`
  position: relative;
  width: 100%;
  min-width: 0;
  background-color: #f9fafb;
  padding: 1.2rem 0;
`;

const CategoryTrack = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 1.2rem;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (pointer: coarse) {
    scroll-snap-type: x proximity;
  }
`;

function CategoryBar({ categories = [] }) {
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollRef = useRef(null);
  const scrollNavButtonRef = useRef(null);
  const categoryItemMetricsRef = useRef([]);

  // 判別是否需要顯示左右滾動按鈕
  function syncScrollButtonState(el) {
    // 計算滾動軸當前滾動狀態
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const isAtStart = scrollLeft <= 0;
    const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 1;

    setCanScrollPrev(!isAtStart);
    setCanScrollNext(!isAtEnd);
  }

  // 更新每個分類item的offsetLeft和offsetWidth
  function measureCategoryItems(el) {
    const data = Array.from(el.children).map((item) => {
      return {
        offsetLeft: item.offsetLeft,
        offsetWidth: item.offsetWidth,
      };
    });

    categoryItemMetricsRef.current = data;
  }

  // 計算左右滾動按鈕需要移動的距離
  function handleScroll(direction) {
    let nextLeft = 0;
    const el = scrollRef.current;
    const { scrollLeft, clientWidth } = el;
    const items = categoryItemMetricsRef.current ?? [];
    const scrollNavButtonWidth = scrollNavButtonRef.current?.offsetWidth ?? 0;

    if (direction === "right") {
      const rightSafeEdge = scrollLeft + clientWidth - scrollNavButtonWidth;
      const target = items.find(
        (item) => item.offsetLeft + item.offsetWidth > rightSafeEdge,
      );

      if (!target) return;
      nextLeft = Math.max(0, target.offsetLeft - scrollNavButtonWidth);
    }

    if (direction === "left") {
      const leftSafeEdge = scrollLeft + scrollNavButtonWidth;
      const target = [...items]
        .reverse()
        .find((item) => item.offsetLeft < leftSafeEdge);

      if (!target) return;
      nextLeft = Math.max(
        0,
        target.offsetLeft +
          target.offsetWidth -
          (clientWidth - scrollNavButtonWidth),
      );
    }

    el.scrollTo({
      left: nextLeft,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    function handleScroll() {
      syncScrollButtonState(el);
    }

    function update() {
      handleScroll();
      measureCategoryItems(el);
    }

    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    el.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      el.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <StyledCategoryBar aria-label="餐點分類" aria-orientation="horizontal">
      <CategoryTrack ref={scrollRef}>
        <CategoryChipButton category="all" categories={categories}>
          全部
        </CategoryChipButton>

        {categories.map((category) => (
          <CategoryChipButton
            category={category}
            categories={categories}
            key={category}
          >
            {category}
          </CategoryChipButton>
        ))}
      </CategoryTrack>

      <ScrollNavButton
        direction="left"
        visible={canScrollPrev}
        handleScroll={handleScroll}
      />

      <ScrollNavButton
        direction="right"
        visible={canScrollNext}
        handleScroll={handleScroll}
      />
    </StyledCategoryBar>
  );
}

export default CategoryBar;
