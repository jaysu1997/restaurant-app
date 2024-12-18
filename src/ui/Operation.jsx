// 操作選擇(篩選菜單數據的方式)

import styled from "styled-components";
import Filter from "./Filter";
import SearchField from "./SearchField";
import { useLocation, useNavigate } from "react-router-dom";
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
  const [feature, setFeature] = useState("filter");
  // 取得當前的pathname
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // 切換數據篩選方式時，清除舊有的所有篩選條件(顯示所有數據)
  function handleChange(e) {
    setFeature(e.target.value);
    navigate(pathname);
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
