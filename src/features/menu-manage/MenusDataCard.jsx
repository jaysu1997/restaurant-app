// 菜單設定數據表單
import DataDisplayCard from "../../ui-old/DataDisplayCard";
import { useState } from "react";
import UpsertMenuForm from "./UpsertMenuForm";
import ConfirmDelete from "../../ui-old/ConfirmDelete";
import useDeleteMenu from "../../hooks/data/menus/useDeleteMenu";

function MenusDataCard({ menu }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { deleteMenu, menuDeleting } = useDeleteMenu();
  // 菜單數據
  const { name, category, price, discount, ingredients, customize } = menu;

  // 所有成份
  const ingredientList = ingredients?.map(
    (ingredient) => ingredient.ingredientName.label
  );

  // 所有自訂附加項目
  const customizeList = customize?.map((custom) => custom.title);

  // 卡片展示格式
  const menuDataFormat = [
    { head: "名稱", body: name },
    { head: "分類", body: category },
    { head: "售價", body: price },
    { head: "折扣", body: discount ? `-${discount}` : 0 },
    { head: "食材", body: ingredientList?.join(", ") },
    {
      head: "選項",
      body: customizeList?.join(", ") || null,
    },
  ];

  return (
    <>
      <DataDisplayCard
        handleEditButton={() => setIsOpenModal({ type: "edit", data: menu })}
        handleDeleteButton={() =>
          setIsOpenModal({ type: "delete", data: menu })
        }
        dataFormat={menuDataFormat}
      />

      {isOpenModal.type === "edit" && (
        <UpsertMenuForm
          onCloseModal={() => setIsOpenModal(false)}
          menu={isOpenModal.data}
        />
      )}

      {isOpenModal.type === "delete" && (
        <ConfirmDelete
          onCloseModal={() => setIsOpenModal(false)}
          handleDelete={deleteMenu}
          isDeleting={menuDeleting}
          data={isOpenModal.data}
          showRelatedData={false}
          render={() => (
            <p>
              請確認是否要刪除餐點「<strong>{isOpenModal.data.name}</strong>」
              ，此操作無法復原。
            </p>
          )}
        />
      )}
    </>
  );
}

export default MenusDataCard;
