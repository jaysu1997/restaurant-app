// 食材備料頁面
import styled from "styled-components";
import { useState } from "react";
import InventoryForm from "../features/inventory/InventoryForm";
import { useSearchParams } from "react-router";
import PageHeader from "../ui/PageHeader";
import useGetInventory from "../hooks/data/inventory/useGetInventory";
import Filter from "../ui/Filter/Filter";
import QueryStatusFallback from "../ui/QueryStatusFallback";
import Button from "../components/button/Button";
import { FilePlus } from "lucide-react";
import PageContainer from "../ui/PageContainer";
import DataDisplayCard from "../ui/DataDisplayCard";
import RelatedMenus from "../features/inventory/RelatedMenus";
import useDeleteInventory from "../hooks/data/inventory/useDeleteInventory";
import ConfirmDelete from "../ui/ConfirmDelete";
import MenuForm from "../features/menu-manage/MenuForm";

const Container = styled.ul`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  gap: 2.8rem;
`;

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
    placeholder: "選擇庫存剩餘量",
    options: [
      { label: "已耗盡", value: "0" },
      { label: "10 以下", value: "10" },
      { label: "50 以下", value: "50" },
      { label: "100 以下", value: "100" },
    ],
  },
];

function filterData(inventoryData, nameSearchParams, quantityKeyWord) {
  let displayData = inventoryData;

  if (nameSearchParams && nameSearchParams !== "") {
    displayData = inventoryData.filter((inventory) =>
      inventory.name.includes(nameSearchParams),
    );
  }

  if (quantityKeyWord && quantityKeyWord !== "all") {
    displayData = displayData.filter(
      (inventory) => inventory.remainingQuantity <= Number(quantityKeyWord),
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

  const nameSearchParams = searchParams.get("name");
  const quantitySearchParams = searchParams.get("quantity");

  // 要展示的數據
  const displayInventoryData = filterData(
    inventory,
    nameSearchParams,
    quantitySearchParams,
  );

  const emptyStateMessage =
    nameSearchParams || quantitySearchParams
      ? "查無符合當前篩選條件的食材數據"
      : "目前沒有任何食材數據，請點擊新增食材開始新建食材數據。";

  const onClose = () => setModal({ type: null, inventory: null, menu: null });

  return (
    <>
      <PageContainer>
        <PageHeader title="庫存管理">
          <div>
            <Button
              $iconSize="1.8rem"
              onClick={() =>
                setModal({ type: "inventoryForm", inventory: null, menu: null })
              }
            >
              <FilePlus />
              <span>新增食材</span>
            </Button>
          </div>
          {inventory.length > 0 && <Filter filtersConfig={filtersConfig} />}
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
                  { head: "名稱", body: item.name },
                  { head: "數量", body: `${item.remainingQuantity || 0} 份` },
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
              <p>此食材若被餐點使用，需先移除相關設定才能刪除。</p>

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
