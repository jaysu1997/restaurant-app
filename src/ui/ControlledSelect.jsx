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
  menuPlacement = "auto",
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
          menuPlacement={menuPlacement}
          placeholder={placeholder}
          onCreateOption={(optionValue) => {
            handleCreateNewItems(optionValue, field.name);
          }}
        />
      ) : (
        <Select
          {...field}
          maxMenuHeight={280}
          menuPortalTarget={document.body}
          menuShouldBlockScroll
          isSearchable={false}
          options={options}
          menuPlacement={menuPlacement}
          placeholder={placeholder}
        />
      )}
    </>
  );
}

export default ControlledSelect;
