import { useEffect, useState } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

const selectStyle = {
  container: (base) => ({ ...base, width: "100%" }),
  input: (base) => ({ ...base, maxWidth: "100%", overflow: "hidden" }),
  control: (base, state) => ({
    ...base,
    fontSize: "1.4rem",
    fontWeight: "400",
    height: "3.8rem",
    borderColor: state.isFocused ? "#2684FF" : "#ddd",
    "&:hover": {
      borderColor: state.isFocused ? "#2684FF" : "#bbb",
    },
  }),
  menuList: (base) => ({
    ...base,
    fontSize: "1.4rem",
    fontWeight: "400",
    color: "#000",
  }),
  menuPortal: (base) => ({ ...base, zIndex: "9999" }),
};

// 基礎 react select 樣式元件
function StyledSelect({ creatable = false, ...rest }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const handleScroll = (e) => {
      const target = e.target;

      // 在 select menu 上滾動OK
      if (target && target?.classList?.contains("rs__menu-list")) return;
      // 外部滾動則關閉 + blur input
      setMenuOpen(false);
    };

    document.addEventListener("scroll", handleScroll, true);

    return () => {
      document.removeEventListener("scroll", handleScroll, true);
    };
  }, [menuOpen]);

  const Component = creatable ? CreatableSelect : Select;

  return (
    <Component
      // 這樣才能生成classname選取
      classNamePrefix="rs"
      isSearchable={creatable}
      isClearable={creatable}
      styles={selectStyle}
      formatCreateLabel={(inputValue) => `新增食材: ${inputValue}`}
      menuPosition="fixed"
      menuPlacement="bottom"
      menuIsOpen={menuOpen}
      onMenuOpen={() => setMenuOpen(true)}
      onMenuClose={() => setMenuOpen(false)}
      components={{
        IndicatorSeparator: () => null,
      }}
      {...rest}
    />
  );
}

export default StyledSelect;
