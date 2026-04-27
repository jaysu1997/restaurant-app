import { useState } from "react";
import DataDisplayCard from "../../ui/DataDisplayCard";
import ConfirmDelete from "../../ui/ConfirmDelete";
import InventoryForm from "./InventoryForm";
import useDeleteInventory from "../../hooks/data/inventory/useDeleteInventory";
import MenuForm from "../menu-manage/MenuForm";

function InventoryDataCard({ item, inventoryObj }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const deleteMutation = useDeleteInventory();
  const { name, remainingQuantity } = item;

  const inventoryDataFormat = [
    { head: "名稱", body: name },
    { head: "數量", body: `${remainingQuantity || 0} 份` },
  ];

  return (
    <>
      <DataDisplayCard
        handleEditButton={() => setIsOpenModal({ type: "edit", data: item })}
        handleDeleteButton={() =>
          setIsOpenModal({ type: "delete", data: item })
        }
        dataFormat={inventoryDataFormat}
      />

      {isOpenModal.type === "edit" && (
        <InventoryForm
          onCloseModal={() => setIsOpenModal(false)}
          inventory={isOpenModal.data}
        />
      )}

      {isOpenModal.type === "delete" && (
        <ConfirmDelete
          setIsOpenModal={setIsOpenModal}
          deleteMutation={deleteMutation}
          data={isOpenModal.data}
          showRelatedData={true}
          render={() => (
            <>
              <p>
                請確認是否要刪除<strong> {isOpenModal.data.label} </strong>?
              </p>
              <p>
                各餐點中使用此食材的備料與選項也會同步刪除，此操作無法復原。
              </p>
            </>
          )}
        />
      )}

      {isOpenModal.type === "menuForm" && (
        <MenuForm
          onCloseModal={() => setIsOpenModal({ type: "delete", data: item })}
          menu={isOpenModal.data}
          inventoryObj={inventoryObj}
        />
      )}
    </>
  );
}

export default InventoryDataCard;
