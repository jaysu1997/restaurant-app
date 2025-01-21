// 由React-Select提供的Select和CreatableSelect元件

import { useController } from "react-hook-form";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

const selectStyle = {
  container: (baseStyles) => ({
    ...baseStyles,
    width: "100%",
  }),
  control: (baseStyles) => ({
    ...baseStyles,
    border: "none",
    backgroundColor: "inherit",
    boxShadow: "none",
    fontSize: "1.4rem",
    minHeight: "2rem",
    fontWeight: "400",
  }),
  menuList: (baseStyles) => ({
    ...baseStyles,
    maxHeight: "30dvh",
    overflowY: "auto",
  }),
};

function ControlledSelect({
  creatable = true,
  name,
  control,
  rules,
  options,
  handleCreateNewItems,
  disabled,
}) {
  const { field } = useController({ name, control, rules });

  return (
    <>
      {creatable ? (
        <CreatableSelect
          {...field}
          styles={selectStyle}
          formatCreateLabel={(inputValue) => `新增食材: ${inputValue}`}
          options={options}
          isClearable
          isDisabled={disabled}
          placeholder="可新增/選擇食材"
          onCreateOption={(optionValue) => {
            handleCreateNewItems(optionValue, field.name);
          }}
        />
      ) : (
        <Select
          {...field}
          styles={selectStyle}
          options={options}
          isSearchable={false}
          isDisabled={disabled}
        />
      )}
    </>
  );
}

export default ControlledSelect;
