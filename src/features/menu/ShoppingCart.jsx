import styled from "styled-components";
import { useOrder } from "../../context/OrderContext";
import CartItem from "./CartItem";
import { useForm } from "react-hook-form";
import OrderInfoField from "./OrderInfoField";
import LoadingDotMini from "../../ui/LoadingDotMini";
import {
  buildOrderData,
  calculateOrderSummary,
} from "../../utils/orderHelpers";
import EmptyShoppingCart from "./EmptyShoppingCart";
import useCreateOrder from "../../hooks/data/orders/useCreateOrder";
import { useSettings } from "../../context/SettingsContext";
import StyledHotToast from "../../ui/StyledHotToast";

const StyledShoppingCart = styled.aside`
  grid-column: 2 / 3;
  grid-row: 1 / -1;
  border: 1px solid #dcdcdc;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 6px;
  font-size: 1.4rem;
  height: min(64.8rem, calc(100dvh - 17.8rem));
  position: sticky;
  top: 17.8rem;
  overflow: hidden;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  padding: 0.8rem 1.6rem;
  border-bottom: 1px solid #dcdcdc;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  z-index: 1;

  h4 {
    font-size: 2.8rem;
    margin-bottom: 1rem;
  }
`;

const ShoppingList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0 1.6rem;
  height: 100%;
  overflow-y: scroll;
  scrollbar-width: thin;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #dcdcdc;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  position: sticky;
  width: 100%;
  z-index: 1;
  bottom: 0;
  padding: 1.6rem;
  box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.05);
  gap: 1.2rem;
  font-size: 1.6rem;
  font-weight: 600;
`;

const SubmitButton = styled.button`
  height: 3.2rem;
  width: 100%;
  padding: 0.6rem;
  border-radius: 999px;
  background-color: #1d4ed8;
  color: #fff;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;

  &:not(:disabled):hover {
    background-color: #2563eb;
  }
`;

function ShoppingCart() {
  const { settings, status } = useSettings();

  const {
    state: { dishes, curOrderPage },
  } = useOrder();

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { isValid },
  } = useForm();

  const { createOrder, orderCreating } = useCreateOrder(reset);

  // 因為munu和edit-order共用相同useReducer，所以在切換頁面時可能出現ui渲染閃爍問題，因此增加判別條件解決閃爍(讓購物車ui只渲染點餐頁面的數據)
  const isCreatingOrder = curOrderPage === "/menu";

  const takeOut = watch("diningMethod") === "takeOut";

  const { totalServings, totalPrice } = calculateOrderSummary(dishes);

  function onSubmit(data) {
    // 非營業時段不能建立訂單
    // if (!settings.isBusinessDay) {
    //   StyledHotToast({
    //     type: "error",
    //     title: "訂單建立失敗",
    //     content: "當前並非店鋪營業時段",
    //   });

    //   return;
    // }

    const orderData = buildOrderData(dishes, data);
    createOrder(orderData);
  }

  function onError(error) {
    console.log(error);
  }

  return (
    <StyledShoppingCart>
      <Header>
        <h4>購物車</h4>
      </Header>

      {dishes.length !== 0 && isCreatingOrder ? (
        <ShoppingList>
          {dishes.map((dish) => (
            <CartItem dish={dish} key={dish.uniqueId} />
          ))}

          <OrderInfoField
            register={register}
            control={control}
            takeOut={takeOut}
            setValue={setValue}
            dishes={dishes}
          />
        </ShoppingList>
      ) : (
        <EmptyShoppingCart />
      )}

      {dishes.length !== 0 && isCreatingOrder && (
        <Footer>
          <Row>
            <span>總計</span>
          </Row>
          <Row>
            <span>{`${isCreatingOrder ? totalServings : 0}份餐點`}</span>
            <span className="emphasize">{`$ ${
              isCreatingOrder ? totalPrice : 0
            }`}</span>
          </Row>

          <Row>
            <SubmitButton
              disabled={dishes.length === 0 || orderCreating || !isValid}
              onClick={handleSubmit(onSubmit, onError)}
            >
              {orderCreating ? <LoadingDotMini /> : "提交"}
            </SubmitButton>
          </Row>
        </Footer>
      )}
    </StyledShoppingCart>
  );
}

export default ShoppingCart;
