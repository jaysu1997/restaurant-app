import styled from "styled-components";
import Tag from "../../ui/Tag";
import {
  formatCreatedTime,
  formatPickupNumber,
} from "../../utils/orderHelpers";

const StyledOrderRow = styled.div`
  display: grid;
  grid-template-columns:
    5.6rem minmax(0, 1fr) minmax(0, 1.5fr) repeat(3, minmax(0, 1fr))
    2.8rem;
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

  @media (max-width: 768px) {
    grid-template-columns: 1fr auto;
    grid-template-areas:
      "createdTime action"
      "diningMethod diningMethod"
      "pickupNumber pickupNumber"
      "totalPrice totalPrice"
      "status status"
      "paid paid";
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
    }

    div::before {
      font-weight: 500;
      font-size: 1.4rem;
      color: #666;
    }

    div[data-order-type] {
      grid-area: diningMethod;

      &::before {
        content: "用餐方式";
      }
    }

    div[data-order-number] {
      grid-area: pickupNumber;

      &::before {
        content: "取餐號碼";
      }
    }

    div[data-action] {
      grid-area: action;
      justify-content: flex-end;
    }

    div[data-created-time] {
      grid-area: createdTime;
    }

    div[data-status] {
      grid-area: status;

      &::before {
        content: "訂單狀態";
      }
    }

    div[data-total-price] {
      grid-area: totalPrice;

      &::before {
        content: "消費金額";
      }
    }

    div[data-paid] {
      grid-area: paid;

      &::before {
        content: "付款狀態";
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
      <div data-order-type>
        <DiningMethod $diningMethod={orderData.diningMethod}>
          {`[${orderData.diningMethod}]`}
        </DiningMethod>
      </div>

      <div data-order-number>
        <span>{formatPickupNumber(orderData.pickupNumber)}</span>
      </div>

      <div data-created-time>{formatCreatedTime(orderData.createdTime)}</div>

      <div data-status>
        <Tag $tagStatus={orderData.status}>{orderData.status}</Tag>
      </div>

      <div data-total-price>{`$ ${orderData.totalPrice}`}</div>

      <div data-paid>
        <Tag $tagStatus={orderData.paid}>{orderData.paid}</Tag>
      </div>

      <div data-action>{children}</div>
    </StyledOrderRow>
  );
}

export default OrderRow;
