// 菜單設定頁面

import styled from "styled-components";
import useGetMenus from "../features/menu/useGetMenus.js";
import Heading from "../ui/Heading.jsx";
import MenusDataCard from "../features/menu/MenusDataCard.jsx";
import LoadingSpinner from "../ui/LoadingSpinner.jsx";
import { useSearchParams } from "react-router-dom";
import Operation from "../ui/Operation.jsx";
import { useState } from "react";
import UpsertMenuForm from "../features/menu/UpsertMenuForm.jsx";
import Button from "../ui/Button.jsx";
import Modal from "../ui/Modal.jsx";
import { BsFileEarmarkPlus } from "react-icons/bs";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

const Container = styled.div`
  display: grid;
  max-width: 120rem;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: space-between;
  gap: 4rem;
  padding: 1rem;
`;

const ToolBar = styled.div`
  display: flex;
  gap: 1.6rem;
  justify-content: space-between;
`;

function Menus() {
  const { menusData, isPending } = useGetMenus();
  const [searchParams] = useSearchParams();
  const [openModal, setOpenModal] = useState(false);

  // 從supabase取得數據中
  if (isPending) return <LoadingSpinner />;

  // 要展示的數據
  let displayMenusData;

  // 取的篩選方式和條件
  const [querySrting] = Array.from(searchParams.entries());

  // 不做任何篩選
  if (!querySrting || querySrting[1] === "all") displayMenusData = menusData;

  // 篩選分類
  if (
    querySrting &&
    querySrting[0] === "category" &&
    querySrting[1] !== "all"
  ) {
    displayMenusData = menusData.filter(
      (menu) => menu[querySrting[0]] === querySrting[1]
    );
  }

  // 搜尋名稱
  if (querySrting && querySrting[0] === "name" && querySrting[1] !== "all") {
    displayMenusData = menusData.filter((menu) =>
      menu[querySrting[0]].includes(querySrting[1])
    );
  }

  return (
    <>
      <Heading>菜單設定</Heading>

      <ToolBar>
        {/* 搜尋和搜尋功能 */}
        <Operation menusData={menusData} />
        {/* 新增餐點按鈕 */}
        <Button $buttonStyle="upsert" onClick={() => setOpenModal(true)}>
          <BsFileEarmarkPlus />
          <span>新增餐點</span>
        </Button>
      </ToolBar>

      <OverlayScrollbarsComponent
        options={{
          scrollbars: {
            autoHide: "leave",
            clickScrolling: true,
            dragScrolling: true,
            autoHideDelay: 1000,
          },
        }}
      >
        <Container>
          {displayMenusData.length === 0 ? (
            <span>沒有相關數據</span>
          ) : (
            displayMenusData.map((menu) => (
              <MenusDataCard menu={menu} key={menu.id} />
            ))
          )}
        </Container>
      </OverlayScrollbarsComponent>

      {openModal && (
        <Modal onCloseModal={() => setOpenModal(false)}>
          <UpsertMenuForm onCloseModal={() => setOpenModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default Menus;
