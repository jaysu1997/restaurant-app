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
import {
  buildSearchParams,
  hasActiveFilters,
} from "../../utils/queryFilters.js";
import FilterRenderer from "./FilterRenderer";
import FilterIcon from "./FilterIcon.jsx";
import useRestoreFocus from "../../hooks/ui/useRestoreFocus.js";
import useFocusTrap from "../../hooks/ui/useFocusTrap.js";

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

const FilterContainer = styled.form`
  position: absolute;
  top: 5rem;
  right: 0;
  z-index: 10;
  width: 34rem;
  display: ${({ $isFilterOpen }) => ($isFilterOpen ? "flex" : "none")};
  flex-direction: column;
  background-color: var(--color-surface);
  font-size: var(--font-size-sm);
  box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.1);
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border-subtle);

  @media (max-width: 30em) {
    display: flex;
    position: fixed;
    top: 25%;
    z-index: 151;
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
    color: var(--color-text-secondary);
    font-weight: var(--font-weight-medium);
  }
`;

const FilterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-5);

  h3 {
    font-weight: var(--font-weight-semibold);
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: var(--space-2-5) var(--space-5);
  flex: 1;
`;

const Footer = styled.footer`
  display: flex;
  gap: var(--space-5);
  border-top: 1px solid var(--color-surface-subtle);
  padding: var(--space-5);
  background-color: var(--color-surface);
  & > button {
    width: 100%;
  }
`;

function Filter({ filtersConfig, filterState }) {
  const filterRef = useRef(null);
  const { pathname } = useLocation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  // 使用者正在編輯的 filters
  const [draftFilters, setDraftFilters] = useState(filterState);

  const handleCloseModal = useRestoreFocus(
    () => setIsFilterOpen(false),
    isFilterOpen,
  );
  const isMatched = useMediaQuery(30, handleCloseModal);
  const containerRef = useFocusTrap(isMatched && isFilterOpen);
  useClickOutside(filterRef, isFilterOpen, handleCloseModal);
  useScrollLock(isMatched && isFilterOpen);

  // 是否有套用filter
  const activeFilters = hasActiveFilters(filterState);
  // 是否禁用clear button
  const isClearDisabled = !hasActiveFilters(draftFilters);

  function handleToggle(e) {
    e.stopPropagation();

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

  function confirmFilters(e) {
    e.preventDefault();

    const newParams = buildSearchParams(draftFilters, searchParams);
    // 訂單列表套用新條件都要回到第一分頁
    if (pathname === "/orders") {
      newParams.set("page", "1");
    }

    setSearchParams(newParams);
    handleCloseModal();
  }

  return (
    <>
      {isMatched && (
        <Overlay $isFilterOpen={isFilterOpen} inert={!isFilterOpen} />
      )}

      <StyledFilter ref={filterRef}>
        <HeaderActionButton $variant="outline" onClick={handleToggle}>
          <FilterIcon checked={activeFilters} />
          <span>篩選</span>
        </HeaderActionButton>

        <FilterContainer
          ref={containerRef}
          $isFilterOpen={isFilterOpen}
          inert={!isFilterOpen}
          onSubmit={(e) => confirmFilters(e)}
        >
          <FilterHeader>
            <h3>篩選</h3>

            <Button $variant="ghost" onClick={handleCloseModal}>
              <X />
            </Button>
          </FilterHeader>

          <Content>
            {filtersConfig.map((filter) => (
              <FilterRenderer
                filter={filter}
                filterValue={draftFilters[filter.queryKey].value}
                handleValueChange={handleValueChange}
                key={`${filter.queryKey}-${isFilterOpen}`}
              />
            ))}
          </Content>

          <Footer>
            <Button
              $variant="outline"
              disabled={isClearDisabled}
              onClick={clearFilters}
            >
              清空條件
            </Button>

            <Button type="submit">確認</Button>
          </Footer>
        </FilterContainer>
      </StyledFilter>
    </>
  );
}

export default Filter;
