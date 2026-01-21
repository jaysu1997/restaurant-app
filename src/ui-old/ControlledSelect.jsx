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
  const { control, handleCreateNewItems = () => {} } = useFormContext();
  const { field } = useController({ name, control, rules });

  // CreatableSelect需要的props設定
  const creatableProps = {
    isClearable: true,
    isSearchable: true,
    formatCreateLabel: (inputValue) => `新增食材: ${inputValue}`,
    onCreateOption: (optionValue) =>
      handleCreateNewItems(optionValue.trim(), field.name),
  };

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
      {...(creatable ? creatableProps : {})}
    />
  );
}

export default ControlledSelect;
