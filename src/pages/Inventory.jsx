// 食材備料頁面
import styled from "styled-components";
import { useState } from "react";
import InventoryDataCard from "../features/inventory/InventoryDataCard";
import InventoryForm from "../features/inventory/InventoryForm";
import { useSearchParams } from "react-router";
import PageHeader from "../ui/PageHeader";
import useGetInventory from "../hooks/data/inventory/useGetInventory";
import Filter from "../ui/Filter/Filter";
import QueryStatusFallback from "../ui/QueryStatusFallback";
import Button from "../ui/Button";
import { FilePlus } from "lucide-react";
import PageContainer from "../ui/PageContainer";

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
  if (!inventoryData) return inventoryData;

  let displayData = inventoryData;

  if (nameSearchParams && nameSearchParams !== "") {
    displayData = inventoryData.filter((inventory) =>
      inventory.label.includes(nameSearchParams),
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
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [searchParams] = useSearchParams();
  const { inventory, inventoryIsLoading, inventoryIsError, inventoryError } =
    useGetInventory();

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

  return (
    <PageContainer>
      <PageHeader title="庫存管理">
        <div>
          <Button $iconSize="1.8rem" onClick={() => setIsOpenModal(true)}>
            <FilePlus />
            <span>新增食材</span>
          </Button>
        </div>
        {!inventoryIsLoading && inventory?.length > 0 && (
          <Filter filtersConfig={filtersConfig} />
        )}
      </PageHeader>

      <QueryStatusFallback
        status={{
          isLoading: inventoryIsLoading,
          isError: inventoryIsError,
          hasNoData: displayInventoryData?.length === 0,
        }}
        errorFallback={inventoryError}
        noDataFallback={{
          message: emptyStateMessage,
        }}
      >
        <Container>
          {displayInventoryData?.map((inventory) => (
            <InventoryDataCard inventory={inventory} key={inventory.id} />
          ))}
        </Container>
      </QueryStatusFallback>

      {isOpenModal && (
        <InventoryForm onCloseModal={() => setIsOpenModal(false)} />
      )}
    </PageContainer>
  );
}

export default Inventory;
