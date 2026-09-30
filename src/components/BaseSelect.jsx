import { useEffect, useState } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

const selectStyle = {
  container: (base) => ({
    ...base,
    width: "100%",
  }),
  control: (base, state) => {
    const hasError = state.selectProps.error;

    return {
      ...base,
      height: "4.2rem",
      minHeight: "4.2rem",
      borderRadius: "8px",
      borderColor: hasError
        ? "#dc2626"
        : state.isFocused
          ? "#2684ff"
          : "#d1d5db",

      boxShadow:
        hasError && state.isFocused
          ? "0 0 0 3px rgba(220,38,38,.15)"
          : !hasError && state.isFocused
            ? "0 0 0 3px rgba(38,132,255,.15)"
            : "none",

      "&:hover": {
        borderColor: hasError
          ? "#dc2626"
          : state.isFocused
            ? "#2684ff"
            : "#bbb",
      },
    };
  },
  valueContainer: (base) => ({
    ...base,
    paddingRight: 0,
  }),
  singleValue: (base) => ({
    ...base,
    fontSize: "1.4rem",
    fontWeight: "400",
    marginRight: 0,
  }),
  placeholder: (base) => ({
    ...base,
    color: "#94a3b8",
    fontSize: "1.4rem",
    fontWeight: "400",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }),
  input: (base) => ({
    ...base,
    maxWidth: "100%",
    overflow: "hidden",
    margin: 0,
    fontSize: "1.4rem",
    fontWeight: "400",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    marginRight: "4px",
    padding: "0px 4px",
    "& svg": {
      width: "1.6rem",
      height: "1.6rem",
    },
  }),
  clearIndicator: (base) => ({
    ...base,
    padding: "0px 4px",
    "& svg": {
      width: "1.6rem",
      height: "1.6rem",
    },
  }),
  option: (base) => ({
    ...base,
    fontSize: "1.4rem",
    fontWeight: "400",
  }),
  menuPortal: (base) => ({
    ...base,
    zIndex: 9999,
  }),
};

// 基礎 react select 樣式元件
function BaseSelect({ isCreatable = false, error, ...rest }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const handleScroll = (e) => {
      const target = e.target;

      // 下拉選單內滾動
      if (target?.closest?.(".rs__menu")) return;

      // input 自動水平滾動 (新增選項輸入的文字太長會發生自動滾動)
      if (target?.closest?.(".rs__input-container")) return;

      setMenuOpen(false);
      document.activeElement?.blur();
    };

    document.addEventListener("scroll", handleScroll, true);

    return () => {
      document.removeEventListener("scroll", handleScroll, true);
    };
  }, [menuOpen]);

  const Component = isCreatable ? CreatableSelect : Select;

  return (
    <Component
      // 這樣才能生成classname選取
      classNamePrefix="rs"
      isSearchable={isCreatable}
      isClearable={isCreatable}
      styles={selectStyle}
      error={error}
      formatCreateLabel={(inputValue) => `新增 "${inputValue}"`}
      menuPosition="fixed"
      menuPlacement="bottom"
      menuIsOpen={menuOpen}
      onMenuOpen={() => setMenuOpen(true)}
      onMenuClose={() => setMenuOpen(false)}
      components={{ IndicatorSeparator: () => null }}
      {...rest}
    />
  );
}

export default BaseSelect;
