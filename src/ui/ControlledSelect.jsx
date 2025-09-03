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
      fontSize: "1.4rem",
      fontWeight: "500",
    }),
    menuList: (baseStyles) => ({
      ...baseStyles,
      maxHeight: "30dvh",
      fontSize: "1.4rem",
      fontWeight: "500",
      color: "#000",
    }),
    menuPortal: (baseStyles) => ({ ...baseStyles, zIndex: 9999 }),
  },
  notCreatable: {
    container: (baseStyles) => ({
      ...baseStyles,
      width: "100%",
    }),
    control: (baseStyles) => ({
      ...baseStyles,
      fontSize: "1.4rem",
      fontWeight: "500",
    }),
    menuList: (baseStyles) => ({
      ...baseStyles,
      fontSize: "1.4rem",
      fontWeight: "500",
      color: "#000",
    }),
    menuPortal: (baseStyles) => ({ ...baseStyles, zIndex: 9999 }),
  },
};

// 移除下拉箭頭和分隔線
const customComponents = {
  DropdownIndicator: () => null,
  IndicatorSeparator: () => null,
};

// 這裡的元件樣式或許需要再調整，有些混亂
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
          menuPortalTarget={document.body}
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
