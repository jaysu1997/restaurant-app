import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { TbFilter, TbFilterCheck } from "react-icons/tb";
import DatePicker from "./DatePicker";
import useClickOutside from "../features/orders/useClickOutside";
import { format } from "date-fns";
import SelectFilter from "./SelectFilter";
import SearchFilter from "./SearchFilter";

const StyledFilter = styled.div`
  position: relative;
`;

const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  font-size: 1.4rem;
  font-weight: 500;
  padding: 0.8rem 1.6rem;
  border: 1px solid #2563eb;
  border-radius: 4px;
  color: #2563eb;

  &:hover {
    background-color: #eef2ff;
  }
`;

const StyledFilterCheckIcon = styled(TbFilterCheck)`
  path:last-of-type {
    stroke: red;
  }
`;

const FilterContainer = styled.div`
  position: absolute;
  top: 5rem;
  right: 0;
  z-index: 1;
  padding: 1.5rem;
  font-size: 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  background-color: #fff;
  box-shadow: 0px 4px 32px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  width: clamp(16rem, 100dvw, 28rem);
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
  max-width: 25rem;
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

// 從url取得searchParams值
function getInitialFilterState(searchParams, filtersConfig) {
  return filtersConfig.reduce((acc, filter) => {
    const { queryKey, type, options } = filter;
    let value = "";

    if (searchParams.get(queryKey)) {
      if (type === "search") {
        value = searchParams.get(queryKey);
      }
      if (type === "select") {
        value =
          options.find((opt) => opt.value === searchParams.get(queryKey)) || "";
      }
      if (type === "datePicker") {
        const [from, to] = searchParams.get(queryKey).split("_");
        value = { from, to };
      }
    }

    acc[queryKey] = { type, value };
    return acc;
  }, {});
}

function Filter({ filtersConfig }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFilterState = getInitialFilterState(searchParams, filtersConfig);
  const [tempFilters, setTempFilters] = useState(initialFilterState);
  const [isContainerOpen, setIsContainerOpen] = useState(false);
  const filterContainerRef = useRef(null);
  useClickOutside(filterContainerRef, isContainerOpen, setIsContainerOpen);

  // 清除條件按鈕disabled(filter輸入框有無輸入值)
  const isButtonDisabled = !Object.values(tempFilters).some(
    (filter) => !!filter.value
  );
  // 篩選數據按鈕切換(當前是否有套用中的filter)
  const hasActiveFilters = Object.values(initialFilterState).some(
    (filter) => !!filter.value
  );

  // 篩選種類和對應元件
  const filterComponents = {
    select: SelectFilter,
    datePicker: DatePicker,
    search: SearchFilter,
  };

  // 處理篩選器輸入值更新的功能
  function handleValueChange(queryKey, value) {
    setTempFilters((tempFilters) => ({
      ...tempFilters,
      [queryKey]: { ...tempFilters[queryKey], value },
    }));
  }

  // 處理searchParams更新(URL)
  function handleSearchParams() {
    for (const [key, obj] of Object.entries(tempFilters)) {
      let searchParamsValue = "";
      if (obj.type === "search" && obj.value) {
        searchParamsValue = obj.value;
      }
      if (obj.type === "select" && obj.value?.value) {
        searchParamsValue = obj.value.value;
      }
      if (obj.type === "datePicker" && obj.value?.from && obj.value?.to) {
        searchParamsValue = `${format(obj.value.from, "yyyy-MM-dd")}_${format(
          obj.value.to,
          "yyyy-MM-dd"
        )}`;
      }

      if (searchParamsValue) {
        searchParams.set(key, searchParamsValue);
      } else {
        // 刪除沒有進行篩選的searchParams
        searchParams.delete(key);
      }
      setSearchParams(searchParams);
    }
    setIsContainerOpen(false);
  }

  return (
    <StyledFilter>
      <ToggleButton
        $isActive={0}
        onClick={() =>
          setIsContainerOpen((isContainerOpen) => {
            if (!isContainerOpen) {
              setTempFilters(initialFilterState);
            }
            return !isContainerOpen;
          })
        }
      >
        {hasActiveFilters ? (
          <StyledFilterCheckIcon size={18} />
        ) : (
          <TbFilter size={18} />
        )}
        篩選數據
      </ToggleButton>

      {isContainerOpen && (
        <FilterContainer ref={filterContainerRef}>
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
                  }, {})
                )
              }
            >
              清空條件
            </ResetFiltersButton>
            <ApplyFiltersButton onClick={() => handleSearchParams()}>
              確認
            </ApplyFiltersButton>
          </ActionButtonGroup>
        </FilterContainer>
      )}
    </StyledFilter>
  );
}

export default Filter;
