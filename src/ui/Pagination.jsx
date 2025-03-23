import styled from "styled-components";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useSearchParams } from "react-router-dom";

const StyledFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 0;
`;

const ItemsPerPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
  font-size: 1.4rem;
  font-weight: 500;

  select {
    width: 5.6rem;
    height: 2.4rem;
    border: 1px solid #1f2937;
    font-size: 1.4rem;
  }

  select:focus {
    outline: 1px solid #1f2937;
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  text-align: center;
`;

const PaginationButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  border-radius: 50%;
  height: 3.6rem;
  width: 3.6rem;
  font-weight: 500;
  transition: none;

  svg {
    height: 2rem;
    width: 2rem;
  }

  &:is(button):not([aria-current="page"]):not(:disabled):hover {
    background-color: #eee;
  }

  &:disabled {
    color: inherit;
    opacity: 0.5;
  }

  &[aria-current="page"] {
    background-color: #2563eb;
    color: #fff;
  }
`;

// 分頁邏輯(盡量保持總共有9個按鈕)
function paginationButton(curPage, maxPage) {
  const range = (start, end) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  if (maxPage <= 9) return range(1, maxPage);

  if (curPage <= 5) return [...range(1, 7), "...", maxPage];

  if (curPage >= maxPage - 4) return [1, "...", ...range(maxPage - 6, maxPage)];

  return [1, "...", ...range(curPage - 2, curPage + 2), "...", maxPage];
}

function Pagination({ curPage, maxPage }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const paginationNumbers = paginationButton(curPage, maxPage);

  function handlePagination(key, value) {
    searchParams.set(key, value);
    setSearchParams(searchParams);

    // 更改數據展示方式都會滾回頂部
    const top = document.querySelector("#top");
    top.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }

  return (
    <StyledFooter>
      <ItemsPerPage>
        <span>每頁顯示筆數：</span>
        <select
          id="itemsPerPage"
          value={searchParams.get("items") || 10}
          onChange={(e) => {
            searchParams.set("page", 1);
            handlePagination("items", e.target.value);
          }}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </ItemsPerPage>

      <PaginationWrapper>
        <PaginationButton
          type="button"
          role="previousPage"
          disabled={curPage === 1}
          onClick={() => handlePagination("page", curPage - 1)}
        >
          <MdNavigateBefore />
        </PaginationButton>

        {paginationNumbers.map((num, index) => (
          <PaginationButton
            as={num === "..." ? "span" : "button"}
            onClick={
              num === "..." ? undefined : () => handlePagination("page", num)
            }
            aria-current={curPage === num ? "page" : undefined}
            key={index}
          >
            {num}
          </PaginationButton>
        ))}

        <PaginationButton
          type="button"
          role="nextPage"
          disabled={curPage === maxPage}
          onClick={() => handlePagination("page", curPage + 1)}
        >
          <MdNavigateNext />
        </PaginationButton>
      </PaginationWrapper>
    </StyledFooter>
  );
}

export default Pagination;
