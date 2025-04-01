import styled from "styled-components";
import Button from "../../ui/Button";
import ServingsControl from "../../ui/ServingsControl";
import { useState } from "react";
import { GoTrash, GoPencil } from "react-icons/go";
import { useOrder } from "../../context/OrderContext";
import Modal from "../../ui/Modal";
import OrderForm from "./OrderForm";
import { summarizeMealChoices } from "../../utils/helpers";

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 1.8rem;
  line-height: 1.8rem;
`;

const OrderCardWrapper = styled.li`
  list-style: none;
  border-bottom: 1px solid #d3d3d3;
`;

const OrderCard = styled.div`
  width: 100%;
  padding: 1.2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: 1.4rem;
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
  const [servings, setServings] = useState(order.servings || 1);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { dispatch } = useOrder();
  const customizeChoices = summarizeMealChoices(order);
  const dishTotalPrice = order.itemTotalPrice * order.servings;

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
                    type: "order/remove",
                    payload: order.itemId,
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

          {customizeChoices.length === 0 && !order.note && <Row />}

          <Row>
            <OrderPrice>$ {dishTotalPrice}</OrderPrice>
            <ServingsControl
              servings={servings}
              setServings={setServings}
              type="sm"
              order={order}
            />
          </Row>
        </OrderCard>
      </OrderCardWrapper>

      {isOpenModal && (
        <Modal
          onCloseModal={() => setIsOpenModal(false)}
          modalHeader={order.name}
          maxWidth={36}
        >
          <OrderForm
            dishData={order}
            onCloseModal={() => setIsOpenModal(false)}
            edit={true}
          />
        </Modal>
      )}
    </>
  );
}

export default CartItem;
