// 菜單設定頁面
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import UpsertMenuForm from "../features/menu-manage/UpsertMenuForm.jsx";
import Button from "../ui/Button.jsx";
import { BsFileEarmarkPlus } from "react-icons/bs";
import PageHeader from "../ui/PageHeader.jsx";
import useGetMenus from "../hooks/data/menus/useGetMenus.js";
import Filter from "../ui/Filter/Filter.jsx";
import QueryStatusFallback from "../ui/QueryStatusFallback.jsx";
import styled from "styled-components";
import MenusDataCard from "../features/menu-manage/MenusDataCard.jsx";

const Container = styled.ul`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(28rem, 1fr));
  justify-content: space-between;
  gap: 4rem;
  padding-bottom: 3.6rem;
`;

function filterData(menusData, nameSearchParams, categorySearchParams) {
  if (!menusData) return menusData;

  let displayData = menusData;

  // 關鍵字篩選
  if (nameSearchParams && nameSearchParams !== "") {
    displayData = menusData.filter((menu) =>
      menu.name.includes(nameSearchParams)
    );
  }
  // 餐點分類篩選
  if (categorySearchParams && categorySearchParams !== "all") {
    displayData = displayData.filter(
      (menu) => menu.category === categorySearchParams
    );
  }

  return displayData;
}

function MenuManage() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [searchParams] = useSearchParams();
  const { menusData, menusIsPending, menusError, menusIsError } = useGetMenus();

  const nameSearchParams = searchParams.get("name");
  const categorySearchParams = searchParams.get("category");

  // 要展示的數據
  const displayMenusData = filterData(
    menusData,
    nameSearchParams,
    categorySearchParams
  );

  const emptyStateMessage =
    nameSearchParams || categorySearchParams
      ? "查無符合當前篩選條件的餐點數據"
      : "目前沒有任何餐點數據，請點擊新增餐點開始新建餐點數據。";

  const filtersConfig = [
    {
      title: "餐點名稱",
      type: "input",
      inputType: "text",
      queryKey: "name",
      placeholder: "搜尋餐點名稱",
    },
    {
      title: "餐點分類",
      type: "select",
      queryKey: "category",
      placeholder: "選擇餐點分類",
      options: [
        { label: "不篩選", value: "all" },
        ...Array.from(new Set(menusData?.map((data) => data.category))).map(
          (category) => ({ label: category, value: category })
        ),
      ],
    },
  ];

  return (
    <>
      <PageHeader title="菜單設定">
        <Filter filtersConfig={filtersConfig} />
        <Button
          $buttonStyle="createNewItem"
          onClick={() => setIsOpenModal(true)}
        >
          <BsFileEarmarkPlus size={18} />
          <span>新增餐點</span>
        </Button>
      </PageHeader>

      <QueryStatusFallback
        isPending={menusIsPending}
        isError={menusIsError}
        error={menusError}
        isEmpty={
          Array.isArray(displayMenusData) && displayMenusData?.length === 0
        }
        emptyState={{
          message: emptyStateMessage,
        }}
        render={() => (
          <Container>
            {displayMenusData.map((menu) => (
              <MenusDataCard menu={menu} key={menu.id} />
            ))}
          </Container>
        )}
      />

      {isOpenModal && (
        <UpsertMenuForm onCloseModal={() => setIsOpenModal(false)} />
      )}
    </>
  );
}

export default MenuManage;
