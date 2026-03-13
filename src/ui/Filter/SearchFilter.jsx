import FormInput from "../../ui/FormInput";

function SearchFilter({ filterValue, handleValueChange, ...filters }) {
  const { queryKey, placeholder } = filters;

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
