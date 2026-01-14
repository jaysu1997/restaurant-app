import styled from "styled-components";
import Tag from "../../ui/Tag";
import {
  formatCreatedTime,
  formatPickupNumber,
} from "../../utils/orderHelpers";

const StyledOrderRow = styled.div`
  display: grid;
  grid-template-columns:
    6.4rem minmax(0, 0.5fr) minmax(0, 1fr) repeat(3, minmax(0, 0.5fr))
    3.2rem;
  align-items: center;
  justify-items: start;
  gap: 1rem;
  padding: 1.6rem;
  border-top: 1px solid #f3f4f6;
  background-color: #fff;

  &:hover {
    background-color: #f0f9ff;
  }

  &:last-child {
    border-radius: 0 0 8px 8px;
  }

  @media (max-width: 48em) {
    grid-template-columns: 1fr auto;
    grid-template-rows: repeat(6, 2.8rem);
    border: none;
    border-radius: 6px;

    &:last-child {
      border-radius: 6px;
    }

    &:hover {
      background-color: #fff;
    }

    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 2.8rem;
      font-weight: 600;
      grid-column: 1 / -1;
    }

    div::before {
      content: attr(data-label);
      font-weight: 500;
      font-size: 1.4rem;
      color: #666;
    }

    div[data-label="操作"] {
      grid-row: 1;
      grid-column: 2;
      justify-content: flex-end;

      &::before {
        display: none;
      }
    }

    div[data-label="建立時間"] {
      grid-row: 1;
      grid-column: 1;

      &::before {
        display: none;
      }
    }
  }
`;

const DiningMethod = styled.span`
  font-size: 1.4rem;
  color: ${(props) => (props.$diningMethod === "內用" ? "#1e88e5" : "#43a047")};
  font-weight: 700;
`;

function OrderRow({ orderData, children }) {
  return (
    <StyledOrderRow>
      <div data-label="用餐方式">
        <DiningMethod $diningMethod={orderData.diningMethod}>
          {`[${orderData.diningMethod}]`}
        </DiningMethod>
      </div>

      <div data-label="取餐號碼">
        <span>{formatPickupNumber(orderData.pickupNumber)}</span>
      </div>

      <div data-label="建立時間">
        {formatCreatedTime(orderData.createdTime)}
      </div>

      <div data-label="消費金額">{`$ ${orderData.totalPrice}`}</div>

      <div data-label="訂單狀態">
        <Tag $tagStatus={orderData.status}>{orderData.status}</Tag>
      </div>

      <div data-label="付款狀態">
        <Tag $tagStatus={orderData.paid}>{orderData.paid}</Tag>
      </div>

      <div data-label="操作">{children}</div>
    </StyledOrderRow>
  );
}

export default OrderRow;
