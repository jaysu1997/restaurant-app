import styled from "styled-components";
import { useOrder } from "../../context/OrderContext";
import StyledOverlayScrollbars from "../../ui/StyledOverlayScrollbars";
import CartItem from "./CartItem";
import { FaShoppingCart } from "react-icons/fa";
import { GrClear } from "react-icons/gr";
import { useForm } from "react-hook-form";
import OrderInfoField from "./OrderInfoField";
import useCreateOrder from "./useCreateOrder";
import LoadingDotMini from "../../ui/LoadingDotMini";
import OrderTypeSwitch from "../../ui/OrderTypeSwitch";

const StyledShoppingCart = styled.aside`
  grid-column: 2 / 3;
  grid-row: 1 / -1;
  border: 1px solid #dcdcdc;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  font-size: 1.4rem;
  max-height: clamp(0rem, calc(100dvh - 16.2rem), 64.8rem);
  height: 100dvh;
  position: sticky;
  top: 16.2rem;
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

  svg {
    height: 1.4rem;
    width: 1.4rem;
  }

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

  svg {
    width: 2rem;
    height: 2rem;
  }
`;

const EmptyShoppingCart = styled.div`
  flex: 1;
  max-height: 40rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;

  svg {
    width: 6.4rem;
    height: 6.4rem;
    color: #a1a1aa;
  }

  span {
    font-size: 1.6rem;
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
    formState: { isValid },
  } = useForm();

  const { createOrder, orderCreating } = useCreateOrder(reset);

  // 因為munu和edit-order共用相同useReducer，所以在切換頁面時可能出現ui渲染閃爍問題，因此增加判別條件解決閃爍(讓購物車ui只渲染點餐頁面的數據)
  const isCreatingOrder = curOrderPage === "/menu";

  const dineOption = watch("dineOption");

  const { totalQuantity, totalCost } = order.reduce(
    (acc, cur) => {
      acc.totalQuantity += cur.servings;
      acc.totalCost += cur.servings * cur.itemTotalPrice;

      return acc;
    },
    { totalQuantity: 0, totalCost: 0 }
  );

  function onSubmit(data) {
    // 計算訂單的食材總共使用量
    const totalIngredientsUsage = Object.fromEntries(
      order.reduce((acc, order) => {
        order.ingredientsUsage.forEach((quantity, name) => {
          const curQuantity = acc.get(name) || 0;
          acc.set(name, curQuantity + quantity * order.servings);
        });

        return acc;
      }, new Map())
    );

    const orderData = {
      orderType: dineOption ? "外帶" : "內用",
      order: order.map((dish) => ({
        ...dish,
        ingredientsUsage: Object.fromEntries(dish.ingredientsUsage),
      })),
      totalIngredientsUsage,
      ...data,
      tableNumber: dineOption ? null : data.tableNumber.value,
      pickupTime: dineOption ? data.pickupTime.value : null,
    };

    createOrder(orderData);
  }

  function onError(error) {
    console.log(Object.values(error).map((value) => value.message));
  }

  return (
    <StyledShoppingCart>
      <Header>
        <h4>購物車</h4>
        <Row>
          <OrderTypeSwitch dineOption={dineOption} control={control} />
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
              <GrClear />
              <span>清空</span>
            </ClearAllButton>
          )}
        </Row>
      </Header>

      {order.length !== 0 && isCreatingOrder ? (
        <StyledOverlayScrollbars>
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
        </StyledOverlayScrollbars>
      ) : (
        <EmptyShoppingCart>
          <FaShoppingCart />
          <span>開始選擇美味的餐點吧！</span>
        </EmptyShoppingCart>
      )}

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
            disabled={order.length === 0 || !isValid}
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
