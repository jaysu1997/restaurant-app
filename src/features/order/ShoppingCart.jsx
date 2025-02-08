import styled from "styled-components";
import { useOrder } from "../../context/OrderContext";
import StyledOverlayScrollbars from "../../ui/StyledOverlayScrollbars";
import CartItem from "./CartItem";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { GrClear } from "react-icons/gr";

const StyledShoppingCart = styled.aside`
  grid-column: 2 / 3;
  grid-row: 1 / -1;
  border: 1px solid #dcdcdc;
  background-color: #f9fafb;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  font-size: 1.4rem;
  max-height: calc(100dvh - 16.2rem);
  height: fit-content;
  position: relative;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  padding: 0.8rem 1.6rem;
  border-bottom: 1px solid #dcdcdc;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  z-index: 1;
  gap: 0.6rem;
  font-weight: 600;

  h4 {
    font-size: 3.2rem;
    margin-bottom: 1.6rem;
  }
`;

const ShoppingList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0 1.6rem;
  height: 32rem;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 0.6rem;
`;

const ClearAllButton = styled.button`
  color: #e63946;
  border: 1px solid #e63946;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const OrderListNote = styled.div`
  padding: 1.6rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  h5 {
    font-size: 1.4rem;
  }

  textarea {
    width: 100%;
    height: 6.4rem;
  }
`;

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #dcdcdc;
  align-items: center;
  justify-content: center;
  position: sticky;
  z-index: 1;
  bottom: 0;
  padding: 1.6rem;
  box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.05);
  gap: 1.2rem;
  font-size: 1.6rem;
  font-weight: 600;
`;

const TotalPrice = styled.span`
  color: #dc2626;
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

  &:disabled {
    opacity: 0.5;
  }
`;

const StyledToggleSwitch = styled.label`
  height: 3.2rem;
  width: 9.6rem;
  background-color: #d6d3d1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.3rem;
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;

  input:checked + span {
    transform: translateX(4.5rem);
  }
`;

const Option = styled.div`
  height: 2.6rem;
  width: 9rem;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 1.2rem;
  line-height: 1.2;
  z-index: 1;
`;

const Slider = styled.span`
  position: absolute;
  height: 2.6rem;
  width: 4.5rem;
  background-color: #fff;
  border-radius: 15px;
  top: 0.3rem;
  left: 0.3rem;
  transition: all 0.3s;
`;

const EmptyShoppingCart = styled.div`
  height: 100%;
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

function ToggleSwitch({ setDineOption }) {
  return (
    <StyledToggleSwitch>
      <input
        type="checkbox"
        hidden
        onChange={(e) =>
          e.target.checked ? setDineOption("外帶") : setDineOption("內用")
        }
      />
      <Slider />
      <Option>
        <span>內用</span>
      </Option>
      <Option>
        <span>外帶</span>
      </Option>
    </StyledToggleSwitch>
  );
}

function ShoppingCart({ inventoryData }) {
  const {
    state: { orderList },
    dispatch,
  } = useOrder();

  const [dineOption, setDineOption] = useState("內用");

  const { totalQuantity, totalCost } = orderList.reduce(
    (acc, cur) => {
      acc.totalQuantity += cur.servings;
      acc.totalCost += cur.servings * cur.costPerServing;

      return acc;
    },
    { totalQuantity: 0, totalCost: 0 }
  );

  return (
    <StyledShoppingCart>
      <Header>
        <h4>購物車</h4>
        <Row>
          <ToggleSwitch setDineOption={setDineOption} />
          {orderList.length !== 0 && (
            <ClearAllButton
              onClick={() => {
                dispatch({ type: "orderList/clear" });
                dispatch({
                  type: "inventory/remainingQuantity",
                  payload: inventoryData,
                });
              }}
            >
              <GrClear />
              <span>清空</span>
            </ClearAllButton>
          )}
        </Row>
      </Header>

      <StyledOverlayScrollbars style={{ maxHeight: "100%" }} autoHide="scroll">
        <ShoppingList>
          {orderList.length === 0 ? (
            <EmptyShoppingCart>
              <FaShoppingCart />
              <span>開始選擇美味的餐點吧！</span>
            </EmptyShoppingCart>
          ) : (
            <>
              {orderList.map((order) => (
                <CartItem key={order.uniqueId} order={order} />
              ))}

              <OrderListNote>
                <h5>訂單備註：</h5>
                <textarea maxLength="50" placeholder="備註內容最多50個字" />
              </OrderListNote>
            </>
          )}
        </ShoppingList>
      </StyledOverlayScrollbars>

      <Footer>
        <Row>
          <span>總計</span>
        </Row>
        <Row>
          <span>{`${totalQuantity}份餐點`}</span>
          <TotalPrice>{`$ ${totalCost}`}</TotalPrice>
        </Row>
        <Row>
          <SubmitButton disabled={orderList.length === 0}>提交</SubmitButton>
        </Row>
      </Footer>
    </StyledShoppingCart>
  );
}

export default ShoppingCart;
