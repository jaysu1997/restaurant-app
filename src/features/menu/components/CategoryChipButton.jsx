// ok
import styled from "styled-components";
import Button from "../../../components/button/Button";
import { getValidParam } from "../../../utils/filterHelpers";
import { useSearchParams } from "react-router";

const StyledCategoryChipButton = styled(Button)`
  padding: 0 2.4rem;

  &:active {
    transform: scale(0.97);
  }

  @media (pointer: coarse) {
    scroll-snap-align: start;
  }
`;

function CategoryChipButton({ categories, category, children }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // 篩選要呈現的餐點類別
  const activeCategory = getValidParam(
    searchParams.get("category"),
    categories,
    "all",
  );

  const isActive = activeCategory === category;

  function handleCategoryChange(category) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("category", category);
    setSearchParams(newParams);
  }

  return (
    <StyledCategoryChipButton
      $variant={isActive ? "primary" : "outline"}
      onClick={() => handleCategoryChange(category)}
      aria-pressed={isActive}
    >
      {children}
    </StyledCategoryChipButton>
  );
}

export default CategoryChipButton;
