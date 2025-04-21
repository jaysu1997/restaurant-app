// 菜單設定頁面
import styled from "styled-components";
import useGetMenus from "../features/menu-manage/useGetMenus.js";
import Heading from "../ui/Heading.jsx";
import MenusDataCard from "../features/menu-manage/MenusDataCard.jsx";
import LoadingSpinner from "../ui/LoadingSpinner.jsx";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import UpsertMenuForm from "../features/menu-manage/UpsertMenuForm.jsx";
import Button from "../ui/Button.jsx";
import Modal from "../ui/Modal.jsx";
import { BsFileEarmarkPlus } from "react-icons/bs";
import SearchField from "../ui/SearchField.jsx";
import Filter from "../ui/Filter.jsx";
import ConfirmDelete from "../ui/ConfirmDelete.jsx";
import useDeleteMenu from "../features/menu-manage/useDeleteMenu.js";

const ToolBar = styled.div`
  display: flex;
  gap: 1.6rem;
  justify-content: space-between;
  padding: 1rem 0;
`;

const Container = styled.ul`
  display: grid;
  max-width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(28rem, 1fr));
  justify-content: space-between;
  gap: 4rem;
  padding: 1.6rem 0;
`;

function filterData(menusData, nameKeyWord, categoryKeyWord) {
  let displayData = menusData;

  // 關鍵字篩選
  if (nameKeyWord && nameKeyWord !== "") {
    displayData = menusData.filter((menu) => menu.name.includes(nameKeyWord));
  }
  // 餐點分類篩選
  if (categoryKeyWord && categoryKeyWord !== "all") {
    displayData = displayData.filter(
      (menu) => menu.category === categoryKeyWord
    );
  }

  return displayData;
}

function MenuManage() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [searchParams] = useSearchParams();
  const { menusData, menusDataFetching } = useGetMenus();
  const { deleteMenu } = useDeleteMenu();

  if (menusDataFetching) {
    return (
      <>
        <Heading>菜單設定</Heading>
        <LoadingSpinner />
      </>
    );
  }

  const nameKeyWord = searchParams.get("name");
  const categoryKeyWord = searchParams.get("category");

  // 要展示的數據
  const displayMenusData = filterData(menusData, nameKeyWord, categoryKeyWord);

  // 篩選選項(Filter需要)
  const options = [
    { label: "不篩選", value: "all" },
    ...Array.from(new Set(menusData.map((data) => data.category))).map(
      (category) => ({ label: category, value: category })
    ),
  ];

  return (
    <>
      <Heading>菜單設定</Heading>

      <ToolBar>
        <Filter optionsArray={options} field="category" selectTitle="分類" />
        <SearchField placeholder="搜尋餐點名稱" />

        <Button
          $buttonStyle="createNewItem"
          onClick={() => setIsOpenModal({ type: "create", data: null })}
        >
          <BsFileEarmarkPlus />
          <span>新增餐點</span>
        </Button>
      </ToolBar>

      <Container>
        {displayMenusData.length === 0 ? (
          <span>沒有任何數據</span>
        ) : (
          displayMenusData.map((menu) => (
            <MenusDataCard
              menu={menu}
              setIsOpenModal={setIsOpenModal}
              key={menu.id}
            />
          ))
        )}
      </Container>

      {isOpenModal && (
        <Modal
          modalHeader={
            isOpenModal.type === "delete" ? "確認刪除" : "餐點設定表單"
          }
          headerColor={isOpenModal.type === "delete" ? "#991b1b" : "inherit"}
          maxWidth={isOpenModal.type === "delete" ? 36 : 56}
          onCloseModal={() => setIsOpenModal(false)}
        >
          {isOpenModal.type === "delete" ? (
            <ConfirmDelete
              onCloseModal={() => setIsOpenModal(false)}
              handleDelete={deleteMenu}
              data={isOpenModal.data}
              modalType="menus"
              render={() => (
                <p>
                  請確認是否要刪除餐點：<span>{isOpenModal.data.name}</span>
                  ，以及該餐點的所有設定。
                </p>
              )}
            />
          ) : (
            <UpsertMenuForm
              onCloseModal={() => setIsOpenModal(false)}
              menu={isOpenModal.data}
            />
          )}
        </Modal>
      )}
    </>
  );
}

export default MenuManage;
