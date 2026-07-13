// 獲取菜單(所有餐點)數據
import { useQuery } from "@tanstack/react-query";
import { getMenusApi } from "../../../services/apiMenus";
import { useMemo } from "react";

function useGetMenus() {
  const menusQuery = useQuery({
    queryKey: ["menus"],
    queryFn: getMenusApi,
  });

  // 取得所有餐點分類
  const categories = useMemo(() => {
    if (!menusQuery.data) return [];

    return Array.from(new Set(menusQuery.data.map((m) => m.category)));
  }, [menusQuery.data]);

  // 所有分類選項
  const categoriesOptions = useMemo(() => {
    return categories.map((category) => ({
      label: category,
      value: category,
    }));
  }, [categories]);

  return { menusQuery, categories, categoriesOptions };
}

export default useGetMenus;
