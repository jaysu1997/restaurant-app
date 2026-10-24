import styled from "styled-components";
import PageHeader from "../components/PageHeader";
import QueryStatusFallback from "../components/QueryStatusFallback";
import useGetMenus from "../hooks/data/menus/useGetMenus";
import PageContainer from "../components/PageContainer";
import useSettings from "../context/settings/useSettings";
import MenuDishGrid from "../features/menu/components/MenuDishGrid";
import ShoppingCart from "../features/menu/components/ShoppingCart";
import CategoryBar from "../features/menu/components/CategoryBar";
import useOrderInventory from "../features/orders/hooks/useOrderInventory";
import StoreClosedNotice from "../features/orders/components/StoreClosedNotice";
import { canCreateOrder } from "../features/store-settings/utils/openHours.js";
import { useState } from "react";
import OrderItemForm from "../features/orders/components/OrderItemForm/OrderItemForm";

const MenuContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 85.2rem) 32rem;
  column-gap: var(--space-7);
  row-gap: var(--space-4);
  width: 100%;

  @media (max-width: 50em) {
    grid-template-columns: 1fr;
    padding-bottom: 5.2rem;
  }
`;

const MenuStickyWrapper = styled.div`
  position: sticky;
  top: 6.4rem;
  z-index: 1;
  margin-top: -var(--space-3);
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [activeForm, setActiveForm] = useState(null);
  const { menusQuery, categories } = useGetMenus();
  const { data: menus = [] } = menusQuery;
  // 取得庫存數據
  const inventoryQuery = useOrderInventory();
  // 當前是否可以建立訂單
  const { todayOpenInfo, settingsQuery } = useSettings();
  const canPlaceOrder = canCreateOrder(todayOpenInfo);

  function openCreateForm(dish) {
    setActiveForm({ mode: "create", dish });
  }

  function openEditForm(dish) {
    setActiveForm({ mode: "edit", dish });
  }

  return (
    <>
      <PageContainer>
        <PageHeader title="點餐系統" />

        <QueryStatusFallback
          queries={[menusQuery, settingsQuery, inventoryQuery]}
          hasNoData={menus.length === 0}
          noDataFallback={{
            message: "目前沒有任何餐點數據，請前往菜單設定頁面新增餐點",
            actionLabel: "新增餐點",
            redirectTo: "/menu-manage",
          }}
        >
          <MenuContainer>
            <MenuStickyWrapper>
              <CategoryBar
                categories={["全部", ...categories]}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
              {!canPlaceOrder && (
                <StoreClosedNotice>
                  目前為非營業時段，暫時無法建立新訂單。
                </StoreClosedNotice>
              )}
            </MenuStickyWrapper>

            <MenuDishGrid
              menus={menus}
              selectedCategory={selectedCategory}
              canPlaceOrder={canPlaceOrder}
              onCreateDish={openCreateForm}
            />

            <ShoppingCart
              canPlaceOrder={canPlaceOrder}
              onEditDish={openEditForm}
            />
          </MenuContainer>
        </QueryStatusFallback>
      </PageContainer>

      {activeForm && (
        <OrderItemForm
          orderDish={activeForm.dish}
          isEdit={activeForm.mode === "edit"}
          onClose={() => setActiveForm(null)}
        />
      )}
    </>
  );
}

export default Menu;
