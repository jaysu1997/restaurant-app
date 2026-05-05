// 菜單設定頁面
import { useSearchParams } from "react-router";
import { useState } from "react";
import MenuForm from "../features/menu-manage/MenuForm.jsx";
import Button from "../ui/Button";
import PageHeader from "../ui/PageHeader.jsx";
import useGetMenus from "../hooks/data/menus/useGetMenus.js";
import Filter from "../ui/Filter/Filter.jsx";
import QueryStatusFallback from "../ui/QueryStatusFallback.jsx";
import styled from "styled-components";
import { FilePlus } from "lucide-react";
import PageContainer from "../ui/PageContainer.jsx";
import useGetInventory from "../hooks/data/inventory/useGetInventory.js";
import DataDisplayCard from "../ui/DataDisplayCard.jsx";
import useDeleteMenu from "../hooks/data/menus/useDeleteMenu.js";
import ConfirmDelete from "../ui/ConfirmDelete.jsx";

const Container = styled.ul`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
  gap: 2.8rem;
`;

// 這個或許可以移動到filter helper中
function filterData(menusData, nameSearchParams, categorySearchParams) {
  if (!menusData) return menusData;

  let displayData = menusData;

  // 關鍵字篩選
  if (nameSearchParams && nameSearchParams !== "") {
    displayData = menusData.filter((menu) =>
      menu.name.includes(nameSearchParams),
    );
  }
  // 餐點分類篩選
  if (categorySearchParams && categorySearchParams !== "all") {
    displayData = displayData.filter(
      (menu) => menu.category === categorySearchParams,
    );
  }

  return displayData;
}

function MenuManage() {
  const [modal, setModal] = useState({ type: null, data: null });
  const [searchParams] = useSearchParams();
  const deleteMutation = useDeleteMenu();
  const { menus, menusIsLoading, menusIsError, menusError } = useGetMenus();
  const { inventoryObj, inventoryIsLoading, inventoryIsError, inventoryError } =
    useGetInventory();

  const nameSearchParams = searchParams.get("name");
  const categorySearchParams = searchParams.get("category");

  // 要展示的數據
  const displayMenusData = filterData(
    menus,
    nameSearchParams,
    categorySearchParams,
  );

  const emptyStateMessage =
    nameSearchParams || categorySearchParams
      ? "查無符合當前篩選條件的餐點數據"
      : "目前沒有任何餐點數據，請點擊新增餐點開始新建餐點數據。";

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
      placeholder: "選擇餐點分類",
      options: [
        ...Array.from(new Set(menus?.map((data) => data.category))).map(
          (category) => ({ label: category, value: category }),
        ),
      ],
    },
  ];

  return (
    <PageContainer>
      <PageHeader title="菜單設定">
        <div>
          <Button
            $iconSize="1.8rem"
            onClick={() => setModal({ type: "menuForm", data: null })}
          >
            <FilePlus />
            <span>新增餐點</span>
          </Button>
        </div>
        {!menusIsLoading && menus?.length > 0 && (
          <Filter filtersConfig={filtersConfig} />
        )}
      </PageHeader>

      <QueryStatusFallback
        status={{
          isLoading: menusIsLoading || inventoryIsLoading,
          isError: menusIsError || inventoryIsError,
          hasNoData: displayMenusData?.length === 0,
        }}
        errorFallback={menusError || inventoryError}
        noDataFallback={{ message: emptyStateMessage }}
      >
        <Container>
          {displayMenusData?.map((menu) => (
            <DataDisplayCard
              handleEditButton={() =>
                setModal({ type: "menuForm", data: menu })
              }
              handleDeleteButton={() =>
                setModal({ type: "confirmDelete", data: menu })
              }
              dataFormat={[
                { head: "名稱", body: menu.name },
                { head: "分類", body: menu.category },
                { head: "售價", body: menu.basePrice },
              ]}
              key={menu.id}
            />
          ))}
        </Container>

        {modal.type === "menuForm" && (
          <MenuForm
            inventoryObj={inventoryObj}
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
      </QueryStatusFallback>
    </PageContainer>
  );
}

export default MenuManage;
