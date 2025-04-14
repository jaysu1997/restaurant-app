// 訂單編輯頁面的迷你菜單
import styled from "styled-components";
import LoadingSpinner from "../../ui/LoadingSpinner";
import useGetMenus from "../menu-manage/useGetMenus";
import DishCard from "../menu/DishCard";
import { Fragment } from "react";

const StyledMiniMenu = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f9fafb;
  max-width: 36rem;
  width: 100%;
  padding: 1.6rem;
`;

const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const CategoryName = styled.p`
  background-color: #262626;
  color: #fafafa;
  font-size: 1.8rem;
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
`;

function MiniMenu({ setOpenModal }) {
  const { menusData, menusDataFetching } = useGetMenus();

  if (menusDataFetching) {
    return <LoadingSpinner />;
  }

  // 根據分類名稱將餐點分類
  const menus = Object.values(
    menusData.reduce((acc, dish) => {
      if (!acc[dish.category]) {
        acc[dish.category] = {
          category: dish.category,
          dishes: [],
        };
      }
      acc[dish.category].dishes.push(dish);
      return acc;
    }, {})
  );

  return (
    <StyledMiniMenu>
      <MenuList>
        {menus.map((menu) => (
          <Fragment key={menu.category}>
            <CategoryName>{menu.category}</CategoryName>
            {menu.dishes.map((dish) => (
              <DishCard dish={dish} key={dish.id} setOpenModal={setOpenModal} />
            ))}
          </Fragment>
        ))}
      </MenuList>
    </StyledMiniMenu>
  );
}

export default MiniMenu;
