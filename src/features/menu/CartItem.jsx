import styled from "styled-components";
import Button from "../../ui/Button";
import ServingsControl from "../../ui/ServingsControl";
import { useEffect, useRef, useState } from "react";
import { GoTrash, GoPencil } from "react-icons/go";
import { useOrder } from "../../context/OrderContext";
import { summarizeMealChoices } from "../../utils/orderHelpers";
import OrderForm from "../../ui/OrderForm/OrderForm";

const OrderCardWrapper = styled.li`
  list-style: none;
  border-bottom: 1px solid #d3d3d3;
`;

const OrderCard = styled.div`
  width: 100%;
  padding: 1.2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  font-size: 1.4rem;
  min-height: 10rem;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  line-height: 1.8rem;
`;

const OrderName = styled.h4`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 600;
`;

const OrderAction = styled.div`
  display: flex;
  gap: 0.2rem;
`;

const OrderCustomize = styled.p`
  font-size: 1.2rem;
`;

const Note = styled.p`
  font-size: 1.2rem;
  color: #707070;
  overflow-wrap: break-word;
  width: 100%;
`;

const OrderPrice = styled.span`
  color: #dc2626;
  font-weight: 600;
`;

function CartItem({ order }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [servings, setServings] = useState(order.servings);
  const { dispatch } = useOrder();
  const prevIsOpenModalRef = useRef(isOpenModal);
  const customizeChoices = summarizeMealChoices(order);
  const dishTotalPrice = order.itemTotalPrice * order.servings;

  // 在OrderForm關閉時同步ServingsControl顯示的數據(不會影響到useReducer中的數據，可避免提交表單後或直接關閉OrderForm沒有執行提交時，ServingsControl顯示數據沒有同步更新的問題)
  useEffect(
    function () {
      if (prevIsOpenModalRef.current && !isOpenModal) {
        setServings(order.servings);
      }

      prevIsOpenModalRef.current = isOpenModal;
    },
    [isOpenModal, order.servings]
  );

  return (
    <>
      <OrderCardWrapper>
        <OrderCard>
          <Row>
            <OrderName>{order.name}</OrderName>
            <OrderAction>
              <Button
                $buttonStyle="remove"
                onClick={() => {
                  setIsOpenModal(true);
                }}
              >
                <GoPencil />
              </Button>

              <Button
                $buttonStyle="remove"
                onClick={() => {
                  dispatch({
                    type: "order/removeDish",
                    payload: order.uniqueId,
                  });
                }}
              >
                <GoTrash />
              </Button>
            </OrderAction>
          </Row>

          {customizeChoices.length !== 0 && (
            <Row>
              <OrderCustomize>{customizeChoices}</OrderCustomize>
            </Row>
          )}

          {order.note && (
            <Row>
              <Note>{`"${order.note}"`}</Note>
            </Row>
          )}

          <Row>
            <OrderPrice>$ {dishTotalPrice}</OrderPrice>
            <ServingsControl
              type="sm"
              servings={servings}
              setServings={setServings}
              dishData={order}
              liveUpdate={true}
            />
          </Row>
        </OrderCard>
      </OrderCardWrapper>

      {isOpenModal && (
        <OrderForm
          dishData={order}
          onCloseModal={() => setIsOpenModal(false)}
          isEdit={true}
        />
      )}
    </>
  );
}

export default CartItem;
