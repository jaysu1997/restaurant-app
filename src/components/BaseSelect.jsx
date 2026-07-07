import { useEffect, useState } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

const selectStyle = {
  container: (base) => ({ ...base, width: "100%" }),
  input: (base) => ({ ...base, maxWidth: "100%", overflow: "hidden" }),
  control: (base, state) => {
    const hasError = state.selectProps.error;

    return {
      ...base,

      fontSize: "1.4rem",
      fontWeight: "400",
      height: "3.8rem",

      borderColor: hasError ? "#dc2626" : state.isFocused ? "#2684ff" : "#ddd",

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
  menuList: (base) => ({
    ...base,
    fontSize: "1.4rem",
    fontWeight: "400",
    color: "#000",
  }),
  menuPortal: (base) => ({ ...base, zIndex: "9999" }),
};

// 基礎 react select 樣式元件
function BaseSelect({
  isCreatable = false,
  error,
  showDropdownIndicator = false,
  ...rest
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const handleScroll = (e) => {
      const target = e.target;

      // 在 select menu 上滾動OK
      if (target && target?.classList?.contains("rs__menu-list")) return;

      // 外部滾動則關閉 + blur input
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
      formatCreateLabel={(inputValue) => `新增食材: ${inputValue}`}
      menuPosition="fixed"
      menuPlacement="bottom"
      menuIsOpen={menuOpen}
      onMenuOpen={() => setMenuOpen(true)}
      onMenuClose={() => setMenuOpen(false)}
      components={
        showDropdownIndicator
          ? {
              IndicatorSeparator: () => null,
            }
          : {
              IndicatorSeparator: () => null,
              DropdownIndicator: () => null,
            }
      }
      {...rest}
    />
  );
}

export default BaseSelect;
