import styled, { css } from "styled-components";
import { useSearchParams } from "react-router";
import { useRef } from "react";
import { ChevronRight, ChevronLeft, Dot } from "lucide-react";
import { parsePositiveInt } from "../../../utils/numbers.js";
import { hoverStyles } from "../../../style/helpers";
import Button from "../../../components/button/Button";
import { getPaginationItems } from "../utils/pagination.js";

const StyledPagination = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-6);
  padding: var(--space-9) 0;
  font-size: var(--font-size-sm);
`;

const PaginationControls = styled.div`
  display: flex;
  height: 3.6rem;
  gap: var(--space-2);
`;

const PageNumbers = styled.div`
  display: flex;
  gap: var(--space-2);

  @media (max-width: 30em) {
    display: none;
  }
`;

const PaginationButton = styled(Button)`
  padding: 0 var(--space-2);
  min-width: 3.6rem;
  height: 3.6rem;
  border-radius: var(--radius-lg);

  ${({ $active }) =>
    $active &&
    css`
      background-color: var(--color-brand);
      color: var(--color-surface);
      border-color: var(--color-brand);

      ${hoverStyles(css`
        background-color: var(--color-brand);
        color: var(--color-surface);
        border-color: var(--color-brand);
      `)}
    `}

  svg {
    width: 1.8rem;
    height: 1.8rem;
  }
`;

const PaginationEllipsis = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3.6rem;
  height: 3.6rem;
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  user-select: none;
`;

const MobilePageInfo = styled.div`
  display: none;

  @media (max-width: 30em) {
    display: flex;
    align-items: center;

    strong {
      font-weight: var(--font-weight-semibold);
    }

    svg {
      width: 2rem;
      height: 2rem;
    }
  }
`;

const JumpToPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);

  input {
    width: 4.8rem;
    height: 3.6rem;
    text-align: center;
    border: 1px solid var(--color-border-subtle);
    border-radius: var(--radius-lg);

    ${hoverStyles(css`
      &:not(:focus-visible) {
        border-color: var(--color-border-hover);
      }
    `)}

    &:focus-visible {
      outline: none;
      border-color: var(--color-focus);
      box-shadow: var(--shadow-focus-control);
    }
  }
`;

function Pagination({ curPage, totalPages }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef(null);

  const paginations = getPaginationItems(curPage, totalPages);

  // 轉跳分頁功能
  function goToPage(value) {
    searchParams.set("page", value);
    setSearchParams(searchParams);
  }

  function handleSubmit() {
    const inputValue = parsePositiveInt(inputRef?.current?.value, {
      min: 1,
      max: totalPages,
      fallback: null,
    });

    // 輸入值非正整數
    if (inputValue === null) return;
    inputRef.current.value = "";
    // 輸入值為當前分頁
    if (inputValue === curPage) return;

    // 輸入值合格
    goToPage(inputValue);
    inputRef.current?.blur();
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <StyledPagination aria-label="訂單分頁">
      <PaginationControls>
        <PaginationButton
          $variant="outline"
          onClick={() => goToPage(curPage - 1)}
          disabled={curPage === 1}
          aria-label="前往上一頁"
        >
          <ChevronLeft strokeWidth={2.5} />
        </PaginationButton>

        {/* 電腦版 */}
        <PageNumbers>
          {paginations.map((value, index) =>
            value === "ellipsis" ? (
              <PaginationEllipsis aria-hidden="true" key={`${value}_${index}`}>
                ...
              </PaginationEllipsis>
            ) : (
              <PaginationButton
                $variant="outline"
                $active={value === curPage}
                onClick={() => goToPage(value)}
                aria-current={value === curPage ? "page" : undefined}
                key={value}
              >
                {value}
              </PaginationButton>
            ),
          )}
        </PageNumbers>

        {/* 手機版 */}
        <MobilePageInfo>
          <strong>第 {curPage} 頁</strong>
          <Dot aria-hidden="true" />
          <span>共 {totalPages} 頁</span>
        </MobilePageInfo>

        <PaginationButton
          $variant="outline"
          onClick={() => goToPage(curPage + 1)}
          disabled={curPage === totalPages}
          aria-label="前往下一頁"
        >
          <ChevronRight strokeWidth={2.5} />
        </PaginationButton>
      </PaginationControls>

      <JumpToPage>
        <span>前往</span>
        <input
          type="text"
          aria-label="前往頁數"
          ref={inputRef}
          onKeyDown={handleKeyDown}
          inputMode="numeric"
        />
        <span>頁</span>
      </JumpToPage>
    </StyledPagination>
  );
}

export default Pagination;
