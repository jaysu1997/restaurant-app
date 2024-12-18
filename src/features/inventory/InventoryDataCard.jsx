import { useState } from "react";
import DataCard from "../../ui/DataCard";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

function InventoryDataCard({ inventory }) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const { id, label, value, quantity } = inventory;

  const inventoryDataFormat = [
    { head: "名稱", body: label, twoColumns: true },
    { head: "數量", body: `${quantity || 0} 份`, twoColumns: true },
  ];

  return (
    <>
      <DataCard
        handleEditButton={() => setOpenEditModal(true)}
        handleDeleteButton={() => setOpenDeleteModal(true)}
        dataFormat={inventoryDataFormat}
      />
      {/* 編輯指定菜單數據的彈出視窗 */}
      {openEditModal && (
        <Modal onCloseModal={() => setOpenEditModal(false)}>
          {/* <UpsertMenuForm
            onCloseModal={() => setOpenEditModal(false)}
            menu={menu}
          /> */}
        </Modal>
      )}
      {/* 刪除指定菜單數據的彈出視窗 */}
      {openDeleteModal && (
        <Modal
          headerColor="#991b1b"
          modalHeader="確認刪除"
          onCloseModal={() => setOpenDeleteModal(false)}
        >
          <ConfirmDelete
            onCloseModal={() => setOpenDeleteModal(false)}
            name={label}
            id={id}
            tableName="inventory"
          />
        </Modal>
      )}
    </>
  );
}

export default InventoryDataCard;
