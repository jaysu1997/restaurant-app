// 食材備料頁面

import styled from "styled-components";
import Heading from "../ui/Heading";
import SearchField from "../ui/SearchField";
import { useState } from "react";
import { BsFileEarmarkPlus } from "react-icons/bs";
import Button from "../ui/Button";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import useGetInventory from "../features/inventory/useGetInventory";
import LoadingSpinner from "../ui/LoadingSpinner";
import InventoryDataCard from "../features/inventory/InventoryDataCard";
import Modal from "../ui/Modal";
import UpsertInventoryForm from "../features/inventory/UpsertInventoryForm";

const ToolBar = styled.div`
  display: flex;
  gap: 1.6rem;
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
  //  備料的部分需要注意可能會和新增餐點時設定的名字不同，或許之後要在新增餐點時設定驗證
  const [openModal, setOpenModal] = useState(false);

  const { inventoryData, isPending } = useGetInventory();

  if (isPending) return <LoadingSpinner />;

  return (
    <>
      <Heading>備料管理</Heading>

      <ToolBar>
        <SearchField />
        <Button $buttonStyle="upsert" onClick={() => setOpenModal(true)}>
          <BsFileEarmarkPlus />
          <span>新增食材</span>
        </Button>
      </ToolBar>

      <OverlayScrollbarsComponent
        options={{
          scrollbars: {
            autoHide: "scroll", // 滾動條自動隱藏
            clickScrolling: true, // 點擊滾動條時可滾動
            dragScrolling: true, // 支援拖動滾動
            autoHideDelay: 1000,
          },
        }}
      >
        <Container>
          {inventoryData.length === 0 ? (
            <span>沒有任何數據</span>
          ) : (
            inventoryData.map((inventory) => (
              <InventoryDataCard inventory={inventory} key={inventory.id} />
            ))
          )}
        </Container>
      </OverlayScrollbarsComponent>

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
