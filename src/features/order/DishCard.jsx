import { useState } from "react";
import styled from "styled-components";
import Modal from "../../ui/Modal";
import OrderForm from "./OrderForm";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f9fafb;
  gap: 0.2rem;
  padding: 0.6rem;
  max-width: 24rem;
  border-radius: 5px;
  border: none;
  transition: all 0.3s;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  outline: 2px solid #dcdcdc;

  &:hover {
    background-color: #d1fae5;
    /* transform: scale(1.02); */
    outline: 2px solid #93c5fd;
  }
`;

const Row = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${(props) => props.$fontColor};
  font-weight: ${(props) => props.$fontWeight || "400"};
`;

function DishCard({ dish }) {
  const [openModal, setOpenModal] = useState(false);

  const ingredientsList = dish.ingredients
    .map((ing) => ing.ingredientName.label)
    .join(", ");

  return (
    <>
      <Card key={dish.id} onClick={() => setOpenModal(dish.id)}>
        <Row $fontColor="#1f2937" $fontWeight="500">
          {dish.name}
        </Row>
        <Row $fontColor="#dc2626">
          <span>$ </span>
          {dish.price - dish.discount}
        </Row>
        <Row $fontColor="#6b7280">{ingredientsList}</Row>
      </Card>

      {openModal && (
        <Modal modalHeader={dish.name} onCloseModal={() => setOpenModal(false)}>
          <OrderForm dishData={dish} onCloseModal={() => setOpenModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default DishCard;
