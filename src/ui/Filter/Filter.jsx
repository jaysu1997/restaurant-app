import styled from "styled-components";
import { useLocation, useSearchParams } from "react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import OptionFilter from "./OptionFilter";
import SearchFilter from "./SearchFilter";
import DateRangeFilter from "./DateRangeFilter";
import useClickOutside from "../../hooks/ui/useClickOutside";
import useScrollLock from "../../hooks/ui/useScrollLock";
import useMediaQuery from "../../hooks/ui/useMediaQuery";
import { buildSearchParams, parseFilterQuery } from "./filterHelpers";
import Button from "../../ui/Button";
import FilterIcon from "../../ui/FilterIcon";
import FormFieldLayout from "../FormFieldLayout";
import StyledOverlay from "../StyledOverlay";
import { X } from "lucide-react";

const StyledFilter = styled.div`
  position: relative;
`;

const Overlay = styled(StyledOverlay)`
  display: none;

  @media (max-width: 30em) {
    display: block;
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    transition: opacity 0.25s ease-out;
  }
`;

const FilterContainer = styled.div`
  position: absolute;
  top: 5rem;
  right: 0;
  z-index: 10;
  width: 34rem;
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  flex-direction: column;
  background-color: #fff;
  padding: 2rem;
  font-size: 1.4rem;
  box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  border: 1px solid #e3e5e7;

  @media (max-width: 30em) {
    display: flex;
    position: fixed;
    top: 0;
    z-index: 150;
    width: 100%;
    height: 100%;
    overflow: auto;
    border-radius: 0;
    border: none;
    transform: ${({ $isOpen }) =>
      $isOpen ? "translateY(0)" : "translateY(100%)"};
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
  margin-bottom: 2rem;

  h3 {
    font-weight: 600;
  }
`;

const ActionButtonGroup = styled.footer`
  display: flex;
  gap: 2rem;
  margin-top: 1rem;

  @media (max-width: 30em) {
    margin-top: auto;
  }
`;

const FILTER_COMPONENTS = {
  select: OptionFilter,
  datePicker: DateRangeFilter,
  textInput: SearchFilter,
  numberInput: SearchFilter,
};

function Filter({ filtersConfig }) {
  const containerRef = useRef(null);
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // 已套用的 filters (來自 URL)
  const appliedFilters = useMemo(
    () => parseFilterQuery(searchParams, filtersConfig),
    [searchParams, filtersConfig],
  );

  // 使用者正在編輯的 filters
  const [draftFilters, setDraftFilters] = useState(appliedFilters);

  // URL 改變時同步
  useEffect(() => {
    setDraftFilters(appliedFilters);
  }, [appliedFilters]);

  const onClose = () => setIsOpen(false);
  const isMatched = useMediaQuery(30, onClose);
  useClickOutside(containerRef, isOpen, onClose);
  useScrollLock(isMatched && isOpen);

  // 是否有套用 filter (用 URL 判斷)
  const hasActiveFilters = Object.values(appliedFilters).some(
    (filter) => !!filter.value,
  );

  // clear button disabled
  const isClearDisabled = !Object.values(draftFilters).some(
    (filter) => !!filter.value,
  );

  function handleToggle() {
    setIsOpen((prev) => {
      if (!prev) {
        setDraftFilters(appliedFilters);
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
    const params = buildSearchParams(draftFilters, searchParams);

    if (pathname === "/orders") {
      params.set("page", "1");
    }

    setSearchParams(params);
    setIsOpen(false);
  }

  return (
    <StyledFilter ref={containerRef}>
      <Button $variant="outline" $iconSize="1.8rem" onClick={handleToggle}>
        <FilterIcon checked={hasActiveFilters} />
        <span>篩選數據</span>
      </Button>

      <Overlay $isOpen={isOpen} inert={!isOpen} />

      <FilterContainer $isOpen={isOpen} inert={!isOpen}>
        <FilterHeader>
          <h3>篩選數據</h3>
          <Button $variant="ghost" onClick={onClose}>
            <X />
          </Button>
        </FilterHeader>

        {isOpen &&
          filtersConfig.map((filter) => {
            const FilterComponent = FILTER_COMPONENTS[filter.type];

            return (
              <FormFieldLayout label={filter.title} key={filter.queryKey}>
                <FilterComponent
                  {...filter}
                  filterValue={draftFilters[filter.queryKey].value}
                  handleValueChange={handleValueChange}
                />
              </FormFieldLayout>
            );
          })}

        <ActionButtonGroup>
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
        </ActionButtonGroup>
      </FilterContainer>
    </StyledFilter>
  );
}

export default Filter;
