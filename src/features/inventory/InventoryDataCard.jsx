import DataDisplayCard from "../../ui/DataDisplayCard";

function InventoryDataCard({ inventory, setIsOpenModal }) {
  const { label, remainingQuantity } = inventory;

  const inventoryDataFormat = [
    { head: "名稱", body: label, twoColumns: true },
    { head: "數量", body: `${remainingQuantity || 0} 份`, twoColumns: true },
  ];

  return (
    <DataDisplayCard
      handleEditButton={() => setIsOpenModal({ type: "edit", data: inventory })}
      handleDeleteButton={() =>
        setIsOpenModal({ type: "delete", data: inventory })
      }
      dataFormat={inventoryDataFormat}
    />
  );
}

export default InventoryDataCard;
