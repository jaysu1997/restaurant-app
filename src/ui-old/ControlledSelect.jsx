import { useController } from "react-hook-form";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

const selectStyle = {
  input: (base) => ({ ...base, maxWidth: "100%", overflow: "hidden" }),
  container: (base) => ({ ...base, width: "100%" }),
  control: (base) => ({ ...base, fontSize: "1.4rem" }),
  menuList: (base) => ({ ...base, fontSize: "1.4rem", color: "#000" }),
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
};

const customComponents = {
  DropdownIndicator: () => null,
  IndicatorSeparator: () => null,
};

function ControlledSelect({
  name,
  control,
  rules,
  options,
  handleCreateNewItems,
  disabled,
  creatable = false,
  placeholder = null,
}) {
  const { field } = useController({ name, control, rules });

  const Component = creatable ? CreatableSelect : Select;

  const creatableProps = creatable
    ? {
        isClearable: true,
        isSearchable: true,
        formatCreateLabel: (inputValue) => `新增食材: ${inputValue}`,
        onCreateOption: (optionValue) =>
          handleCreateNewItems(optionValue, field.name),
      }
    : {
        isClearable: false,
        isSearchable: false,
      };

  return (
    <Component
      {...field}
      styles={selectStyle}
      menuPortalTarget={document.body}
      menuPosition="fixed"
      components={customComponents}
      options={options}
      isDisabled={disabled}
      placeholder={placeholder}
      {...creatableProps} // 👈 根據 creatable 動態加入特定 props
    />
  );
}

export default ControlledSelect;
