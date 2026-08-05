// ok
import styled from "styled-components";
import { FormProvider, useForm } from "react-hook-form";
import EmptyCart from "./EmptyCart";
import useCreateOrder from "../../../hooks/data/orders/useCreateOrder";
import { useState } from "react";
import useScrollLock from "../../../hooks/ui/useScrollLock";
import CartOpenButton from "./CartOpenButton";
import SubmitButton from "../../../components/button/SubmitButton";
import CartItem from "./CartItem";
import useMediaQuery from "../../../hooks/ui/useMediaQuery";
import Price from "../../../components/Price";
import useOrderDraft from "../../../context/orders/useOrderDraft";
import {
  buildOrderData,
  calculateOrderSummary,
} from "../../../utils/orderHelpers";
import ModalCloseButton from "../../../components/ModalCloseButton";
import CartOrderInfo from "./CartOrderInfo";

const StyledShoppingCart = styled.aside`
  position: fixed;
  top: 18rem;
  right: calc(50% - 72rem);
  border: 1px solid #dcdcdc;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  height: min(64.8rem, calc(100dvh - 18rem));
  width: 26rem;
  overflow: hidden;
  z-index: 100;

  @media (max-width: 93em) {
    right: 2.4rem;
  }

  @media (max-width: 50em) {
    inset: 0;
    display: ${({ $isCartOpen }) => ($isCartOpen ? "flex" : "none")};
    height: 100%;
    width: 100%;
    border: none;
    border-radius: 0;
  }
`;

const Header = styled.header`
  padding: 0.8rem 1.6rem;
  border-bottom: 1px solid #dcdcdc;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
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

const CartContent = styled.div`
  padding: 0 1.6rem;
  height: 100%;
  overflow-y: auto;
  scrollbar-gutter: stable;
`;

const CartList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const Footer = styled.footer`
  border-top: 1px solid #dcdcdc;
  background-color: #fff;
  width: 100%;
  padding: 1.6rem;
  box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.05);
`;

const OrderSummary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  font-weight: 500;
  padding: 0.8rem 0 2.4rem 0;
`;

function ShoppingCart({ canPlaceOrder }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { createOrder, isCreatingOrder } = useCreateOrder();
  const onClose = () => setIsCartOpen(false);
  const isMatched = useMediaQuery(50, onClose);
  // 自動鎖定 scrollbar
  useScrollLock(isMatched && isCartOpen);

  const {
    state: { items },
    dispatch,
  } = useOrderDraft();

  const methods = useForm({
    defaultValues: {
      diningMethod: "內用",
      status: {
        label: "準備中",
        value: "準備中",
      },
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = methods;

  const hasItems = items.length > 0;

  const { totalServings, totalPrice } = calculateOrderSummary(items);

  function onSubmit(data) {
    const orderData = buildOrderData(items, data);

    createOrder(orderData, {
      onSuccess: () => {
        dispatch({ type: "draft/reset" });
        reset();
        setIsCartOpen(false);
      },
    });
  }

  return (
    <FormProvider {...methods}>
      <StyledShoppingCart $isCartOpen={isCartOpen}>
        <Header>
          <h3>購物車</h3>
          <ModalCloseButton onClose={onClose} />
        </Header>

        {!hasItems ? (
          <EmptyCart />
        ) : (
          <>
            <CartContent>
              <CartList>
                {items.map((item) => (
                  <CartItem item={item} key={item.uniqueId} />
                ))}
              </CartList>

              <CartOrderInfo canPlaceOrder={canPlaceOrder} />
            </CartContent>

            <Footer>
              <OrderSummary>
                <span>總計：</span>
                <Price>{`$ ${totalPrice}`}</Price>
              </OrderSummary>

              <SubmitButton
                fullWidth
                processing={isCreatingOrder}
                disabled={!hasItems || isCreatingOrder || !isValid}
                onClick={handleSubmit(onSubmit)}
              >
                提交
              </SubmitButton>
            </Footer>
          </>
        )}
      </StyledShoppingCart>

      {hasItems && (
        <CartOpenButton
          totalServings={totalServings}
          totalPrice={totalPrice}
          onOpen={() => setIsCartOpen(true)}
        />
      )}
    </FormProvider>
  );
}

export default ShoppingCart;
