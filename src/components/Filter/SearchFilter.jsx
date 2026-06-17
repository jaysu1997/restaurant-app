import FormInput from "../../ui/FormInput";

function SearchFilter({ filterValue, handleValueChange, filter }) {
  const { queryKey, placeholder } = filter;

  return (
    <FormInput
      placeholder={placeholder}
      value={filterValue}
      onChange={(e) => {
        handleValueChange(queryKey, e.target.value);
      }}
    />
  );
}

export default SearchFilter;
