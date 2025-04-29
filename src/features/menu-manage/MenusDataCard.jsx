// 菜單設定數據表單
import { FiMinus } from "react-icons/fi";
import DataDisplayCard from "../../ui/DataDisplayCard";
import { useState } from "react";
import UpsertMenuForm from "./UpsertMenuForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteMenu from "./useDeleteMenu";

function MenusDataCard({ menu }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { deleteMenu, menuDeleting } = useDeleteMenu();
  // 菜單數據
  const { name, category, price, discount, ingredients, customize } = menu;

  // 所有成份
  const ingredientArray = ingredients?.map(
    (ingredient) => ingredient.ingredientName.label
  );

  // 所有自訂附加項目
  const customizeArray = customize?.map((custom) => custom.title);

  // 卡片展示格式
  const menuDataFormat = [
    { head: "名稱", body: name, twoColumns: false },
    { head: "分類", body: category, twoColumns: false },
    { head: "售價", body: price, twoColumns: false },
    { head: "折扣", body: discount || <FiMinus />, twoColumns: false },
    { head: "食材", body: ingredientArray?.join(", "), twoColumns: true },
    {
      head: "細項",
      body: customizeArray?.join(", ") || <FiMinus />,
      twoColumns: true,
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
          modalType="menus"
          render={() => (
            <p>
              請確認是否要刪除餐點：<strong>{isOpenModal.data.name}</strong>
              ，以及該餐點的所有設定。
            </p>
          )}
        />
      )}
    </>
  );
}

export default MenusDataCard;
