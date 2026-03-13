// 菜單設定數據表單
import DataDisplayCard from "../../ui/DataDisplayCard";
import { useState } from "react";
import MenuForm from "./MenuForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteMenu from "../../hooks/data/menus/useDeleteMenu";

function MenusDataCard({ menu }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const deleteMutation = useDeleteMenu();
  // 菜單數據
  const { name, category, price } = menu;

  // 卡片展示格式
  const menuDataFormat = [
    { head: "名稱", body: name },
    { head: "分類", body: category },
    { head: "售價", body: price },
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
        <MenuForm
          onCloseModal={() => setIsOpenModal(false)}
          menu={isOpenModal.data}
        />
      )}

      {isOpenModal.type === "delete" && (
        <ConfirmDelete
          setIsOpenModal={setIsOpenModal}
          deleteMutation={deleteMutation}
          data={isOpenModal.data}
          showRelatedData={false}
          render={() => (
            <p>
              請確認是否要刪除<strong> {isOpenModal.data.name} </strong>?
            </p>
          )}
        />
      )}
    </>
  );
}

export default MenusDataCard;
