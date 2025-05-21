// 菜單設定頁面
import styled from "styled-components";
import MenusDataCard from "../features/menu-manage/MenusDataCard.jsx";
import LoadingSpinner from "../ui/LoadingSpinner.jsx";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import UpsertMenuForm from "../features/menu-manage/UpsertMenuForm.jsx";
import Button from "../ui/Button.jsx";
import { BsFileEarmarkPlus } from "react-icons/bs";
import Filter from "../ui/Filter.jsx";
import PageHeader from "../ui/PageHeader.jsx";
import useGetMenus from "../hooks/data/menus/useGetMenus.js";

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

  if (menusDataFetching) {
    return (
      <>
        <PageHeader title="菜單設定" />
        <LoadingSpinner />
      </>
    );
  }

  const nameKeyWord = searchParams.get("name");
  const categoryKeyWord = searchParams.get("category");

  // 要展示的數據
  const displayMenusData = filterData(menusData, nameKeyWord, categoryKeyWord);

  const filtersConfig = [
    {
      title: "餐點名稱",
      type: "search",
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
        ...Array.from(new Set(menusData.map((data) => data.category))).map(
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

      <Container>
        {menusData.length === 0 ? (
          <span>沒有任何數據</span>
        ) : (
          displayMenusData.map((menu) => (
            <MenusDataCard menu={menu} key={menu.id} />
          ))
        )}
      </Container>

      {isOpenModal && (
        <UpsertMenuForm onCloseModal={() => setIsOpenModal(false)} />
      )}
    </>
  );
}

export default MenuManage;
