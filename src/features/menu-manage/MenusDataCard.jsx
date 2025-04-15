// 菜單設定數據表單(需要修改)

import { useState } from "react";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import UpsertMenuForm from "./UpsertMenuForm";
import { FiMinus } from "react-icons/fi";
import DataDisplayCard from "../../ui/DataDisplayCard";

function MenusDataCard({ menu }) {
  // 開關Modal
  const [openModal, setOpenModal] = useState(false);

  // 菜單數據
  const { id, name, category, price, discount, ingredients, customize } = menu;

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
        handleEditButton={() => setOpenModal("edit")}
        handleDeleteButton={() => setOpenModal("delete")}
        dataFormat={menuDataFormat}
      />

      {/* 編輯指定菜單數據的彈出視窗 */}
      {openModal === "edit" && (
        <Modal
          modalHeader="餐點設定表單"
          onCloseModal={() => setOpenModal(false)}
        >
          <UpsertMenuForm
            onCloseModal={() => setOpenModal(false)}
            menu={menu}
          />
        </Modal>
      )}

      {/* 刪除指定菜單數據的彈出視窗 */}
      {openModal === "delete" && (
        <Modal
          modalHeader="確認刪除"
          maxWidth={36}
          headerColor="#991b1b"
          onCloseModal={() => setOpenModal(false)}
        >
          <ConfirmDelete
            name={name}
            id={id}
            tableName="menus"
            onCloseModal={() => setOpenModal(false)}
            render={() => (
              <p>
                請確認是否要刪除餐點：<span>{`「${name}」`}</span>
                ，以及該餐點的所有設定。
              </p>
            )}
          />
        </Modal>
      )}
    </>
  );
}

export default MenusDataCard;
