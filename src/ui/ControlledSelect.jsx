import { useController, useFormContext } from "react-hook-form";
import StyledSelect from "../ui/StyledSelect";

function ControlledSelect({
  inputId,
  name,
  rules,
  options,
  disabled,
  creatable = false,
  placeholder = null,
}) {
  const { control } = useFormContext();
  const { field } = useController({ name, control, rules });

  // 這有用嗎?
  // console.log(disabled);

  return (
    <StyledSelect
      {...field}
      inputId={inputId}
      creatable={creatable}
      options={options}
      isDisabled={disabled}
      placeholder={placeholder}
      filterOption={(option, inputValue) =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
      }
      components={{
        IndicatorSeparator: () => null,
        DropdownIndicator: () => null,
      }}
    />
  );
}

export default ControlledSelect;
