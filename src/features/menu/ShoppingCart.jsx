import styled from "styled-components";
import { useOrder } from "../../context/OrderContext";
import StyledOverlayScrollbars from "../../ui/StyledOverlayScrollbars";
import CartItem from "./CartItem";
import { GrClear } from "react-icons/gr";
import { useForm } from "react-hook-form";
import OrderInfoField from "./OrderInfoField";
import LoadingDotMini from "../../ui/LoadingDotMini";
import OrderTypeSwitch from "../../ui/OrderTypeSwitch";
import {
  buildOrderData,
  calculateOrderSummary,
} from "../../utils/orderHelpers";
import EmptyShoppingCart from "./EmptyShoppingCart";
import { handleRHFSubmitError } from "../../utils/handleRHFSubmitError";
import useCreateOrder from "../../hooks/data/orders/useCreateOrder";

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
  max-height: clamp(12rem, calc(100dvh - 17.8rem), 64.8rem);
  height: 64.8rem;
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
    font-size: 3.2rem;
    margin-bottom: 1.6rem;
  }
`;

const ShoppingList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0 1.6rem;
  height: 40rem;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const ClearAllButton = styled.button`
  color: #e63946;
  border: 1px solid #e63946;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  background-color: transparent;
  border-radius: 15px;
  height: 2.4rem;
  padding: 0.3rem 0.6rem;

  span {
    font-size: 1.4rem;
    line-height: 1.6;
    font-weight: 600;
  }
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

function ShoppingCart({ inventoryData }) {
  const {
    state: { order, curOrderPage },
    dispatch,
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

  const dineOption = watch("orderType") === "外帶";

  const { totalQuantity, totalCost } = calculateOrderSummary(order);

  function onSubmit(data) {
    const orderData = buildOrderData(order, data);
    createOrder(orderData);
  }

  function onError(error) {
    return handleRHFSubmitError(error, "訂單建立失敗");
  }

  return (
    <StyledShoppingCart>
      <Header>
        <h4>購物車</h4>
        <Row>
          <OrderTypeSwitch
            dineOption={dineOption}
            control={control}
            setValue={setValue}
            isDisabled={order.length === 0}
          />
          {order.length !== 0 && isCreatingOrder && (
            <ClearAllButton
              onClick={() => {
                dispatch({ type: "order/reset" });
                dispatch({
                  type: "inventory/setAll",
                  payload: inventoryData,
                });
                reset();
              }}
            >
              <GrClear size={14} />
              <span>清空</span>
            </ClearAllButton>
          )}
        </Row>
      </Header>

      <StyledOverlayScrollbars>
        {order.length !== 0 && isCreatingOrder ? (
          <ShoppingList>
            <>
              {order.map((order) => (
                <CartItem order={order} key={order.uniqueId} />
              ))}

              <OrderInfoField
                register={register}
                control={control}
                dineOption={dineOption}
              />
            </>
          </ShoppingList>
        ) : (
          <EmptyShoppingCart />
        )}
      </StyledOverlayScrollbars>

      <Footer>
        <Row>
          <span>總計</span>
        </Row>
        <Row>
          <span>{`${isCreatingOrder ? totalQuantity : 0}份餐點`}</span>
          <span className="emphasize">{`$ ${
            isCreatingOrder ? totalCost : 0
          }`}</span>
        </Row>

        <Row>
          <SubmitButton
            disabled={order.length === 0 || orderCreating || !isValid}
            onClick={handleSubmit(onSubmit, onError)}
          >
            {orderCreating ? <LoadingDotMini /> : "提交"}
          </SubmitButton>
        </Row>
      </Footer>
    </StyledShoppingCart>
  );
}

export default ShoppingCart;
