// 食材備料頁面
import styled from "styled-components";
import { useState } from "react";
import { BsFileEarmarkPlus } from "react-icons/bs";
import InventoryDataCard from "../features/inventory/InventoryDataCard";
import UpsertInventoryForm from "../features/inventory/UpsertInventoryForm";
import { useSearchParams } from "react-router-dom";
import PageHeader from "../ui/PageHeader";
import useGetInventory from "../hooks/data/inventory/useGetInventory";
import Filter from "../ui-old/Filter/Filter";
import QueryStatusFallback from "../ui-old/QueryStatusFallback";
import Button from "../ui/Button";

const Container = styled.ul`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(15.4rem, 1fr));
  justify-content: space-between;
  gap: 2.4rem;
`;

const filtersConfig = [
  {
    title: "食材名稱",
    type: "input",
    inputType: "text",
    queryKey: "name",
    placeholder: "搜尋食材名稱",
  },
  {
    title: "庫存數量",
    type: "select",
    queryKey: "quantity",
    placeholder: "選擇庫存剩餘量",
    options: [
      { label: "不篩選", value: "all" },
      { label: "庫存低於100", value: "100" },
      { label: "庫存低於50", value: "50" },
      { label: "庫存低於10", value: "10" },
      { label: "庫存已耗盡", value: "0" },
    ],
  },
];

function filterData(inventoryData, nameSearchParams, quantityKeyWord) {
  if (!inventoryData) return inventoryData;

  let displayData = inventoryData;

  if (nameSearchParams && nameSearchParams !== "") {
    displayData = inventoryData.filter((inventory) =>
      inventory.label.includes(nameSearchParams)
    );
  }

  if (quantityKeyWord && quantityKeyWord !== "all") {
    displayData = displayData.filter(
      (inventory) => inventory.remainingQuantity <= Number(quantityKeyWord)
    );
  }

  return displayData;
}

function Inventory() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [searchParams] = useSearchParams();
  const {
    inventoryData,
    inventoryIsPending,
    inventoryError,
    inventoryIsError,
  } = useGetInventory();

  const nameSearchParams = searchParams.get("name");
  const quantitySearchParams = searchParams.get("quantity");

  // 要展示的數據
  const displayInventoryData = filterData(
    inventoryData,
    nameSearchParams,
    quantitySearchParams
  );

  const emptyStateMessage =
    nameSearchParams || quantitySearchParams
      ? "查無符合當前篩選條件的食材數據"
      : "目前沒有任何食材數據，請點擊新增食材開始新建食材數據。";

  return (
    <>
      <PageHeader title="庫存管理">
        <Filter filtersConfig={filtersConfig} />
        <Button
          $type="primary"
          $size="sm"
          $rounded="full"
          onClick={() => setIsOpenModal(true)}
        >
          <BsFileEarmarkPlus size={18} />
          <span>新增食材</span>
        </Button>
      </PageHeader>

      <QueryStatusFallback
        isPending={inventoryIsPending}
        isError={inventoryIsError}
        error={inventoryError}
        isEmpty={
          (Array.isArray(inventoryData) && inventoryData?.length === 0) ||
          displayInventoryData?.length === 0
        }
        emptyState={{
          message: emptyStateMessage,
        }}
        render={() => (
          <Container>
            {displayInventoryData.map((inventory) => (
              <InventoryDataCard inventory={inventory} key={inventory.id} />
            ))}
          </Container>
        )}
      />

      {isOpenModal && (
        <UpsertInventoryForm onCloseModal={() => setIsOpenModal(false)} />
      )}
    </>
  );
}

export default Inventory;
