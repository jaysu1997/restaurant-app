// 訂單詳情頁面中的訂購餐點列表
import {
  calcOrderTotalPrice,
  summarizeMealChoices,
  calcOrderTotalItems,
} from "../../utils/helpers";
import { FiMinus } from "react-icons/fi";
import { GoTrash, GoPencil } from "react-icons/go";
import Button from "../../ui/Button";
import styled from "styled-components";

const OrderDishesList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const OrderDishRow = styled.li`
  display: grid;
  grid-template-columns: ${(props) =>
    props.$isEdit
      ? "2.6rem minmax(0px, 1fr) minmax(0px, 1fr) minmax(0px, 1fr) minmax(0px, 0.5fr) minmax(0px, 0.5fr)"
      : "minmax(0px, 1fr) minmax(0px, 1fr) minmax(0px, 1fr) minmax(0px, 0.5fr) minmax(0px, 0.5fr)"};

  column-gap: 1rem;
  padding: 1rem;
  overflow-wrap: break-word;

  &:first-child {
    background-color: #e7e5e4;
    border-radius: 6px;
    font-size: 1.4rem;
    font-weight: 400;
  }

  &:not(:first-child):not(:last-child) {
    min-height: 8.1rem;
    border-bottom: 1px solid #dcdcdc;
  }

  &:last-child {
    display: flex;
    margin-left: auto;
    font-size: 1.8rem;
    font-weight: 600;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

function OrderDishes({ dishData, isEdit, setIsOpenModal, setSelectedDish }) {
  return (
    <OrderDishesList>
      <OrderDishRow $isEdit={isEdit}>
        {isEdit && <span></span>}
        <span>名稱</span>
        <span>細項</span>
        <span>備註</span>
        <span>份量</span>
        <span>小計</span>
      </OrderDishRow>

      {dishData.map((dish) => (
        <OrderDishItem
          dishData={dish}
          isEdit={isEdit}
          setIsOpenModal={setIsOpenModal}
          setSelectedDish={setSelectedDish}
          key={dish.uniqueId}
        />
      ))}

      <OrderDishRow>
        <span>總計：</span>
        <span>共{calcOrderTotalItems(dishData)}份</span>
        <span>/</span>
        <span className="emphasize">$ {calcOrderTotalPrice(dishData)}</span>
      </OrderDishRow>
    </OrderDishesList>
  );
}

function OrderDishItem({ dishData, isEdit, setIsOpenModal, setSelectedDish }) {
  return (
    <OrderDishRow $isEdit={isEdit}>
      {isEdit && (
        <ButtonGroup>
          <Button
            $buttonStyle="remove"
            onClick={() => {
              setSelectedDish(dishData);
              setIsOpenModal("orderForm");
            }}
          >
            <GoPencil />
          </Button>
          <Button $buttonStyle="remove">
            <GoTrash />
          </Button>
        </ButtonGroup>
      )}

      <span>{dishData.name}</span>
      <span>{summarizeMealChoices(dishData) || <FiMinus />}</span>
      <span>{dishData.note || <FiMinus />}</span>
      <span>{dishData.servings}份</span>
      <span>$ {dishData.itemTotalPrice * dishData.servings}</span>
    </OrderDishRow>
  );
}

export default OrderDishes;
