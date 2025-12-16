import Select from "react-select";

function SelectFilter({ filterValue, handleValueChange, ...filters }) {
  const { queryKey, placeholder, options } = filters;

  // 或許這個select也可以設計成一個共用的ui元件
  return (
    <Select
      options={options}
      value={filterValue}
      onChange={(e) => handleValueChange(queryKey, e)}
      placeholder={placeholder}
      menuPosition="fixed"
      menuPlacement="bottom"
      isSearchable={false}
      components={{
        IndicatorSeparator: () => null,
      }}
      styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
    />
  );
}

export default SelectFilter;
