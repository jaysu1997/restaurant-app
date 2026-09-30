// ok
import styled from "styled-components";
import { FormProvider, useForm } from "react-hook-form";
import EmptyCart from "./EmptyCart";
import useCreateOrder from "../../../hooks/data/orders/useCreateOrder";
import { useState } from "react";
import useScrollLock from "../../../hooks/ui/useScrollLock";
import MobileCartTrigger from "./MobileCartTrigger";
import OrderItem from "../../orders/components/OrderItem";
import useMediaQuery from "../../../hooks/ui/useMediaQuery";
import useOrderDraft from "../../../context/orders/useOrderDraft";
import {
  buildOrderData,
  calculateOrderSummary,
} from "../../../utils/orderHelpers";
import CartOrderInfo from "./CartOrderInfo";
import CartHeader from "./CartHeader";
import CartFooter from "./CartFooter";

const CartContainer = styled.aside`
  position: fixed;
  top: 18rem;
  right: calc(50% - 72rem);
  z-index: 100;
  width: 32rem;
  height: min(64.8rem, calc(100dvh - 18rem));
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;

  box-shadow:
    0 1px 2px rgba(15, 23, 42, 0.04),
    0 4px 12px rgba(15, 23, 42, 0.04);

  @media (max-width: 93em) {
    right: 2.4rem;
  }

  @media (max-width: 50em) {
    display: ${({ $isCartOpen }) => ($isCartOpen ? "flex" : "none")};
    inset: 0;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 0;
    box-shadow: none;
  }
`;

const CartBody = styled.div`
  flex: 1;
  padding: 0 2rem;
  overflow-y: auto;
`;

const CartItemList = styled.ul`
  border-bottom: 1px solid #e5e7eb;
`;

function ShoppingCart({ canPlaceOrder, onEditDish }) {
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

  const { totalServings, totalAmount } = calculateOrderSummary(items);

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
      <CartContainer $isCartOpen={isCartOpen} aria-label="購物車">
        <CartHeader onClose={onClose} />

        {!hasItems ? (
          <EmptyCart />
        ) : (
          <CartBody>
            <CartItemList>
              {items.map((item) => (
                <OrderItem
                  item={item}
                  canModifyItems={canPlaceOrder}
                  isEdit={true}
                  onEditDish={onEditDish}
                  key={item.uniqueId}
                />
              ))}
            </CartItemList>

            <CartOrderInfo canPlaceOrder={canPlaceOrder} />
          </CartBody>
        )}

        {hasItems && (
          <CartFooter
            totalAmount={totalAmount}
            isCreatingOrder={isCreatingOrder}
            onSubmit={handleSubmit(onSubmit)}
            isValid={isValid}
          />
        )}
      </CartContainer>

      {hasItems && (
        <MobileCartTrigger
          totalServings={totalServings}
          totalAmount={totalAmount}
          onOpen={() => setIsCartOpen(true)}
        />
      )}
    </FormProvider>
  );
}

export default ShoppingCart;
