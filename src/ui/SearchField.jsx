// 菜單餐點關鍵字搜尋功能

import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { IoSearch, IoCloseCircleSharp } from "react-icons/io5";

const StyleSearchField = styled.div`
  border: none;
  outline: 1px solid #c6c6c6;
  height: 3.6rem;
  width: 24rem;
  border-radius: 50px;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  align-items: center;

  & input {
    border: none;
    outline: none;
    height: 100%;
    width: 100%;
  }

  & button,
  & div {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    padding: 0 1.2rem;
    background-color: transparent;
    width: fit-content;
    height: 100%;
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
  }
`;

function SearchField() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isComposing, setIsComposing] = useState(false);
  const [keyWord, setKeyWord] = useState(searchParams.get("name") || "");

  function handleInputChange(e) {
    const value = e.target.value;
    setKeyWord(value);

    // 如果不是組合輸入，立即更新 searchParams
    if (!isComposing) {
      updateSearchParams(value);
    }
  }

  function updateSearchParams(value) {
    searchParams.set("name", value || "all");
    setSearchParams(searchParams);
  }

  return (
    <StyleSearchField>
      <div>
        <IoSearch />
      </div>

      <input
        type="text"
        name="keyword"
        placeholder="搜尋名稱"
        value={keyWord}
        // 組合輸入不會馬上觸發onChange執行(中文)
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={(e) => {
          setIsComposing(false);
          updateSearchParams(e.target.value);
        }}
        onChange={handleInputChange}
      />

      {keyWord && (
        <button
          type="button"
          onClick={() => {
            setKeyWord("");
            updateSearchParams("");
          }}
        >
          <IoCloseCircleSharp />
        </button>
      )}
    </StyleSearchField>
  );
}

export default SearchField;
