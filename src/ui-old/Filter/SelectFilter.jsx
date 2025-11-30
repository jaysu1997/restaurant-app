import Select from "react-select";

function SelectFilter({ filterValue, handleValueChange, ...filters }) {
  const { queryKey, placeholder, options } = filters;

  return (
    <Select
      options={options}
      value={filterValue}
      onChange={(e) => handleValueChange(queryKey, e)}
      placeholder={placeholder}
      menuPosition="fixed"
      menuPlacement="bottom"
      maxMenuHeight={200}
      isSearchable={false}
      components={{
        IndicatorSeparator: () => null,
      }}
    />
  );
}

export default SelectFilter;
