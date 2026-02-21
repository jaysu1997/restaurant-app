// ok
// 控制和設定餐點份數的元件
import styled from "styled-components";
import { Minus, Plus } from "lucide-react";

const Container = styled.div`
  flex-shrink: 0;
  display: grid;
  width: 9rem;
  grid-template-columns: 2.6rem 3.6rem 2.6rem;
  grid-template-rows: 2.6rem;
  font-size: 1.4rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  overflow: hidden;
`;

const Value = styled.div`
  border-left: 1px solid #d1d5db;
  border-right: 1px solid #d1d5db;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: default;
`;

const AdjustButton = styled.button`
  height: 100%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 1.4rem;
    height: 1.4rem;
  }

  &:hover {
    background-color: #f9fafb;
  }

  &:disabled {
    background-color: #f4f4f5;
    cursor: not-allowed;
  }
`;

function ServingsControl({ servings, onChange, canIncrease = true }) {
  return (
    <Container>
      <AdjustButton
        type="button"
        disabled={Number(servings) <= 1}
        onClick={() => onChange(servings - 1)}
      >
        <Minus />
      </AdjustButton>

      <Value>{servings}</Value>

      <AdjustButton
        type="button"
        disabled={!canIncrease}
        title={!canIncrease ? "庫存不足，無法再增加份數" : undefined}
        onClick={() => onChange(servings + 1)}
      >
        <Plus />
      </AdjustButton>
    </Container>
  );
}

export default ServingsControl;
