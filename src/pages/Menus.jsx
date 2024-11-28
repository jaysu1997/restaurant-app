// 菜單設定頁面

import styled from "styled-components";
import useGetMenus from "../features/menu/useGetMenus.js";
import Heading from "../ui/Heading.jsx";
import MenusDataCard from "../features/menu/MenusDataCard.jsx";
import UpsertButton from "../ui/UpsertButton.jsx";
import LoadingSpinner from "../ui/LoadingSpinner.jsx";
import { MacScrollbar } from "mac-scrollbar";
import { useSearchParams } from "react-router-dom";
import Operation from "../ui/Operation.jsx";
import { useState } from "react";
import UpsertMenuForm from "../features/menu/UpsertMenuForm.jsx";

const Container = styled.div`
  display: grid;
  max-width: 120rem;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: space-between;
  gap: 3rem;

  max-height: 100dvh;
  overflow: auto;
  scrollbar-gutter: stable;
  padding: 1rem;
`;

const ToolBar = styled.div`
  display: flex;
  gap: 1.6rem;
`;

const Span = styled.span`
  grid-column: 1 / 3;
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
        {/* 新增餐點按鈕 */}
        <UpsertButton openModal={openModal} setOpenModal={setOpenModal}>
          <UpsertMenuForm onCloseModal={() => setOpenModal(false)} />
        </UpsertButton>
        {/* 搜尋和搜尋功能 */}
        <Operation menusData={menusData} />
      </ToolBar>

      <MacScrollbar>
        <Container>
          {displayMenusData.length === 0 ? (
            <Span>沒有相關數據</Span>
          ) : (
            displayMenusData.map((menu) => (
              <MenusDataCard menu={menu} key={menu.id} />
            ))
          )}
        </Container>
      </MacScrollbar>
    </>
  );
}

export default Menus;
