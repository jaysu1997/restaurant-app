import styled from "styled-components";
import { useOrder } from "../../context/OrderContext";
import CartItem from "./CartItem";
import { useForm } from "react-hook-form";
import OrderInfoField from "./OrderInfoField";
import {
  buildOrderData,
  calculateOrderSummary,
} from "../../utils/orderHelpers";
import EmptyShoppingCart from "./EmptyShoppingCart";
import useCreateOrder from "../../hooks/data/orders/useCreateOrder";
import ButtonSpinner from "../../ui/ButtonSpinner";
import Button from "../../ui/Button";

const StyledShoppingCart = styled.aside`
  border: 1px solid #dcdcdc;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 6px;

  height: min(64.8rem, calc(100dvh - 18.4rem));
  width: 21.6rem;
  overflow: hidden;

  top: 18.4rem;
  position: fixed;
  left: calc(50% + 50.4rem);

  @media (max-width: 91.25em) {
    left: auto;
    right: 1rem;
  }
`;

const Header = styled.header`
  padding: 0.8rem 1.6rem;
  border-bottom: 1px solid #dcdcdc;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  z-index: 1;
  font-size: 2.8rem;
  font-weight: 600;
`;

const ShoppingList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0 1.6rem;
  height: 100%;
  font-size: 1.4rem;
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
  font-weight: 600;
`;

function ShoppingCart({ settingsData }) {
  const {
    state: { dishes },
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

  const { createOrder, orderCreating } = useCreateOrder();

  const takeOut = watch("diningMethod") === "外帶";

  const { totalServings, totalPrice } = calculateOrderSummary(dishes);

  function onSubmit(data) {
    const orderData = buildOrderData(dishes, data);

    createOrder(orderData, {
      onSuccess: () => {
        dispatch({ type: "order/reset" });
        reset();
      },
    });
  }

  function onError(error) {
    console.log(error);
  }

  return (
    <StyledShoppingCart>
      <Header>購物車</Header>

      {dishes.length !== 0 ? (
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
            settingsData={settingsData}
          />
        </ShoppingList>
      ) : (
        <EmptyShoppingCart />
      )}

      {dishes.length !== 0 && (
        <Footer>
          <Row>
            <span>總計</span>
          </Row>
          <Row>
            <span>{`${totalServings}份餐點`}</span>
            <span className="emphasize">{`$ ${totalPrice}`}</span>
          </Row>

          <Row>
            <Button
              $type="primary"
              $size="xl"
              $rounded="sm"
              $isLoading={orderCreating}
              disabled={dishes.length === 0 || orderCreating || !isValid}
              onClick={handleSubmit(onSubmit, onError)}
            >
              <span>提交</span>
              {orderCreating && <ButtonSpinner />}
            </Button>
          </Row>
        </Footer>
      )}
    </StyledShoppingCart>
  );
}

export default ShoppingCart;
