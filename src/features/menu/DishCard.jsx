import { useState } from "react";
import styled from "styled-components";
import Modal from "../../ui/Modal";
import OrderForm from "./OrderForm";

const StyledDishCard = styled.li`
  list-style: none;
  max-width: 100%;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f9fafb;
  gap: 0.2rem;
  padding: 0.6rem;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #dcdcdc;
  transition: all 0.3s;
  text-overflow: ellipsis;
  cursor: pointer;

  &:hover {
    background-color: #d1fae5;
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
    <StyledDishCard>
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
        <Modal
          modalHeader={dish.name}
          maxWidth={36}
          onCloseModal={() => setOpenModal(false)}
        >
          <OrderForm dishData={dish} onCloseModal={() => setOpenModal(false)} />
        </Modal>
      )}
    </StyledDishCard>
  );
}

export default DishCard;
