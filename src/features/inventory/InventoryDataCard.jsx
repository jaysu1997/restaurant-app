import { useState } from "react";
import DataDisplayCard from "../../ui/DataDisplayCard";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteInventory from "./useDeleteInventory";
import UpsertInventoryForm from "./UpsertInventoryForm";

function InventoryDataCard({ inventory }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { deleteInventory, inventoryDeleting } = useDeleteInventory();
  const { label, remainingQuantity } = inventory;

  const inventoryDataFormat = [
    { head: "名稱", body: label, twoColumns: true },
    { head: "數量", body: `${remainingQuantity || 0} 份`, twoColumns: true },
  ];

  return (
    <>
      <DataDisplayCard
        handleEditButton={() =>
          setIsOpenModal({ type: "edit", data: inventory })
        }
        handleDeleteButton={() =>
          setIsOpenModal({ type: "delete", data: inventory })
        }
        dataFormat={inventoryDataFormat}
      />

      {isOpenModal.type === "edit" && (
        <UpsertInventoryForm
          onCloseModal={() => setIsOpenModal(false)}
          inventory={isOpenModal.data}
        />
      )}

      {isOpenModal.type === "delete" && (
        <ConfirmDelete
          onCloseModal={() => setIsOpenModal(false)}
          handleDelete={deleteInventory}
          isDeleting={inventoryDeleting}
          data={isOpenModal.data}
          modalType="inventory"
          render={() => (
            <p>
              請確認是否要刪除食材：<strong>{isOpenModal.data.label}</strong>
              ，以及各個餐點中所有使用此食材的備料和選項。
            </p>
          )}
        />
      )}
    </>
  );
}

export default InventoryDataCard;
