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
  const [openModal, setOpenModal] = useState(false);
  const [searchParams] = useSearchParams();
  const { menusData, menusDataFetching } = useGetMenus();

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

        <Button $buttonStyle="createNewItem" onClick={() => setOpenModal(true)}>
          <BsFileEarmarkPlus />
          <span>新增餐點</span>
        </Button>
      </ToolBar>

      <Container>
        {displayMenusData.length === 0 ? (
          <span>沒有任何數據</span>
        ) : (
          displayMenusData.map((menu) => (
            <MenusDataCard menu={menu} key={menu.id} />
          ))
        )}
      </Container>

      {openModal && (
        <Modal
          modalHeader="餐點設定表單"
          onCloseModal={() => setOpenModal(false)}
        >
          <UpsertMenuForm onCloseModal={() => setOpenModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default MenuManage;
