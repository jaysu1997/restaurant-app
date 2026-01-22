import StyledSelect from "../../ui/StyledSelect";

function SelectFilter({ filterValue, handleValueChange, ...filters }) {
  const { queryKey, placeholder, options } = filters;

  return (
    <StyledSelect
      options={options}
      value={filterValue}
      onChange={(e) => handleValueChange(queryKey, e)}
      placeholder={placeholder}
    />
  );
}

export default SelectFilter;
