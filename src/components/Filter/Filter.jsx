import styled from "styled-components";
import { useLocation, useSearchParams } from "react-router";
import { useRef, useState } from "react";
import useClickOutside from "../../hooks/ui/useClickOutside";
import useScrollLock from "../../hooks/ui/useScrollLock";
import useMediaQuery from "../../hooks/ui/useMediaQuery";
import Button from "../button/Button";
import StyledOverlay from "../StyledOverlay";
import { X } from "lucide-react";
import HeaderActionButton from "../button/HeaderActionButton";
import { buildSearchParams, hasActiveFilters } from "../../utils/filterHelpers";
import FilterRenderer from "./FilterRenderer";
import FilterIcon from "../FilterIcon";

const StyledFilter = styled.div`
  position: relative;
`;

const Overlay = styled(StyledOverlay)`
  display: none;

  @media (max-width: 30em) {
    display: block;
    opacity: ${({ $isFilterOpen }) => ($isFilterOpen ? 1 : 0)};
    transition: opacity 0.25s ease-out;
  }
`;

const FilterContainer = styled.div`
  position: absolute;
  top: 5rem;
  right: 0;
  z-index: 10;
  width: 34rem;
  display: ${({ $isFilterOpen }) => ($isFilterOpen ? "flex" : "none")};
  flex-direction: column;
  background-color: #fff;
  font-size: 1.4rem;
  box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  border: 1px solid #e3e5e7;

  @media (max-width: 30em) {
    display: flex;
    position: fixed;
    top: 25%;
    z-index: 150;
    width: 100%;
    height: 75%;
    border-radius: 0;
    border: none;
    transform: ${({ $isFilterOpen }) =>
      $isFilterOpen ? "translateY(0)" : "translateY(100%)"};
    transition: transform 0.25s ease-out;
  }

  label {
    font-size: 1.3rem;
    color: #666;
  }
`;

const FilterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;

  h3 {
    font-weight: 600;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 1rem 2rem;
  flex: 1;
`;

const Footer = styled.footer`
  display: flex;
  gap: 2rem;
  border-top: 1px solid #f3f4f6;
  padding: 2rem;
  background-color: #fff;
`;

function Filter({ filtersConfig, filterState }) {
  const containerRef = useRef(null);
  const { pathname } = useLocation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  // 使用者正在編輯的 filters
  const [draftFilters, setDraftFilters] = useState(filterState);

  const onClose = () => setIsFilterOpen(false);
  const isMatched = useMediaQuery(30, onClose);
  useClickOutside(containerRef, isFilterOpen, onClose);
  useScrollLock(isMatched && isFilterOpen);

  // 是否有套用filter
  const activeFilters = hasActiveFilters(filterState);
  // 是否禁用clear button
  const isClearDisabled = !hasActiveFilters(draftFilters);

  function handleToggle() {
    setIsFilterOpen((prev) => {
      if (!prev) {
        setDraftFilters(filterState);
      }

      return !prev;
    });
  }

  function handleValueChange(queryKey, value) {
    setDraftFilters((prev) => ({
      ...prev,
      [queryKey]: { ...prev[queryKey], value },
    }));
  }

  function clearFilters() {
    setDraftFilters((prev) =>
      Object.keys(prev).reduce((acc, key) => {
        acc[key] = { ...prev[key], value: "" };
        return acc;
      }, {}),
    );
  }

  function confirmFilters() {
    const newParams = buildSearchParams(draftFilters, searchParams);
    // 訂單列表套用新條件都要回到第一分頁
    if (pathname === "/orders") {
      newParams.set("page", "1");
    }

    setSearchParams(newParams);
    onClose();
  }

  return (
    <StyledFilter ref={containerRef}>
      <HeaderActionButton $variant="outline" onClick={handleToggle}>
        <FilterIcon checked={activeFilters} />
        <span>篩選</span>
      </HeaderActionButton>

      <Overlay
        $isFilterOpen={isFilterOpen}
        inert={!isFilterOpen}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      />

      <FilterContainer $isFilterOpen={isFilterOpen} inert={!isFilterOpen}>
        <FilterHeader>
          <h3>篩選</h3>

          <Button $variant="ghost" onClick={onClose}>
            <X />
          </Button>
        </FilterHeader>

        <Content>
          {filtersConfig.map((filter) => (
            <FilterRenderer
              filter={filter}
              filterValue={draftFilters[filter.queryKey].value}
              handleValueChange={handleValueChange}
              key={filter.queryKey}
            />
          ))}
        </Content>

        <Footer>
          <Button
            $variant="outline"
            $isFullWidth
            disabled={isClearDisabled}
            onClick={clearFilters}
          >
            清空條件
          </Button>

          <Button $isFullWidth onClick={confirmFilters}>
            確認
          </Button>
        </Footer>
      </FilterContainer>
    </StyledFilter>
  );
}

export default Filter;
