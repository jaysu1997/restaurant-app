import { useState } from "react";
import styled, { css } from "styled-components";
import Modal from "../../ui/Modal";
import DishOrderForm from "./DishOrderForm";

const StyleDishesList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  padding: 1rem;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f3f4f6;
  gap: 0.2rem;
  padding: 0.6rem;
  max-width: 24rem;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.15);
  transition: all 0.3s;

  &:hover {
    background-color: #d1fae5;
    transform: scale(1.02);
  }
`;

const rowStyle = {
  head: css`
    color: #1f2937;
    font-size: 2rem;
  `,
  price: css`
    color: #dc2626;
  `,
  ingredients: css`
    color: #6b7280;
  `,
};

const Row = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  ${(props) => rowStyle[props.type]}
`;

// 食材清單
const ingredientsList = (ings) => ings.map((ing) => ing.label1).join(", ");

function DishesList({ dishes }) {
  const [openModal, setOpenModal] = useState(false);

  const [dishData] = dishes.filter((dish) => dish.id === openModal);

  return (
    <>
      <StyleDishesList>
        {dishes.map((dish) => (
          <Card key={dish.id} onClick={() => setOpenModal(dish.id)}>
            <Row type="head">{dish.name}</Row>
            <Row type="price">
              <span>$ </span>
              {dish.price - dish.discount}
            </Row>
            <Row type="ingredients">{ingredientsList(dish.ingredients)}</Row>
          </Card>
        ))}
      </StyleDishesList>

      {openModal && (
        <Modal onCloseModal={() => setOpenModal(false)}>
          <DishOrderForm dishData={dishData} />
        </Modal>
      )}
    </>
  );
}

export default DishesList;
