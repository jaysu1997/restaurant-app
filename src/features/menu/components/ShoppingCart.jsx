import styled from "styled-components";
import { FormProvider, useForm } from "react-hook-form";
import OrderInfoField from "./OrderInfoField";
import EmptyShoppingCart from "./EmptyShoppingCart";
import useCreateOrder from "../../../hooks/data/orders/useCreateOrder";
import { useState } from "react";
import useScrollLock from "../../../hooks/ui/useScrollLock";
import CartOpenButton from "./CartOpenButton";
import ButtonSubmit from "../../../ui/ButtonSubmit";
import CartItem from "./CartItem";
import useMediaQuery from "../../../hooks/ui/useMediaQuery";
import Price from "../../../components/Price";
import useOrderDraft from "../../../context/orders/useOrderDraft";
import {
  buildOrderData,
  calculateOrderSummary,
} from "../../../utils/orderHelpers";
import ModalCloseButton from "../../../components/ModalCloseButton";

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
  width: 24rem;
  overflow: hidden;
  z-index: 100;

  @media (max-width: 93em) {
    right: 2.4rem;
  }

  @media (max-width: 50em) {
    inset: 0;
    display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
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
  flex-wrap: wrap;
  row-gap: 1rem;
  column-gap: 0px;
  font-weight: 500;
  margin-bottom: 1.6rem;
`;

const SummaryDetails = styled.div`
  display: flex;
  gap: 1rem;
`;

function ShoppingCart() {
  const [isOpen, setIsOpen] = useState(false);
  const { createOrder, isCreatingOrder } = useCreateOrder();
  const onClose = () => setIsOpen(false);
  const isMatched = useMediaQuery(50, onClose);
  // 自動鎖定 scrollbar
  useScrollLock(isMatched && isOpen);

  const {
    state: { items },
    dispatch,
  } = useOrderDraft();

  const methods = useForm({
    defaultValues: { diningMethod: "內用" },
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid, isSubmitting },
  } = methods;

  const isProcessing = isCreatingOrder || isSubmitting;

  const hasItems = items.length > 0;

  const { totalServings, totalPrice } = calculateOrderSummary(items);

  function onSubmit(data) {
    const orderData = buildOrderData(items, data);

    createOrder(orderData, {
      onSuccess: () => {
        dispatch({ type: "draft/reset" });
        reset();
        setIsOpen(false);
      },
    });
  }

  function onError(error) {
    console.log(error);
  }

  return (
    <FormProvider {...methods}>
      <StyledShoppingCart $isOpen={isOpen}>
        <Header>
          <h3>購物車</h3>
          <ModalCloseButton onClose={onClose} />
        </Header>

        {hasItems ? (
          <CartContent>
            <CartList>
              {items.map((item) => (
                <CartItem item={item} key={item.uniqueId} />
              ))}
            </CartList>

            <OrderInfoField hasItems={hasItems} />
          </CartContent>
        ) : (
          <EmptyShoppingCart />
        )}

        {hasItems && (
          <Footer>
            <OrderSummary>
              <span>總計：</span>
              <SummaryDetails>
                <span>{`共 ${totalServings} 份`}</span>
                <Price>{`$ ${totalPrice}`}</Price>
              </SummaryDetails>
            </OrderSummary>

            <ButtonSubmit
              label="提交"
              fullWidth={true}
              isProcessing={isProcessing}
              disabled={!hasItems || isProcessing || !isValid}
              onClick={handleSubmit(onSubmit, onError)}
            />
          </Footer>
        )}
      </StyledShoppingCart>

      {hasItems && (
        <CartOpenButton
          totalServings={totalServings}
          totalPrice={totalPrice}
          onOpen={() => setIsOpen(true)}
        />
      )}
    </FormProvider>
  );
}

export default ShoppingCart;
