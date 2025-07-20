// 由React-Select提供的Select和CreatableSelect元件
import { useController } from "react-hook-form";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

const selectStyle = {
  creatable: {
    container: (baseStyles) => ({
      ...baseStyles,
      width: "100%",
    }),
    control: (baseStyles) => ({
      ...baseStyles,
      border: "none",
      boxShadow: "none",
      minHeight: "3.6rem",
      height: "3.6rem",
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
  },
};

const customComponents = {
  DropdownIndicator: () => null, // 移除下拉箭頭
  IndicatorSeparator: () => null, // 移除箭頭前的分隔線
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
