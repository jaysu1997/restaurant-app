// 由React-Select提供的Select和CreatableSelect元件
import { useController } from "react-hook-form";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

const selectStyle = {
  creatable: {
    input: (base) => ({
      ...base,
      maxWidth: "100%",
      overflow: "hidden",
    }),
    container: (baseStyles) => ({
      ...baseStyles,
      width: "100%",
      maxWidth: "100%",
    }),
    control: (baseStyles) => ({
      ...baseStyles,
      border: "none",
      boxShadow: "none",
      fontWeight: "400",
    }),
    menuList: (baseStyles) => ({
      ...baseStyles,
      maxHeight: "30dvh",
      overflowY: "auto",
    }),
  },
  notCreatable: {
    container: (baseStyles) => ({
      ...baseStyles,
      width: "100%",
    }),
    control: (baseStyles) => ({
      ...baseStyles,
      fontWeight: "400",
    }),
  },
};

// 移除下拉箭頭和分隔線
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
  creatable = true,
  placeholder = null,
}) {
  const { field } = useController({ name, control, rules });

  return (
    <>
      {creatable ? (
        <CreatableSelect
          {...field}
          styles={selectStyle.creatable}
          formatCreateLabel={(inputValue) => `新增食材: ${inputValue}`}
          options={options}
          isClearable
          isDisabled={disabled}
          menuPosition="fixed"
          placeholder={placeholder}
          onCreateOption={(optionValue) => {
            handleCreateNewItems(optionValue, field.name);
          }}
          components={customComponents}
        />
      ) : (
        <Select
          {...field}
          styles={selectStyle.notCreatable}
          maxMenuHeight={280}
          menuPortalTarget={document.body}
          menuPosition="fixed"
          isSearchable={false}
          options={options}
          isDisabled={disabled}
          placeholder={placeholder}
          components={customComponents}
        />
      )}
    </>
  );
}

export default ControlledSelect;
