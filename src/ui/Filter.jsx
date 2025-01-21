// 菜單設定的數據篩選器
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Select from "react-select";

function Filter({ dataArray, field, selectTitle }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [optionValue, setOptionValue] = useState(
    JSON.parse(searchParams.get(field)) || ""
  );

  // 根據searchParams來更新篩選框內的選項
  useEffect(
    function () {
      const filterKey = JSON.parse(searchParams.get(field));
      setOptionValue(filterKey || "");
    },
    [searchParams, field]
  );

  // 餐點分類選項(使用Set()過濾重複的分類)
  const categoryList = Array.from(
    new Set(dataArray.map((data) => data.category))
  );

  // 備料食材數量選項
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
    // react-select需要固定的物件格式才能順利使用選項，所以只好上傳物件數據
    setOptionValue(e);
    // 物件不能直接當作searchParams，所以先轉成JSON格式
    searchParams.set(field, JSON.stringify(e) || "");
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={[{ label: "不篩選", value: "" }, ...options[field]]}
      value={optionValue}
      onChange={handleFilter}
      placeholder={`篩選${selectTitle}`}
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
