// 食材備料頁面
import styled from "styled-components";
import { useState } from "react";
import InventoryForm from "../features/inventory/InventoryForm";
import { useSearchParams } from "react-router";
import PageHeader from "../components/PageHeader";
import useGetInventory from "../hooks/data/inventory/useGetInventory";
import Filter from "../components/Filter/Filter";
import QueryStatusFallback from "../components/QueryStatusFallback";
import { FilePlus } from "lucide-react";
import PageContainer from "../components/PageContainer";
import RelatedMenus from "../features/inventory/RelatedMenus";
import useDeleteInventory from "../hooks/data/inventory/useDeleteInventory";
import ConfirmDelete from "../components/ConfirmDelete";
import MenuForm from "../features/menu-manage/MenuForm";
import HeaderActionButton from "../components/button/HeaderActionButton";
import { hasActiveFilters, parseFilterQuery } from "../utils/filterHelpers";
import DataDisplayCard from "../components/DataDisplayCard";

const Container = styled.ul`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  gap: 2.8rem;
`;

function filterData(inventoryData, filterState) {
  let displayData = inventoryData;

  const nameSearchParams = filterState.name.value;
  const quantitySearchParams = filterState.quantity.value;

  if (nameSearchParams) {
    displayData = inventoryData.filter((inventory) =>
      inventory.name.includes(nameSearchParams),
    );
  }

  if (quantitySearchParams) {
    displayData = displayData.filter(
      (inventory) =>
        inventory.remainingQuantity <= Number(quantitySearchParams),
    );
  }

  return displayData;
}

function Inventory() {
  const [modal, setModal] = useState({
    type: null,
    inventory: null,
    menu: null,
  });
  const deleteMutation = useDeleteInventory();
  const [searchParams] = useSearchParams();
  const inventoryQuery = useGetInventory();
  const { data: inventory = [], inventoryObj } = inventoryQuery;

  const filtersConfig = [
    {
      title: "食材名稱",
      type: "textInput",
      queryKey: "name",
      placeholder: "搜尋食材名稱",
    },
    {
      title: "庫存數量",
      type: "select",
      queryKey: "quantity",
      options: [
        { label: "已耗盡", value: "0" },
        { label: "10 以下", value: "10" },
        { label: "50 以下", value: "50" },
        { label: "100 以下", value: "100" },
      ],
    },
  ];

  const filterState = parseFilterQuery(searchParams, filtersConfig);

  // 要展示的數據
  const displayInventoryData = filterData(inventory, filterState);

  const hasAppliedFilters = hasActiveFilters(filterState);

  const emptyStateMessage = hasAppliedFilters
    ? "查無符合當前篩選條件的食材數據"
    : "目前沒有任何食材數據，請點擊新增食材開始新建食材數據。";

  const onClose = () => setModal({ type: null, inventory: null, menu: null });

  return (
    <>
      <PageContainer>
        <PageHeader title="庫存管理">
          <HeaderActionButton
            onClick={() =>
              setModal({ type: "inventoryForm", inventory: null, menu: null })
            }
          >
            <FilePlus />
            <span>新增</span>
          </HeaderActionButton>

          {inventory.length > 0 && (
            <Filter filtersConfig={filtersConfig} filterState={filterState} />
          )}
        </PageHeader>

        <QueryStatusFallback
          queries={[inventoryQuery]}
          hasNoData={displayInventoryData.length === 0}
          noDataFallback={{
            message: emptyStateMessage,
          }}
        >
          <Container>
            {displayInventoryData.map((item) => (
              <DataDisplayCard
                handleEditButton={() =>
                  setModal({
                    type: "inventoryForm",
                    inventory: item,
                    menu: null,
                  })
                }
                handleDeleteButton={() =>
                  setModal({
                    type: "confirmDelete",
                    inventory: item,
                    menu: null,
                  })
                }
                dataFormat={[
                  { label: "名稱", value: item.name },
                  { label: "數量", value: `${item.remainingQuantity} 份` },
                ]}
                key={item.id}
              />
            ))}
          </Container>
        </QueryStatusFallback>
      </PageContainer>

      {modal.type === "inventoryForm" && (
        <InventoryForm inventory={modal.inventory} onClose={onClose} />
      )}

      {modal.type === "confirmDelete" && (
        <ConfirmDelete
          onClose={onClose}
          deleteMutation={deleteMutation}
          data={modal.inventory}
          render={({ setIsDeleteDisabled }) => (
            <>
              <p>
                請確認是否要刪除
                <strong> {modal.inventory.name} </strong>?
              </p>
              <p>此食材若被餐點使用，需先進入餐點中移除相關設定後才能刪除。</p>

              <RelatedMenus
                ingredientId={modal.inventory.id}
                setModal={setModal}
                setIsDeleteDisabled={setIsDeleteDisabled}
              />
            </>
          )}
        />
      )}

      {modal.type === "menuForm" && (
        <MenuForm
          onClose={() =>
            setModal((prev) => ({
              ...prev,
              type: "confirmDelete",
              menu: null,
            }))
          }
          menu={modal.menu}
          inventoryObj={inventoryObj}
        />
      )}
    </>
  );
}

export default Inventory;
