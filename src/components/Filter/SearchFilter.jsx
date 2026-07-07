import BaseInput from "../BaseInput";

function SearchFilter({ filterValue, handleValueChange, filter }) {
  const { queryKey, placeholder } = filter;

  return (
    <BaseInput
      placeholder={placeholder}
      value={filterValue}
      onChange={(e) => {
        handleValueChange(queryKey, e.target.value);
      }}
    />
  );
}

export default SearchFilter;
