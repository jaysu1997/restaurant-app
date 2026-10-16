// 訂單編輯頁面的迷你菜單
import styled from "styled-components";
import { useState } from "react";
import useGetMenus from "../../../hooks/data/menus/useGetMenus";
import QueryStatusFallback from "../../../components/QueryStatusFallback";
import DishCard from "../../../components/DishCard";
import CloseButton from "../../../components/CloseButton";
import CategoryBar from "../../menu/components/CategoryBar";

const MenuPickerContainer = styled.section`
  margin-top: var(--space-6);
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  background-color: var(--color-background);
`;

const MenuHeader = styled.header`
  min-height: 5.6rem;
  padding: var(--space-2) var(--space-4);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
`;

const MenuTitle = styled.h4`
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
`;

const MenuBody = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--space-3);
  padding: var(--space-4);
`;

const DishList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(26rem, 1fr));
  align-content: start;
  gap: var(--space-4);
  padding: var(--space-1);
  max-height: min(50rem, 55vh);
  overflow-y: auto;
  scrollbar-gutter: stable;

  @media (max-width: 50em) {
    max-height: min(36rem, 50vh);
  }
`;

function MiniMenu({ onCreateDish, onClose }) {
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const { menusQuery, categories } = useGetMenus();

  const { data: menus = [] } = menusQuery;
  const displayMenus =
    selectedCategory === "全部"
      ? menus
      : menus.filter((dish) => dish.category === selectedCategory);

  return (
    <QueryStatusFallback
      queries={[menusQuery]}
      hasNoData={menus.length === 0}
      noDataFallback={{
        message: "目前沒有任何餐點數據，請前往菜單設定頁面新增餐點。",
        actionLabel: "新增餐點",
        redirectTo: "/menu-manage",
      }}
    >
      <MenuPickerContainer>
        <MenuHeader>
          <MenuTitle>新增餐點</MenuTitle>
          <CloseButton onClose={onClose} />
        </MenuHeader>

        <MenuBody>
          <CategoryBar
            categories={["全部", ...categories]}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <DishList>
            {displayMenus.map((dish) => (
              <DishCard
                dish={dish}
                onSelect={() => onCreateDish(dish)}
                canPlaceOrder={true}
                key={dish.id}
              />
            ))}
          </DishList>
        </MenuBody>
      </MenuPickerContainer>
    </QueryStatusFallback>
  );
}

export default MiniMenu;
