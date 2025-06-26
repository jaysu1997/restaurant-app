// 訂單編輯頁面的迷你菜單
import styled from "styled-components";
import Modal from "../../ui/Modal";
import useGetMenus from "../../hooks/data/menus/useGetMenus";
import QueryStatusFallback from "../../ui/QueryStatusFallback";
import CategoryGroup from "./CategoryGroup";

const StyledMiniMenu = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f9fafb;
  width: min(36rem, 95dvw);
  padding: 2rem;
`;

const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

// 將餐點案分類整理
function groupDishesByCategory(dishes) {
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
    }, {})
  );
}

function MiniMenu({ setIsOpenModal }) {
  const { menusData, menusIsPending, menusError, menusIsError } = useGetMenus();

  const groupedMenus = menusData ? groupDishesByCategory(menusData) : [];

  return (
    <Modal
      onCloseModal={() => setIsOpenModal(false)}
      modalHeader="菜單"
      maxWidth={36}
    >
      <StyledMiniMenu>
        <QueryStatusFallback
          isPending={menusIsPending}
          isError={menusIsError}
          error={menusError}
          isEmpty={Array.isArray(menusData) && menusData.length === 0}
          emptyState={{
            message: "目前沒有任何餐點數據，請前往菜單設定頁面新增餐點。",
            buttonText: "新增餐點",
            redirectTo: "/menu-manage",
          }}
          render={() => (
            <MenuList>
              {groupedMenus.map((menu) => (
                <CategoryGroup
                  key={menu.category}
                  category={menu.category}
                  dishes={menu.dishes}
                  onSelect={setIsOpenModal}
                />
              ))}
            </MenuList>
          )}
        />
      </StyledMiniMenu>
    </Modal>
  );
}

export default MiniMenu;
