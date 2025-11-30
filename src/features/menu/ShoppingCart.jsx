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
import { useState } from "react";
import useScrollLock from "../../hooks/ui/useScrollLock";
import Dot from "../../ui/Dot";
import { X, ShoppingCart as ShoppingCartIcon } from "lucide-react";

const StyledShoppingCart = styled.aside`
  position: fixed;
  border: 1px solid #dcdcdc;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 6px;

  height: min(64.8rem, calc(100dvh - 18.4rem));
  width: 21.6rem;
  overflow: hidden;

  top: 18.4rem;
  left: calc(50% + 50.4rem);

  @media (max-width: 93em) {
    left: auto;
    right: 2.4rem;
  }

  @media (max-width: 50em) {
    right: 1rem;
    display: ${({ $isOpen }) => !$isOpen && "none"};
    top: 0;
    right: 0;
    height: 100dvh;
    width: 100%;
    z-index: 11;
    border: none;
  }
`;

const Header = styled.header`
  padding: 0.8rem 1.6rem;
  border-bottom: 1px solid #dcdcdc;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: space-between;

  h3 {
    font-size: 2.6rem;
    font-weight: 600;
  }

  button {
    display: none;
  }

  @media (max-width: 50em) {
    button {
      display: flex;
    }
  }
`;

const ShoppingList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0 1.6rem;
  height: 100%;
  font-size: 1.4rem;
  overflow-y: scroll;
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

const CartOpenButton = styled.button`
  /* 基本隱藏：大螢幕不顯示 */
  display: none;

  /* 位置與尺寸 */
  position: fixed;
  bottom: 1.8rem;
  left: 50%;
  transform: translateX(-50%);
  width: 85%;
  padding: 0.8rem 2rem;
  border-radius: 999px;

  /* 內容排版 */
  align-items: center;
  justify-content: center;
  gap: 0.6rem;

  /* 視覺樣式 */
  background-color: #2563eb;
  color: #fff;
  font-size: 1.4rem;
  font-weight: 500;

  /* 陰影與過渡 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2), 0 0 6px rgba(37, 99, 235, 0.2);
  transition: transform 0.15s, box-shadow 0.15s;

  /* 點擊回饋 */
  &:active {
    transform: translateX(-50%) scale(0.97);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2), 0 0 4px rgba(37, 99, 235, 0.15);
  }

  /* 小螢幕（800px以下）時顯示 */
  @media (max-width: 50em) {
    display: flex;
  }
`;

const CloseButton = styled.button`
  width: 2.8rem;
  height: 2.8rem;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    border: 1px solid #374151;
    border-radius: 50%;
    transition: all 0.3s;
  }

  &:hover::before {
    transform: scale(1.1);
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  }
`;

function ShoppingCart({ settingsData }) {
  const [isOpen, setIsOpen] = useState(false);

  useScrollLock(50, isOpen, () => setIsOpen(false));

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
        setIsOpen(false);
      },
    });
  }

  function onError(error) {
    console.log(error);
  }

  return (
    <>
      <StyledShoppingCart $isOpen={isOpen}>
        <Header>
          <h3>購物車</h3>

          <CloseButton onClick={() => setIsOpen(false)}>
            <X size={16} />
          </CloseButton>
        </Header>

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
                type="submit"
                $isFullWidth
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

      {dishes.length !== 0 && (
        <CartOpenButton onClick={() => setIsOpen(true)}>
          <ShoppingCartIcon size={18} />
          <Dot $size={0.8} />
          <span>{`共 ${totalServings} 份`}</span>
          <Dot $size={0.8} />
          <span>{`$ ${totalPrice}`}</span>
        </CartOpenButton>
      )}
    </>
  );
}

export default ShoppingCart;
