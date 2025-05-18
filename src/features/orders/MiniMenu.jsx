// 訂單編輯頁面的迷你菜單
import styled from "styled-components";
import LoadingSpinner from "../../ui/LoadingSpinner";
import useGetMenus from "../menu-manage/useGetMenus";
import { Fragment } from "react";
import Modal from "../../ui/Modal";
import DishCard from "../../ui/DishCard";

const StyledMiniMenu = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f9fafb;
  width: 36rem;
  max-width: 95dvw;
  padding: 2rem;
`;

const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const CategoryName = styled.li`
  background-color: #262626;
  color: #fafafa;
  font-size: 1.8rem;
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
`;

function MiniMenu({ setIsOpenModal }) {
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
    <Modal
      onCloseModal={() => setIsOpenModal(false)}
      modalHeader="菜單"
      maxWidth={36}
    >
      <StyledMiniMenu>
        <MenuList>
          {menus.map((menu) => (
            <Fragment key={menu.category}>
              <CategoryName>{menu.category}</CategoryName>
              {menu.dishes.map((dish) => (
                <DishCard
                  dish={dish}
                  setIsOpenModal={setIsOpenModal}
                  key={dish.id}
                />
              ))}
            </Fragment>
          ))}
        </MenuList>
      </StyledMiniMenu>
    </Modal>
  );
}

export default MiniMenu;
