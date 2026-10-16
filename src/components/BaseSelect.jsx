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
      borderRadius: "var(--radius-lg)",
      borderColor: hasError
        ? "var(--color-danger)"
        : state.isFocused
          ? "var(--color-focus)"
          : "var(--color-border-strong)",

      boxShadow:
        hasError && state.isFocused
          ? "var(--shadow-focus-error)"
          : !hasError && state.isFocused
            ? "var(--shadow-focus-control)"
            : "none",

      "&:hover": {
        borderColor: hasError
          ? "var(--color-danger)"
          : state.isFocused
            ? "var(--color-focus)"
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
    fontSize: "var(--font-size-sm)",
    fontWeight: "var(--font-weight-regular)",
    marginRight: 0,
  }),
  placeholder: (base) => ({
    ...base,
    color: "var(--color-text-placeholder)",
    fontSize: "var(--font-size-sm)",
    fontWeight: "var(--font-weight-regular)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }),
  input: (base) => ({
    ...base,
    maxWidth: "100%",
    overflow: "hidden",
    margin: 0,
    fontSize: "var(--font-size-sm)",
    fontWeight: "var(--font-weight-regular)",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    marginRight: "4px",
    padding: "0 var(--space-1)",
    "& svg": {
      width: "1.6rem",
      height: "1.6rem",
    },
  }),
  clearIndicator: (base) => ({
    ...base,
    padding: "0 var(--space-1)",
    "& svg": {
      width: "1.6rem",
      height: "1.6rem",
    },
  }),
  option: (base) => ({
    ...base,
    fontSize: "var(--font-size-sm)",
    fontWeight: "var(--font-weight-regular)",
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
      onKeyDown={(e) => {
        if (!menuOpen) return;

        // 避免選單操作觸發外層快捷鍵
        if (e.key === "Escape" || e.key === "Enter") {
          e.stopPropagation();
        }
      }}
      {...rest}
    />
  );
}

export default BaseSelect;
