// 食材備料頁面
import styled from "styled-components";
import Heading from "../ui/Heading";
import { useState } from "react";
import { BsFileEarmarkPlus } from "react-icons/bs";
import Button from "../ui/Button";
import useGetInventory from "../features/inventory/useGetInventory";
import LoadingSpinner from "../ui/LoadingSpinner";
import InventoryDataCard from "../features/inventory/InventoryDataCard";
import UpsertInventoryForm from "../features/inventory/UpsertInventoryForm";
import { useSearchParams } from "react-router-dom";
import Filter from "../ui/Filter";

const ToolBar = styled.div`
  display: flex;
  gap: 1.6rem;
  padding: 1rem 0;
  justify-content: space-between;
  /* width: 100%; */
`;

const Container = styled.ul`
  display: grid;
  max-width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
  justify-content: space-between;
  gap: 4rem;
  padding: 1.6rem 0;
`;

function filterData(inventoryData, nameKeyWord, quantityKeyWord) {
  let displayData = inventoryData;

  if (nameKeyWord && nameKeyWord !== "") {
    displayData = inventoryData.filter((inventory) =>
      inventory.label.includes(nameKeyWord)
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
  const { inventoryData, inventoryDataFetching } = useGetInventory(false);

  if (inventoryDataFetching)
    return (
      <>
        <Heading>庫存管理</Heading>
        <LoadingSpinner />
      </>
    );

  const nameKeyWord = searchParams.get("name");
  const quantityKeyWord = searchParams.get("quantity");

  // 要展示的數據
  const displayInventoryData = filterData(
    inventoryData,
    nameKeyWord,
    quantityKeyWord
  );

  const filtersConfig = [
    {
      title: "食材名稱",
      type: "search",
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

  return (
    <>
      <Heading>庫存管理</Heading>

      <ToolBar>
        <Filter filtersConfig={filtersConfig} />
        <Button
          $buttonStyle="createNewItem"
          onClick={() => setIsOpenModal(true)}
        >
          <BsFileEarmarkPlus />
          <span>新增食材</span>
        </Button>
      </ToolBar>

      <Container>
        {displayInventoryData.length === 0 ? (
          <span>沒有任何數據</span>
        ) : (
          displayInventoryData.map((inventory) => (
            <InventoryDataCard inventory={inventory} key={inventory.id} />
          ))
        )}
      </Container>

      {isOpenModal && (
        <UpsertInventoryForm onCloseModal={() => setIsOpenModal(false)} />
      )}
    </>
  );
}

export default Inventory;
