import styled from "styled-components";
import ServingsControl from "../../ui/ServingsControl";
import { useEffect, useRef, useState } from "react";
import useOrder from "../../context/order/useOrder";
import { summarizeMealChoices } from "../../utils/orderHelpers";
import OrderForm from "../../ui/OrderForm/OrderForm";
import Button from "../../ui/Button";
import { Trash2, SquarePen } from "lucide-react";

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
    [isOpenModal, dish.servings],
  );

  return (
    <>
      <OrderCardWrapper>
        <OrderCard>
          <Row>
            <OrderName>{dish.name}</OrderName>
            <OrderAction>
              <Button
                $variant="ghost"
                onClick={() => {
                  setIsOpenModal(true);
                }}
              >
                <SquarePen />
              </Button>

              <Button
                $variant="ghost"
                onClick={() => {
                  dispatch({
                    type: "dishes/removeDish",
                    payload: dish.uniqueId,
                  });
                }}
              >
                <Trash2 />
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
              <Note>&quot;{dish.note}&quot;</Note>
            </Row>
          )}

          <Row>
            <ServingsControl
              type="sm"
              servings={servings}
              setServings={setServings}
              orderDish={dish}
              liveUpdate={true}
            />
            <OrderPrice>$ {dishTotalPrice}</OrderPrice>
          </Row>
        </OrderCard>
      </OrderCardWrapper>

      {isOpenModal && (
        <OrderForm
          orderDish={dish}
          onCloseModal={() => setIsOpenModal(false)}
          isEdit={true}
        />
      )}
    </>
  );
}

export default CartItem;
