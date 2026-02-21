// 菜單設定頁面
import { useSearchParams } from "react-router";
import { useState } from "react";
import MenuForm from "../features/menu-manage/MenuForm.jsx";
import Button from "../ui/Button";
import PageHeader from "../ui/PageHeader.jsx";
import useGetMenus from "../hooks/data/menus/useGetMenus.js";
import Filter from "../ui/Filter/Filter.jsx";
import QueryStatusFallback from "../ui/QueryStatusFallback.jsx";
import styled from "styled-components";
import MenusDataCard from "../features/menu-manage/MenusDataCard.jsx";
import { FilePlus } from "lucide-react";
import PageWrapper from "../ui/PageWrapper.jsx";

const Container = styled.ul`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
  gap: 2.8rem;
`;

function filterData(menusData, nameSearchParams, categorySearchParams) {
  if (!menusData) return menusData;

  let displayData = menusData;

  // 關鍵字篩選
  if (nameSearchParams && nameSearchParams !== "") {
    displayData = menusData.filter((menu) =>
      menu.name.includes(nameSearchParams),
    );
  }
  // 餐點分類篩選
  if (categorySearchParams && categorySearchParams !== "all") {
    displayData = displayData.filter(
      (menu) => menu.category === categorySearchParams,
    );
  }

  return displayData;
}

function MenuManage() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [searchParams] = useSearchParams();
  const { menus, menusIsLoading, menusIsError, menusError } = useGetMenus();

  const nameSearchParams = searchParams.get("name");
  const categorySearchParams = searchParams.get("category");

  // 要展示的數據
  const displayMenusData = filterData(
    menus,
    nameSearchParams,
    categorySearchParams,
  );

  const emptyStateMessage =
    nameSearchParams || categorySearchParams
      ? "查無符合當前篩選條件的餐點數據"
      : "目前沒有任何餐點數據，請點擊新增餐點開始新建餐點數據。";

  const filtersConfig = [
    {
      title: "餐點名稱",
      type: "textInput",
      queryKey: "name",
      placeholder: "搜尋餐點名稱",
    },
    {
      title: "餐點分類",
      type: "select",
      queryKey: "category",
      placeholder: "選擇餐點分類",
      options: [
        { label: "不篩選", value: "" },
        ...Array.from(new Set(menus?.map((data) => data.category))).map(
          (category) => ({ label: category, value: category }),
        ),
      ],
    },
  ];

  return (
    <PageWrapper>
      <PageHeader title="菜單設定">
        <div>
          <Button $iconSize="1.8rem" onClick={() => setIsOpenModal(true)}>
            <FilePlus />
            <span>新增餐點</span>
          </Button>
        </div>
        <Filter filtersConfig={filtersConfig} />
      </PageHeader>

      <QueryStatusFallback
        status={{
          isLoading: menusIsLoading,
          isError: menusIsError,
          hasNoData: displayMenusData?.length === 0,
        }}
        errorFallback={menusError}
        noDataFallback={{ message: emptyStateMessage }}
      >
        <Container>
          {displayMenusData?.map((menu) => (
            <MenusDataCard menu={menu} key={menu.id} />
          ))}
        </Container>
      </QueryStatusFallback>

      {isOpenModal && <MenuForm onCloseModal={() => setIsOpenModal(false)} />}
    </PageWrapper>
  );
}

export default MenuManage;
