// 食材備料頁面
import styled from "styled-components";
import Heading from "../ui/Heading";
import SearchField from "../ui/SearchField";
import { useState } from "react";
import { BsFileEarmarkPlus } from "react-icons/bs";
import Button from "../ui/Button";
import useGetInventory from "../features/inventory/useGetInventory";
import LoadingSpinner from "../ui/LoadingSpinner";
import InventoryDataCard from "../features/inventory/InventoryDataCard";
import Modal from "../ui/Modal";
import UpsertInventoryForm from "../features/inventory/UpsertInventoryForm";
import { useSearchParams } from "react-router-dom";
import Filter from "../ui/Filter";
import ConfirmDelete from "../ui/ConfirmDelete";
import useDeleteInventory from "../features/inventory/useDeleteInventory";

const ToolBar = styled.div`
  display: flex;
  gap: 1.6rem;
  padding: 1rem 0;
  justify-content: space-between;
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
  const { deleteInventory } = useDeleteInventory();

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

  // 篩選選項(Filter需要)
  const options = [
    { label: "不篩選", value: "all" },
    { label: "庫存低於100", value: 100 },
    { label: "庫存低於50", value: 50 },
    { label: "庫存低於10", value: 10 },
    { label: "庫存已耗盡", value: 0 },
  ];

  return (
    <>
      <Heading>庫存管理</Heading>

      <ToolBar>
        <Filter optionsArray={options} field="quantity" selectTitle="數量" />
        <SearchField placeholder="搜尋食材名稱" />
        <Button
          $buttonStyle="createNewItem"
          onClick={() => setIsOpenModal({ type: "create", data: null })}
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
            <InventoryDataCard
              inventory={inventory}
              setIsOpenModal={setIsOpenModal}
              key={inventory.id}
            />
          ))
        )}
      </Container>

      {isOpenModal && (
        <Modal
          modalHeader={
            isOpenModal.type === "delete" ? "確認刪除" : "食材設定表單"
          }
          headerColor={isOpenModal.type === "delete" ? "#991b1b" : "inherit"}
          maxWidth={isOpenModal.type === "delete" ? 36 : 56}
          onCloseModal={() => setIsOpenModal(false)}
        >
          {isOpenModal.type === "delete" ? (
            <ConfirmDelete
              onCloseModal={() => setIsOpenModal(false)}
              handleDelete={deleteInventory}
              data={isOpenModal.data}
              modalType="inventory"
              render={() => (
                <p>
                  請確認是否要刪除食材：<span>{isOpenModal.data.label}</span>
                  ，以及各個餐點中所有使用此食材的備料和選項。
                </p>
              )}
            />
          ) : (
            <UpsertInventoryForm
              onCloseModal={() => setIsOpenModal(false)}
              inventory={isOpenModal.data}
            />
          )}
        </Modal>
      )}
    </>
  );
}

export default Inventory;
