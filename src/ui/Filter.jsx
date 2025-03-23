// 菜單設定的數據篩選器
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Select from "react-select";

function Filter({ optionsArray, field, selectTitle }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [optionValue, setOptionValue] = useState(
    optionsArray.filter((data) => data.value === searchParams.get(field))
  );

  // 根據選擇的option值來改變URL的searchParams
  function handleFilter(e) {
    // react-select需要固定的物件格式才能順利使用選項，所以只好上傳物件數據
    setOptionValue(e);

    searchParams.set(field, e.value ?? "all");
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={optionsArray}
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
