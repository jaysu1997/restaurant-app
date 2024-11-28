// 菜單餐點關鍵字搜尋功能

import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyleSearchField = styled.form`
  display: flex;
  gap: 0.6rem;

  & button {
    padding: 0.6rem;
    width: 3.6rem;
    height: 3.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & button svg {
    height: 2rem;
    width: 2rem;
  }
`;

function SearchField() {
  // React Router提供的searchParams功能
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyWord, setKeyWord] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    searchParams.delete("category");
    searchParams.set("name", keyWord || "all");
    setSearchParams(searchParams);
    setKeyWord("");
  }

  return (
    <StyleSearchField onSubmit={handleSubmit}>
      <input
        type="text"
        name="keyword"
        value={keyWord}
        placeholder="請輸入關鍵字"
        required
        onChange={(e) => setKeyWord(e.target.value)}
      />
      <button>
        <BsSearch />
      </button>
    </StyleSearchField>
  );
}

export default SearchField;
