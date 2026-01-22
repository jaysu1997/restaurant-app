import Select from "react-select";
import CreatableSelect from "react-select/creatable";

const selectStyle = {
  input: (base) => ({ ...base, maxWidth: "100%", overflow: "hidden" }),
  container: (base) => ({ ...base, width: "100%" }),
  control: (base, state) => ({
    ...base,
    fontSize: "1.4rem",
    fontWeight: 400,
    height: "3.8rem",
    borderColor: state.isFocused ? "#2684FF" : "#ddd",
    "&:hover": {
      borderColor: state.isFocused ? "#2684FF" : "#bbb",
    },
  }),
  menuList: (base) => ({
    ...base,
    fontSize: "1.4rem",
    fontWeight: 400,
    color: "#000",
  }),
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
};

// 基礎 react select 樣式元件
function StyledSelect({ creatable, ...rest }) {
  const Component = creatable ? CreatableSelect : Select;

  return (
    <Component
      isSearchable={false}
      isClearable={false}
      styles={selectStyle}
      menuPosition="fixed"
      menuPlacement="bottom"
      components={{
        IndicatorSeparator: () => null,
      }}
      {...rest}
    />
  );
}

export default StyledSelect;
