// 菜單設定頁面
import { useSearchParams } from "react-router";
import { useState } from "react";
import MenuForm from "../features/menu-manage/components/MenuForm.jsx";
import PageHeader from "../components/PageHeader.jsx";
import useGetMenus from "../hooks/data/menus/useGetMenus.js";
import Filter from "../components/Filter/Filter.jsx";
import QueryStatusFallback from "../components/QueryStatusFallback.jsx";
import styled from "styled-components";
import { FilePlus } from "lucide-react";
import PageContainer from "../components/PageContainer.jsx";
import useGetInventory from "../hooks/data/inventory/useGetInventory.js";
import DataDisplayCard from "../components/DataDisplayCard.jsx";
import useDeleteMenu from "../hooks/data/menus/useDeleteMenu.js";
import ConfirmDelete from "../components/ConfirmDelete.jsx";
import HeaderActionButton from "../components/button/HeaderActionButton.jsx";
import { hasActiveFilters, parseFilterQuery } from "../utils/queryFilters.js";
import { filterMenuData } from "../features/menu-manage/utils/menuFilters.js";

const Container = styled.ul`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
  gap: var(--space-7);
`;

function MenuManage() {
  const [modal, setModal] = useState({ type: null, data: null });
  const [searchParams] = useSearchParams();
  const deleteMutation = useDeleteMenu();
  const { menusQuery, categoriesOptions } = useGetMenus();
  const inventoryQuery = useGetInventory();

  const { data: menus = [] } = menusQuery;

  const filtersConfig = [
    {
      title: "餐點名稱",
      type: "textInput",
      queryKey: "name",
      placeholder: "搜尋餐點名稱",
    },
    {
      title: "餐點分類",
      type: "select",
      queryKey: "category",
      options: categoriesOptions,
    },
  ];

  // 從url取得filter並做部分檢查
  const filterState = parseFilterQuery(searchParams, filtersConfig);
  // 要展示的數據
  const displayMenusData = filterMenuData(menus, filterState);
  // 是否有套用中的篩選條件
  const hasAppliedFilters = hasActiveFilters(filterState);

  const emptyStateMessage = hasAppliedFilters
    ? "查無符合當前篩選條件的餐點數據"
    : "目前沒有任何餐點數據，請點擊新增餐點開始新建餐點數據。";

  return (
    <>
      <PageContainer>
        <PageHeader title="菜單設定">
          <HeaderActionButton
            onClick={() => {
              setModal({ type: "menuForm", data: null });
            }}
          >
            <FilePlus />
            <span>新增</span>
          </HeaderActionButton>

          {menus.length > 0 && (
            <Filter filtersConfig={filtersConfig} filterState={filterState} />
          )}
        </PageHeader>

        <QueryStatusFallback
          queries={[menusQuery, inventoryQuery]}
          hasNoData={displayMenusData.length === 0}
          noDataFallback={{ message: emptyStateMessage }}
        >
          <Container>
            {displayMenusData.map((menu) => (
              <DataDisplayCard
                handleEditButton={() =>
                  setModal({ type: "menuForm", data: menu })
                }
                handleDeleteButton={() =>
                  setModal({ type: "confirmDelete", data: menu })
                }
                dataFormat={[
                  { label: "名稱", value: menu.name },
                  { label: "分類", value: menu.category },
                  {
                    label: "售價",
                    value: (menu.basePrice - menu.discount).toLocaleString(
                      "zh-TW",
                    ),
                  },
                ]}
                key={menu.id}
              />
            ))}
          </Container>
        </QueryStatusFallback>
      </PageContainer>

      {modal.type === "menuForm" && (
        <MenuForm
          categoriesOptions={categoriesOptions}
          inventoryObj={inventoryQuery.inventoryObj}
          menu={modal.data}
          onClose={() => setModal({ type: null, data: null })}
        />
      )}

      {modal.type === "confirmDelete" && (
        <ConfirmDelete
          onClose={() => setModal({ type: null, data: null })}
          deleteMutation={deleteMutation}
          data={modal.data}
          render={() => (
            <p>
              請確認是否要刪除<strong> {modal.data.name} </strong>?
            </p>
          )}
        />
      )}
    </>
  );
}

export default MenuManage;
