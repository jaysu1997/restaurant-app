// 訂單編輯頁面的迷你菜單
import styled from "styled-components";
import { useState } from "react";
import Modal from "../../ui/Modal";
import useGetMenus from "../../hooks/data/menus/useGetMenus";
import QueryStatusFallback from "../../ui/QueryStatusFallback";
import CategorySection from "./CategorySection";
import OrderForm from "../../ui/OrderForm/OrderForm";

const StyledMiniMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  padding: 2rem;
  background-color: #f9fafb;
  width: min(36rem, 95dvw);
`;

// 將餐點按照分類整理
function groupDishesByCategory(dishes) {
  if (!dishes) return [];

  return Object.values(
    dishes.reduce((acc, dish) => {
      if (!acc[dish.category]) {
        acc[dish.category] = {
          category: dish.category,
          dishes: [],
        };
      }
      acc[dish.category].dishes.push(dish);
      return acc;
    }, {}),
  );
}

function MiniMenu({ onClose }) {
  const [selectedDish, setSelectedDish] = useState(null);
  const { menus, menusIsLoading, menusIsError, menusError } = useGetMenus();
  const isMenu = !selectedDish;

  return (
    <Modal
      onClose={onClose}
      modalHeader={isMenu ? "菜單" : selectedDish.name}
      scrollBar={isMenu}
    >
      <QueryStatusFallback
        status={{
          isLoading: menusIsLoading,
          isError: menusIsError,
          hasNoData: menus?.length === 0,
        }}
        errorFallback={menusError}
        noDataFallback={{
          message: "目前沒有任何餐點數據，請前往菜單設定頁面新增餐點。",
          actionLabel: "新增餐點",
          redirectTo: "/menu-manage",
        }}
      >
        {isMenu ? (
          <StyledMiniMenu>
            {groupDishesByCategory(menus)?.map((menu) => (
              <CategorySection
                category={menu.category}
                dishes={menu.dishes}
                onSelect={setSelectedDish}
                key={menu.category}
              />
            ))}
          </StyledMiniMenu>
        ) : (
          <OrderForm
            orderDish={selectedDish}
            isEdit={false}
            onClose={() => setSelectedDish(null)}
          />
        )}
      </QueryStatusFallback>
    </Modal>
  );
}

export default MiniMenu;
