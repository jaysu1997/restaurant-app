// 訂單編輯頁面的迷你菜單
import styled from "styled-components";
import Modal from "../../ui-old/Modal";
import useGetMenus from "../../hooks/data/menus/useGetMenus";
import QueryStatusFallback from "../../ui-old/QueryStatusFallback";
import CategoryGroup from "./CategoryGroup";
import { useState } from "react";
import OrderForm from "../../ui-old/OrderForm/OrderForm";
import Button from "../../ui/Button";
import { Plus } from "lucide-react";

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

// 將餐點按照分類整理
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
    }, {}),
  );
}

function MiniMenu() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { data, isPending, error, isError } = useGetMenus();

  return (
    <>
      <Button
        $variant="text"
        onClick={() => setIsOpenModal({ type: "MiniMenu", data: null })}
      >
        <Plus />
        新增餐點
      </Button>

      {isOpenModal.type === "MiniMenu" && (
        <Modal
          onCloseModal={() => setIsOpenModal(false)}
          modalHeader="菜單"
          maxWidth={36}
        >
          <StyledMiniMenu>
            <QueryStatusFallback
              status={{
                isPending,
                isError,
                hasNoData: data?.length === 0,
              }}
              errorFallback={error}
              noDataFallback={{
                message: "目前沒有任何餐點數據，請前往菜單設定頁面新增餐點。",
                actionLabel: "新增餐點",
                redirectTo: "/menu-manage",
              }}
            >
              <MenuList>
                {groupDishesByCategory(data).map((menu) => (
                  <CategoryGroup
                    key={menu.category}
                    category={menu.category}
                    dishes={menu.dishes}
                    onSelect={setIsOpenModal}
                  />
                ))}
              </MenuList>
            </QueryStatusFallback>
          </StyledMiniMenu>
        </Modal>
      )}

      {isOpenModal.type === "OrderForm" && (
        <OrderForm
          orderDish={isOpenModal.data}
          isEdit={false}
          onCloseModal={() => setIsOpenModal(false)}
        />
      )}
    </>
  );
}

export default MiniMenu;
