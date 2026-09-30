// ok
import styled, { css } from "styled-components";
import { useSearchParams } from "react-router";
import { useRef } from "react";
import { ChevronRight, ChevronLeft, Dot } from "lucide-react";
import { parsePositiveInt } from "../../../utils/helpers";
import { hoverStyles } from "../../../style/helpers";
import Button from "../../../components/button/Button";

const StyledPagination = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2.4rem;
  padding: 3.6rem 0;
  font-size: 1.4rem;
`;

const PaginationControls = styled.div`
  display: flex;
  height: 3.6rem;
  gap: 0.8rem;
`;

const PageNumbers = styled.div`
  display: flex;
  gap: 0.8rem;

  @media (max-width: 30em) {
    display: none;
  }
`;

const PaginationButton = styled(Button)`
  padding: 0 0.8rem;
  min-width: 3.6rem;
  height: 3.6rem;
  border-radius: 8px;

  ${({ $active }) =>
    $active &&
    css`
      background-color: #2563eb;
      color: #fff;
      border-color: #2563eb;

      ${hoverStyles(css`
        background-color: #2563eb;
        color: #fff;
        border-color: #2563eb;
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
  color: #6b7280;
  font-size: 1.4rem;
  user-select: none;
`;

const MobilePageInfo = styled.div`
  display: none;

  @media (max-width: 30em) {
    display: flex;
    align-items: center;

    strong {
      font-weight: 600;
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
  gap: 0.8rem;

  input {
    width: 4.8rem;
    height: 3.6rem;
    text-align: center;
    border: 1px solid #e3e5e7;
    border-radius: 8px;

    ${hoverStyles(css`
      &:not(:focus) {
        border-color: #b3b3b3;
      }
    `)}

    &:focus {
      border-color: #2684ff;
      box-shadow: 0 0 0 3px rgba(38, 132, 255, 0.15);
    }
  }
`;

function getPaginationItems(curPage, totalPages) {
  if (totalPages <= 7)
    return Array.from({ length: totalPages }, (_, i) => i + 1);

  if (curPage <= 4)
    return [
      ...Array.from({ length: 5 }, (_, i) => i + 1),
      "ellipsis",
      totalPages,
    ];

  if (curPage >= totalPages - 3)
    return [
      1,
      "ellipsis",
      ...Array.from({ length: 5 }, (_, i) => totalPages - 4 + i),
    ];

  return [
    1,
    "ellipsis",
    ...Array.from({ length: 3 }, (_, i) => curPage - 1 + i),
    "ellipsis",
    totalPages,
  ];
}

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
