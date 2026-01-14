import styled from "styled-components";
import Tag from "../../ui/Tag";
import { formatPickupNumber } from "../../utils/orderHelpers";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const OrderList = styled.ul`
  height: 30rem;

  padding-right: 1.5rem;
  overflow-y: auto;
  font-size: 1.6rem;
  container-type: inline-size;
`;

const Order = styled.li`
  border-top: 1px solid #f3f4f6;
  font-size: 1.6rem;

  &:last-child {
    border-bottom: 1px solid #f3f4f6;
  }

  display: grid;
  grid-template-columns: 5.6rem 6.6rem minmax(0, 1fr) 5.6rem 4.6rem;

  align-items: center;
  padding: 1.5rem 0;
  gap: 1.6rem;

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

  @container (max-width: 32rem) {
    grid-template-columns:
      minmax(5.6rem, auto) minmax(6.6rem, auto) minmax(5.6rem, auto)
      4.6rem;
    gap: 0.4rem;

    & span:nth-child(3) {
      display: none;
    }
  }
`;

const EmptyState = styled.p`
  height: 30rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 500;
`;

function formatDishes(dishes) {
  return dishes.map((dish) => `${dish.name} x ${dish.servings}`).join(" , ");
}

// 今日訂單列表
function TodayOrderList({ analyzedData }) {
  const navigate = useNavigate();

  const { todayOrders } = analyzedData;

  if (todayOrders.length === 0)
    return <EmptyState>今日尚無任何訂單</EmptyState>;

  return (
    <OrderList>
      {todayOrders.map((order) => (
        <Order key={order.id}>
          <span>{formatPickupNumber(order.pickupNumber)}</span>
          <Tag $tagStatus={order.status}>{order.status}</Tag>
          <span>{formatDishes(order.dishes)}</span>
          <span className="emphasize">{`$ ${order.totalPrice}`}</span>
          <button
            onClick={() =>
              navigate(`/order/${order.id}`, { state: { from: "dashboard" } })
            }
          >
            <span>檢視</span>
            <ArrowRight size={13} strokeWidth={3.2} />
          </button>
        </Order>
      ))}
    </OrderList>
  );
}

export default TodayOrderList;
