// 訂單編輯頁面的迷你菜單
import styled from "styled-components";
import { useState } from "react";
import Modal, {
  ModalContainer,
  ModalContent,
} from "../../../components/modal/Modal";
import useGetMenus from "../../../hooks/data/menus/useGetMenus";
import QueryStatusFallback from "../../../components/QueryStatusFallback";
import DishCard from "../../menu/components/DishCard";
import OrderForm from "./OrderForm/OrderForm";

const StyledMiniMenu = styled(ModalContent)`
  gap: 3.2rem;
  background-color: #f9fafb;
`;

const StyledCategorySection = styled.li`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const CategoryName = styled.h3`
  height: 4rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  background-color: #262626;
  color: #fafafa;
  font-size: 1.8rem;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-weight: 400;
`;

const DishList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
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
  const { menusQuery } = useGetMenus();
  const { data: menus = [] } = menusQuery;
  // 是菜單內容ui
  const isMenuView = !selectedDish;

  return (
    <Modal
      onClose={onClose}
      title={isMenuView ? "菜單" : "新增餐點"}
      maxWidth={40}
    >
      <QueryStatusFallback
        queries={[menusQuery]}
        hasNoData={menus.length === 0}
        noDataFallback={{
          message: "目前沒有任何餐點數據，請前往菜單設定頁面新增餐點。",
          actionLabel: "新增餐點",
          redirectTo: "/menu-manage",
        }}
      >
        {isMenuView ? (
          <ModalContainer>
            <StyledMiniMenu>
              {groupDishesByCategory(menus)?.map((menu) => (
                <StyledCategorySection key={menu.category}>
                  <CategoryName>{menu.category}</CategoryName>
                  <DishList>
                    {menu.dishes.map((dish) => (
                      <DishCard
                        dish={dish}
                        onSelect={setSelectedDish}
                        key={dish.id}
                      />
                    ))}
                  </DishList>
                </StyledCategorySection>
              ))}
            </StyledMiniMenu>
          </ModalContainer>
        ) : (
          <OrderForm
            orderDish={selectedDish}
            isEdit={false}
            onClose={onClose}
          />
        )}
      </QueryStatusFallback>
    </Modal>
  );
}

export default MiniMenu;
