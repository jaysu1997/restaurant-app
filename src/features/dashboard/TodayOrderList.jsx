import styled from "styled-components";
import StyledOverlayScrollbars from "../../ui/StyledOverlayScrollbars";
import { FaArrowRight } from "react-icons/fa";
import Tag from "../../ui/Tag";
import { formatPickupNumber } from "../../utils/orderHelpers";
import { useNavigate } from "react-router-dom";

const OrderList = styled.ul`
  max-height: 30rem;
  padding-right: 1.5rem;
`;

const Order = styled.li`
  border-top: 1px solid #f3f4f6;

  &:last-child {
    border-bottom: 1px solid #f3f4f6;
  }

  display: grid;
  grid-template-columns:
    6.6rem
    5.2rem
    minmax(0, 1fr)
    minmax(0, 6rem)
    auto;

  align-items: center;

  padding: 1.5rem 0;
  gap: 1.5rem;

  & > span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 600;
  }

  span:nth-child(3) {
    font-weight: 400;
  }

  button {
    color: #6366f1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    font-size: 1.4rem;
    font-weight: 600;
  }

  @media (max-width: 400px) {
    grid-template-columns: repeat(2, 1fr) minmax(0, 1fr) 1fr;
    gap: 1rem;

    & span:nth-child(3) {
      display: none;
    }
  }
`;

const EmptyState = styled.p`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 500;
`;

function formatDishes(order) {
  return order.map((dish) => `${dish.name} x ${dish.servings}`).join(" , ");
}

// 今日訂單列表
function TodayOrderList({ analyzedData }) {
  const navigate = useNavigate();

  const { todayOrders } = analyzedData;

  if (todayOrders.length === 0)
    return <EmptyState>今日尚無任何訂單</EmptyState>;

  return (
    <StyledOverlayScrollbars autoHide="leave" style={{ maxHeight: "30rem" }}>
      <OrderList>
        {todayOrders.map((order) => (
          <Order key={order.id}>
            <Tag $tagStatus={order.status}>{order.status}</Tag>
            <span>{formatPickupNumber(order.pickupNumber)}</span>
            <span>{formatDishes(order.order)}</span>
            <span>{`$${order.totalPrice}`}</span>
            <button
              onClick={() =>
                navigate(`/order/${order.id}`, { state: { from: "dashboard" } })
              }
            >
              <span>詳情</span>
              <FaArrowRight size={13} />
            </button>
          </Order>
        ))}
      </OrderList>
    </StyledOverlayScrollbars>
  );
}

export default TodayOrderList;
