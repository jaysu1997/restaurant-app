import { X } from "lucide-react";
import FormInput from "../../ui/FormInput";

function SearchFilter({ filterValue, handleValueChange, ...filters }) {
  const { queryKey, placeholder, inputType } = filters;

  return (
    <FormInput
      placeholder={placeholder}
      value={filterValue}
      onChange={(e) => {
        const finalValue =
          inputType === "number"
            ? e.target.value.replace(/\D/g, "")
            : e.target.value;

        handleValueChange(queryKey, finalValue);
      }}
      button={{
        icon: <X />,
        action: () => handleValueChange(queryKey, ""),
      }}
    />
  );
}

export default SearchFilter;
