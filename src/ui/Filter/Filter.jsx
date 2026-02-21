import { useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router";
import styled from "styled-components";
import SelectFilter from "./SelectFilter";
import SearchFilter from "./SearchFilter";
import DateRangeFilter from "./DateRangeFilter";
import useClickOutside from "../../hooks/ui/useClickOutside";
import { getInitialFilterState, handleSearchParams } from "./filterHelpers";
import Button from "../../ui/Button";
import FilterIcon from "../../ui/FilterIcon";
import useScrollLock from "../../hooks/ui/useScrollLock";
import useMediaQuery from "../../hooks/ui/useMediaQuery";

const StyledFilter = styled.div`
  position: relative;
`;

const Wrapper = styled.div`
  position: absolute;
  top: 5rem;
  right: 0;
  z-index: 2;
  width: min(95dvw, 28rem);

  @media (max-width: 40em) {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(2px);
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    transition: opacity 0.25s ease;
  }
`;

const FilterContainer = styled.div`
  padding: 1.5rem;
  font-size: 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  background-color: #fff;
  box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  border: 1px solid #e3e5e7;
  opacity: ${({ $isOpen }) => ($isOpen ? "1" : "0")};
  transition:
    transform 0.25s cubic-bezier(0.22, 0.61, 0.36, 1),
    opacity 0.2s ease;

  @media (max-width: 40em) {
    position: absolute;
    width: 100%;
    max-height: 85%;
    border-radius: 4px 4px 0 0;
    bottom: 0;

    transform: ${({ $isOpen }) =>
      $isOpen ? "translateY(0)" : "translateY(100%)"};
  }
`;

const FilterTitle = styled.h3`
  font-weight: 600;
  margin-bottom: 1rem;
  color: #333;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 100%;

  label {
    font-size: 1.3rem;
    color: #666;
  }
`;

const ActionButtonGroup = styled.footer`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  height: 3.2rem;
  margin-top: 1rem;
  flex-shrink: 0;
`;

const ApplyFiltersButton = styled.button`
  font-size: 1.4rem;
  width: 100%;
  background-color: #2563eb;
  color: #fff;
  border-radius: 4px;
`;

const ResetFiltersButton = styled(ApplyFiltersButton)`
  border: 1px solid #dc2626;
  color: #dc2626;
  background-color: #fff;

  &:disabled {
    color: #a8a29e;
    border-color: #d6d3d1;
    background-color: #fafaf9;
  }
`;

// 或許可以考慮使用RHF，這樣可以比較好處理errors問題，但或許也可以不處理
function Filter({ filtersConfig }) {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  // 篩選條件的初始值(在未完成更新以前將保持不變)
  const initialFilterState = getInitialFilterState(searchParams, filtersConfig);
  // 臨時存放篩選條件值的地方
  const [tempFilters, setTempFilters] = useState(initialFilterState);
  // 篩選modal的展開折疊控制
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef(null);

  const onClose = () => setIsOpen(false);

  useClickOutside(containerRef, isOpen, onClose);

  const isMatched = useMediaQuery(40, onClose);
  useScrollLock(isMatched && isOpen);

  // 清除條件按鈕disabled(filter輸入框有無輸入值)
  const isButtonDisabled = !Object.values(tempFilters).some(
    (filter) => !!filter.value,
  );
  // 篩選數據按鈕切換(當前是否有套用中的filter)
  const hasActiveFilters = Object.values(initialFilterState).some(
    (filter) => !!filter.value,
  );

  // 篩選種類和對應元件
  const filterComponents = {
    select: SelectFilter,
    datePicker: DateRangeFilter,
    textInput: SearchFilter,
    numberInput: SearchFilter,
  };

  // 處理篩選器輸入值更新的功能
  function handleValueChange(queryKey, value) {
    setTempFilters((tempFilters) => ({
      ...tempFilters,
      [queryKey]: { ...tempFilters[queryKey], value },
    }));
  }

  return (
    <StyledFilter ref={containerRef}>
      <Button
        $variant="outline"
        $iconSize="1.8rem"
        onClick={() => {
          if (isOpen) {
            setIsOpen(false);
          } else {
            setIsMounted(true);
            requestAnimationFrame(() => setIsOpen(true));
          }
        }}
      >
        <FilterIcon checked={hasActiveFilters} />
        <span>篩選數據</span>
      </Button>

      {isMounted && (
        <Wrapper
          $isOpen={isOpen}
          onClick={(e) => {
            if (isMatched && e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          <FilterContainer
            $isOpen={isOpen}
            onTransitionEnd={() => {
              if (!isOpen) {
                setIsMounted(false);
              }
            }}
          >
            <FilterTitle>篩選數據</FilterTitle>
            {filtersConfig.map((filter) => {
              // 根據filterConfig動態決定要使用哪種篩選框
              const FilterComponent = filterComponents[filter.type];
              return (
                <FilterGroup key={filter.queryKey}>
                  <label>{filter.title}</label>
                  <FilterComponent
                    {...filter}
                    filterValue={tempFilters[filter.queryKey].value}
                    handleValueChange={handleValueChange}
                  />
                </FilterGroup>
              );
            })}
            <ActionButtonGroup>
              <ResetFiltersButton
                disabled={isButtonDisabled}
                onClick={() =>
                  setTempFilters((prev) =>
                    Object.keys(prev).reduce((acc, key) => {
                      acc[key] = { ...prev[key], value: "" };
                      return acc;
                    }, {}),
                  )
                }
              >
                清空條件
              </ResetFiltersButton>
              <ApplyFiltersButton
                onClick={() =>
                  handleSearchParams(
                    pathname,
                    tempFilters,
                    searchParams,
                    setSearchParams,
                    setIsOpen,
                  )
                }
              >
                確認
              </ApplyFiltersButton>
            </ActionButtonGroup>
          </FilterContainer>
        </Wrapper>
      )}
    </StyledFilter>
  );
}

export default Filter;
