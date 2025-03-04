// 菜單餐點關鍵字搜尋功能

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { IoSearch, IoCloseCircleSharp } from "react-icons/io5";

const StyleSearchField = styled.div`
  height: 3.6rem;
  width: 24rem;
  border-radius: 50px;
  background-color: #dedede;
  /* box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2); */
  overflow: hidden;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  height: 100%;
  width: 100%;
  font-size: 1.4rem;
  background-color: #dedede;

  &::placeholder {
    color: #57534e;
    font-weight: 600;
  }
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1.2rem;
  width: fit-content;
  height: 100%;

  & svg {
    width: 1.8rem;
    height: 1.8rem;
  }
`;

function SearchField({ placeholder = "搜尋名稱" }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isComposing, setIsComposing] = useState(false);
  const [keyWord, setKeyWord] = useState(searchParams.get("name") || "");

  // 根據searchParams來更新搜尋框內的關鍵字
  useEffect(
    function () {
      const searchKey = searchParams.get("name");
      setKeyWord(searchKey || "");
    },
    [searchParams]
  );

  // 用來更新searchParams
  function updateSearchParams(value) {
    searchParams.set("name", value || "");
    setSearchParams(searchParams);
  }

  // 如果是組合字體(例如中文)就不會馬上觸發搜尋功能，要等到選完字才觸發
  function handleInputChange(e) {
    const value = e.target.value;
    setKeyWord(value);

    // 如果不是組合輸入，立即更新 searchParams
    if (!isComposing) {
      updateSearchParams(value);
    }
  }

  return (
    <StyleSearchField>
      <Icon>
        <IoSearch />
      </Icon>

      <Input
        type="text"
        name="keyword"
        autoComplete="off"
        placeholder={placeholder}
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
        <Icon
          role="clearFieldButton"
          as="button"
          type="button"
          onClick={() => {
            setKeyWord("");
            updateSearchParams("");
          }}
        >
          <IoCloseCircleSharp />
        </Icon>
      )}
    </StyleSearchField>
  );
}

export default SearchField;
