// 菜單設定的數據篩選器
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Select from "react-select";
import { clear } from "../features/order/orderSlice";

function Filter({ dataArray, field, selectTitle }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [optionValue, setOptionValue] = useState(
    JSON.parse(searchParams.get(field)) || ""
  );

  // 使用Set()過濾重複的分類
  const categoryList = [...new Set(dataArray.map((data) => data.category))];

  const options = {
    quantity: [
      { label: "數量 < 100", value: "100" },
      { label: "數量 < 50", value: "50" },
      { label: "數量 < 10", value: "10" },
      { label: "數量 = 0", value: "1" },
    ],
    category: categoryList.map((category) => ({
      label: category,
      value: category,
    })),
  };

  // 根據選擇的option值來改變URL的searchParams
  function handleFilter(e) {
    setOptionValue(e);
    searchParams.set(field, JSON.stringify(e) || "all");
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={[{ label: "不限", value: "all" }, ...options[field]]}
      value={optionValue}
      onChange={handleFilter}
      placeholder={selectTitle}
      isSearchable={false}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          height: "3.6rem",
          minHeight: "3.6rem",
          width: "14rem",
          fontSize: "1.4rem",
        }),
      }}
    />
  );
}

export default Filter;
