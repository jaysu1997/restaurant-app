// 菜單設定頁面

import styled from "styled-components";
import useGetMenus from "../features/menu/useGetMenus.js";
import Heading from "../ui/Heading.jsx";
import MenusDataCard from "../features/menu/MenusDataCard.jsx";
import LoadingSpinner from "../ui/LoadingSpinner.jsx";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import UpsertMenuForm from "../features/menu/UpsertMenuForm.jsx";
import Button from "../ui/Button.jsx";
import Modal from "../ui/Modal.jsx";
import { BsFileEarmarkPlus } from "react-icons/bs";
import SearchField from "../ui/SearchField.jsx";
import StyledOverlayScrollbars from "../ui/StyledOverlayScrollbars.jsx";
import Filter from "../ui/Filter.jsx";

const ToolBar = styled.div`
  display: flex;
  gap: 1.6rem;
  justify-content: space-between;
  padding: 1.6rem 1rem;
`;

const Container = styled.div`
  display: grid;
  max-width: 120rem;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: space-between;
  gap: 4rem;
  padding: 1rem;
`;

function Menus() {
  const [openModal, setOpenModal] = useState(false);
  const [searchParams] = useSearchParams();
  const { menusData, isPending } = useGetMenus();

  // 從supabase取得數據中
  if (isPending) return <LoadingSpinner />;

  const nameKeyWord = searchParams.get("name");
  const categoryKeyWord = JSON.parse(searchParams.get("category"));

  // 要展示的數據
  let displayMenusData = menusData;

  if (nameKeyWord && nameKeyWord !== "") {
    displayMenusData = menusData.filter((menu) =>
      menu.name.includes(nameKeyWord)
    );
  }

  if (categoryKeyWord && categoryKeyWord.value !== "") {
    displayMenusData = displayMenusData.filter(
      (menu) => menu.category === categoryKeyWord.value
    );
  }

  return (
    <>
      <Heading>菜單設定</Heading>

      <ToolBar>
        <Filter dataArray={menusData} field="category" selectTitle="分類" />
        <SearchField />

        <Button $buttonStyle="upsert" onClick={() => setOpenModal(true)}>
          <BsFileEarmarkPlus />
          <span>新增餐點</span>
        </Button>
      </ToolBar>

      <StyledOverlayScrollbars
        style={{ maxHeight: "100dvh" }}
        autoHide="scroll"
      >
        <Container>
          {displayMenusData.length === 0 ? (
            <span>沒有任何數據</span>
          ) : (
            displayMenusData.map((menu) => (
              <MenusDataCard menu={menu} key={menu.id} />
            ))
          )}
        </Container>
      </StyledOverlayScrollbars>

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

export default Menus;
