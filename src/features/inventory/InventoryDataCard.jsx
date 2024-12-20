import { useState } from "react";
import DataDisplayCard from "../../ui/DataDisplayCard";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import UpsertInventoryForm from "./UpsertInventoryForm";

function InventoryDataCard({ inventory }) {
  const [openModal, setOpenModal] = useState(false);

  const { id, label, value, quantity } = inventory;

  const inventoryDataFormat = [
    { head: "名稱", body: label, twoColumns: true },
    { head: "數量", body: `${quantity || 0} 份`, twoColumns: true },
  ];

  return (
    <>
      <DataDisplayCard
        handleEditButton={() => setOpenModal("edit")}
        handleDeleteButton={() => setOpenModal("delete")}
        dataFormat={inventoryDataFormat}
      />
      {/* 編輯指定菜單數據的彈出視窗 */}
      {openModal === "edit" && (
        <Modal
          modalHeader="食材更新表單"
          onCloseModal={() => setOpenModal(false)}
        >
          <UpsertInventoryForm
            onCloseModal={() => setOpenModal(false)}
            inventory={inventory}
          />
        </Modal>
      )}
      {/* 刪除指定菜單數據的彈出視窗 */}
      {openModal === "delete" && (
        <Modal
          headerColor="#991b1b"
          modalHeader="確認刪除"
          onCloseModal={() => setOpenModal(false)}
        >
          <ConfirmDelete
            onCloseModal={() => setOpenModal(false)}
            name={label}
            id={id}
            tableName="inventory"
            render={() => (
              <p>
                請確認是否要刪除食材：<span>{label}</span>
                ，以及各個餐點中所有使用此食材的備料和選項。
              </p>
            )}
          />
        </Modal>
      )}
    </>
  );
}

export default InventoryDataCard;
