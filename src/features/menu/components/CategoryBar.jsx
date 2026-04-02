// ok
import styled from "styled-components";
import { useSearchParams } from "react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getCategories, getSelectedCategory } from "../utils/menuHelpers";
import CategoryButton from "./CategoryButton";
import ScrollNavButton from "./ScrollNavButton";

const StyledCategoryBar = styled.div`
  width: 100%;
  min-width: 0;
  padding: 1rem;
  background-color: #262626;
  border-radius: 12px;
  position: relative;
`;

const Viewport = styled.div`
  width: 100%;
  border-radius: 6px;
  overflow: hidden;
`;

const ScrollContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

function CategoryBar({ menus }) {
  const scrollRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(false);

  // 所有分類
  const categories = getCategories(menus);
  // 篩選要呈現的餐點類別
  const selectedCategory = getSelectedCategory(
    searchParams.get("category"),
    categories,
  );

  function handleFilter(type) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("category", type);
    setSearchParams(newParams);
  }

  function handleScroll(direction) {
    // 計算滾動距離(item寬度 + 容器gap)
    const el = scrollRef.current;
    const firstItemWidth = el.children[0].offsetWidth;
    const style = window.getComputedStyle(el);
    const gap = parseFloat(style.gap);

    const scrollAmount = firstItemWidth + gap;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    const el = scrollRef.current;

    function update() {
      // 計算滾動軸當前滾動狀態
      const { scrollLeft, scrollWidth, clientWidth } = el;
      const isAtStart = scrollLeft <= 0;
      const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 1;
      setShowPrev(!isAtStart);
      setShowNext(!isAtEnd);
    }
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    el.addEventListener("scroll", update);
    return () => {
      observer.disconnect();
      el.removeEventListener("scroll", update);
    };
  }, []);

  return (
    <StyledCategoryBar>
      {showPrev && (
        <ScrollNavButton
          direction="left"
          handleClick={() => handleScroll("left")}
        >
          <ArrowLeft />
        </ScrollNavButton>
      )}

      <Viewport>
        <ScrollContainer ref={scrollRef}>
          <CategoryButton
            handleClick={() => handleFilter("all")}
            isActive={selectedCategory === "all"}
          >
            全部
          </CategoryButton>

          {categories.map((category) => (
            <CategoryButton
              key={category}
              handleClick={() => handleFilter(category)}
              isActive={selectedCategory === category}
            >
              {category}
            </CategoryButton>
          ))}
        </ScrollContainer>
      </Viewport>

      {showNext && (
        <ScrollNavButton
          direction="right"
          handleClick={() => handleScroll("right")}
        >
          <ArrowRight />
        </ScrollNavButton>
      )}
    </StyledCategoryBar>
  );
}

export default CategoryBar;
