// Pagination.tsx
import React, { useState } from "react";
import styled from "styled-components";

const PaginationWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  padding: 16px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 600px) {
    justify-content: space-between;
  }
`;

const PageInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    min-width: 60px;
    text-align: center;
  }

  button {
    padding: 4px 8px;
    font-size: 14px;
  }
`;

const PageJump = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  input {
    width: 60px;
    padding: 4px 6px;
  }

  button {
    padding: 4px 8px;
  }
`;

const Select = styled.select`
  padding: 4px 6px;
`;

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(3);
  const totalPages = 10;
  const [pageSize, setPageSize] = useState(10);
  const [jumpInput, setJumpInput] = useState("");

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <PaginationWrapper>
      <Section>
        <label>每頁顯示：</label>
        <Select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          <option value={10}>10 筆</option>
          <option value={25}>25 筆</option>
          <option value={50}>50 筆</option>
        </Select>
      </Section>

      <PageInfo>
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ←
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          →
        </button>
      </PageInfo>

      <PageJump>
        <input
          type="number"
          value={jumpInput}
          onChange={(e) => setJumpInput(e.target.value)}
          placeholder="頁碼"
        />
        <button onClick={() => goToPage(Number(jumpInput))}>Go</button>
      </PageJump>
    </PaginationWrapper>
  );
};

export default Pagination;
