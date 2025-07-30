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

function CartItem({ dish }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [servings, setServings] = useState(dish.servings);
  const { dispatch } = useOrder();
  const prevIsOpenModalRef = useRef(isOpenModal);
  const customizeChoices = summarizeMealChoices(dish);
  const dishTotalPrice = dish.itemTotalPrice * dish.servings;

  // 開啟OrderForm「更新」購物車中已訂購餐點的servings，並不會同步更新CartItem元件的servings，所以使用這個useEffect同步更新(至於useReducer中的數據則會同步更新，但如果這裡不進行同步，後續直接使用CartItem更新份量會造成錯誤)
  useEffect(
    function () {
      if (prevIsOpenModalRef.current && !isOpenModal) {
        setServings(dish.servings);
      }

      prevIsOpenModalRef.current = isOpenModal;
    },
    [isOpenModal, dish.servings]
  );

  return (
    <>
      <OrderCardWrapper>
        <OrderCard>
          <Row>
            <OrderName>{dish.name}</OrderName>
            <OrderAction>
              <Button
                $buttonStyle="remove"
                onClick={() => {
                  setIsOpenModal(true);
                }}
              >
                <GoPencil strokeWidth={0.6} />
              </Button>

              <Button
                $buttonStyle="remove"
                onClick={() => {
                  dispatch({
                    type: "dishes/removeDish",
                    payload: dish.uniqueId,
                  });
                }}
              >
                <GoTrash strokeWidth={0.6} />
              </Button>
            </OrderAction>
          </Row>

          {customizeChoices.length !== 0 && (
            <Row>
              <OrderCustomize>{customizeChoices}</OrderCustomize>
            </Row>
          )}

          {dish.note && (
            <Row>
              <Note>{`"${dish.note}"`}</Note>
            </Row>
          )}

          <Row>
            <OrderPrice>$ {dishTotalPrice}</OrderPrice>
            <ServingsControl
              type="sm"
              servings={servings}
              setServings={setServings}
              dishData={dish}
              liveUpdate={true}
            />
          </Row>
        </OrderCard>
      </OrderCardWrapper>

      {isOpenModal && (
        <OrderForm
          dishData={dish}
          onCloseModal={() => setIsOpenModal(false)}
          isEdit={true}
        />
      )}
    </>
  );
}

export default CartItem;
