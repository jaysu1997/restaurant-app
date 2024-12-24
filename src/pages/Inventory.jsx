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
import StyledOverlayScrollbars from "../ui/StyledOverlayScrollbars";
import Filter from "../ui/Filter";

const ToolBar = styled.div`
  display: flex;
  gap: 1.6rem;
  padding: 1.6rem 1rem;
  justify-content: space-between;
`;

const Container = styled.div`
  display: grid;
  max-width: 120rem;
  grid-template-columns: repeat(6, 1fr);
  justify-content: space-between;
  gap: 4rem;
  padding: 1rem;
`;

function Inventory() {
  const [openModal, setOpenModal] = useState(false);
  const [searchParams] = useSearchParams();
  const { inventoryData, isPending } = useGetInventory();

  if (isPending) return <LoadingSpinner />;

  const nameKeyWord = searchParams.get("name");
  const quantityKeyWord = JSON.parse(searchParams.get("quantity"));

  // 要展示的數據
  let displayInventoryData = inventoryData;

  if (nameKeyWord && nameKeyWord !== "all") {
    displayInventoryData = inventoryData.filter((inventory) =>
      inventory.label.includes(nameKeyWord)
    );
  }

  if (quantityKeyWord && quantityKeyWord.value !== "all") {
    displayInventoryData = displayInventoryData.filter(
      (inventory) => inventory.quantity < quantityKeyWord.value
    );
  }

  return (
    <>
      <Heading>備料管理</Heading>

      <ToolBar>
        <Filter
          dataArray={inventoryData}
          field="quantity"
          selectTitle="剩餘數量"
        />
        <SearchField />
        <Button $buttonStyle="upsert" onClick={() => setOpenModal(true)}>
          <BsFileEarmarkPlus />
          <span>新增食材</span>
        </Button>
      </ToolBar>

      <StyledOverlayScrollbars style={{ maxHeight: "100%" }} autoHide={scroll}>
        <Container>
          {displayInventoryData.length === 0 ? (
            <span>沒有任何數據</span>
          ) : (
            displayInventoryData.map((inventory) => (
              <InventoryDataCard inventory={inventory} key={inventory.id} />
            ))
          )}
        </Container>
      </StyledOverlayScrollbars>

      {openModal && (
        <Modal
          modalHeader="食材新增表單"
          onCloseModal={() => setOpenModal(false)}
        >
          <UpsertInventoryForm onCloseModal={() => setOpenModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default Inventory;
