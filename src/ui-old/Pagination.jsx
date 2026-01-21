import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { useRef } from "react";
import { ChevronRight, ChevronLeft, Dot } from "lucide-react";
import { parsePositiveInt } from "../utils/helpers";

const StyledPagination = styled.footer`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1.6rem;
  padding: 3.6rem 0.5rem;
  font-size: 1.4rem;
`;

const PaginationControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  justify-content: center;

  svg {
    width: 2rem;
    height: 2rem;
    flex-shrink: 0;
  }

  strong {
    color: #2563eb;
  }

  button {
    display: inline-flex;
    color: #333;

    &:not(:disabled):hover {
      color: #e63946;
    }

    &:disabled {
      color: inherit;
      opacity: 0.5;
    }
  }
`;

const JumpSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;

  input {
    text-align: center;
    font-size: 1.4rem;
    border: 1px solid #e3e5e7;
    border-radius: 6px;
    width: 4.2rem;
    padding: 0.5rem 0.2rem;
  }

  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    font-weight: 600;
    padding: 0.3rem 0.6rem;
    height: 2.8rem;
    border-radius: 6px;
    background-color: #e63946;
    color: #fff;

    &:hover {
      background-color: #dc2626;
    }
  }
`;

function Pagination({ curPage, maxPage }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef(null);

  function handlePagination(value) {
    searchParams.set("page", value);
    setSearchParams(searchParams);
  }

  function handleSubmit() {
    const inputValue = parsePositiveInt(inputRef?.current?.value, {
      min: 1,
      fallback: 1,
    });
    handlePagination(Math.min(inputValue, maxPage));
    inputRef.current.value = "";
    inputRef.current?.blur();
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <StyledPagination>
      <PaginationControls>
        <button
          type="button"
          onClick={() => handlePagination(curPage - 1)}
          disabled={curPage === 1}
        >
          <ChevronLeft strokeWidth={3} />
        </button>
        <strong>{curPage}</strong>
        <Dot />
        <span>共 {maxPage} 頁</span>
        <button
          type="button"
          onClick={() => handlePagination(curPage + 1)}
          disabled={curPage === maxPage}
        >
          <ChevronRight strokeWidth={3} />
        </button>
      </PaginationControls>

      <JumpSection>
        <span>前往</span>
        <input type="text" ref={inputRef} onKeyDown={handleKeyDown} />
        <span>頁</span>
        <button onClick={handleSubmit} role="submit">
          GO
        </button>
      </JumpSection>
    </StyledPagination>
  );
}

export default Pagination;
