// 菜單設定的數據篩選器
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const Select = styled.select`
  height: 3.6rem;
  font-size: 1.4rem;
`;

function Filter({ menusData }) {
  const [optionValue, setOptionValue] = useState("");

  // React Router提供的searchParams功能
  const [searchParams, setSearchParams] = useSearchParams();

  // 如果在使用搜尋功能，就將filter的value轉回初始狀態
  useEffect(
    function () {
      if (!searchParams.get("category")) setOptionValue("");
    },
    [searchParams]
  );

  // 使用Set()過濾重複的分類
  const categorys = [...new Set(menusData.map((menu) => menu.category))];

  // 根據選擇的option值來改變URL的searchParams
  function handleFilter(e) {
    setOptionValue(e.target.value);
    searchParams.delete("name");
    searchParams.set("category", e.target.value || "all");
    setSearchParams(searchParams);
  }

  return (
    <div>
      <Select value={optionValue} onChange={handleFilter}>
        <option value="">請選擇分類</option>
        <option value="all">全部</option>
        {categorys &&
          categorys.map((opt) => (
            <option value={opt} key={opt}>
              {opt}
            </option>
          ))}
      </Select>
    </div>
  );
}

export default Filter;
