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
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import SearchField from "../ui/SearchField.jsx";

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

  const keyWord = searchParams.get("name");

  // 要展示的數據
  let displayMenusData = menusData;

  if (keyWord && keyWord !== "all") {
    displayMenusData = menusData.filter((menu) => menu.name.includes(keyWord));
  }

  return (
    <>
      <Heading>菜單設定</Heading>

      <ToolBar>
        {/* 搜尋和搜尋功能 */}
        <SearchField />
        {/* 新增餐點按鈕 */}
        <Button $buttonStyle="upsert" onClick={() => setOpenModal(true)}>
          <BsFileEarmarkPlus />
          <span>新增餐點</span>
        </Button>
      </ToolBar>

      <OverlayScrollbarsComponent
        options={{
          scrollbars: {
            autoHide: "scroll",
            clickScrolling: true,
            dragScrolling: true,
            autoHideDelay: 1000,
          },
        }}
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
      </OverlayScrollbarsComponent>

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
