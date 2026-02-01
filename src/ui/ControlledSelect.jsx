import { useController, useFormContext } from "react-hook-form";
import StyledSelect from "../ui/StyledSelect";

function ControlledSelect({
  name,
  rules,
  options,
  disabled,
  creatable = false,
  placeholder = null,
}) {
  const { control } = useFormContext();
  const { field } = useController({ name, control, rules });

  return (
    <StyledSelect
      {...field}
      creatable={creatable}
      options={options}
      isDisabled={disabled}
      placeholder={placeholder}
      components={{
        IndicatorSeparator: () => null,
        DropdownIndicator: () => null,
      }}
    />
  );
}

export default ControlledSelect;
