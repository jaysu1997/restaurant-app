import styled from "styled-components";
import { ModalFooter } from "../../../../components/modal/Modal";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import Button from "../../../../components/button/Button";
import SubmitButton from "../../../../components/button/SubmitButton";

const Quantity = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const QuantityButton = styled(Button).attrs({
  $variant: "outline",
})`
  padding: 0;
  border-radius: 10px;
  width: 3.6rem;
  height: 3.6rem;

  &:active {
    transform: scale(0.95);
  }
`;

const QuantityValue = styled.div`
  width: 2.8rem;
  text-align: center;
  font-size: 1.6rem;
  font-weight: 600;
`;

function OrderFooter({ isEdit, servings, setServings, disabled }) {
  return (
    <ModalFooter>
      <Quantity>
        <QuantityButton
          onClick={() => setServings((prev) => (prev -= 1))}
          disabled={servings <= 1}
        >
          <Minus />
        </QuantityButton>
        <QuantityValue>{servings}</QuantityValue>
        <QuantityButton onClick={() => setServings((prev) => (prev += 1))}>
          <Plus />
        </QuantityButton>
      </Quantity>

      <SubmitButton fullWidth disabled={disabled}>
        <ShoppingBag />
        {isEdit ? "更新購物車" : "加入購物車"}
      </SubmitButton>
    </ModalFooter>
  );
}

export default OrderFooter;
