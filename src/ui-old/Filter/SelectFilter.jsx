import Select from "react-select";

function SelectFilter({ filterValue, handleValueChange, ...filters }) {
  const { queryKey, placeholder, options } = filters;

  return (
    <Select
      options={options}
      value={filterValue}
      onChange={(e) => handleValueChange(queryKey, e)}
      placeholder={placeholder}
      isSearchable={false}
      components={{
        IndicatorSeparator: () => null,
      }}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          "&:hover": {
            borderColor: baseStyles.borderColor,
          },
        }),
      }}
    />
  );
}

export default SelectFilter;
