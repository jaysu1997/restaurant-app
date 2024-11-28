// 操作選擇(篩選菜單數據的方式)

import styled from "styled-components";
import Filter from "./Filter";
import SearchField from "./SearchField";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

const StyleOperation = styled.div`
  display: flex;
  gap: 1.6rem;
`;

const Select = styled.select`
  height: 3.6rem;
  font-size: 1.4rem;
`;

function Operation({ menusData }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [feature, setFeature] = useState("filter");

  // 切換數據篩選方式時，清除舊有的所有篩選條件(顯示所有數據)
  function handleChange(e) {
    setFeature(e.target.value);
    searchParams.delete("category");
    searchParams.delete("name");
    setSearchParams(searchParams);
  }

  return (
    <StyleOperation>
      <Select value={feature} onChange={handleChange}>
        <option value="filter">分類篩選</option>
        <option value="search">名稱搜尋</option>
      </Select>
      {feature === "filter" && <Filter menusData={menusData} />}
      {feature === "search" && <SearchField />}
    </StyleOperation>
  );
}

export default Operation;
