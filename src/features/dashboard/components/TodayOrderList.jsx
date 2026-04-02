// ok
import styled from "styled-components";
import Tag from "../../../ui/Tag";
import { formatPickupNumber } from "../../../utils/orderHelpers";
import { useNavigate } from "react-router";
import { ArrowRight } from "lucide-react";
import SectionContainer from "../../../ui/SectionContainer";
import EmptyState from "./EmptyState";
import Price from "../../../components/Price";

const OrderList = styled.ul`
  height: 30rem;
  overflow-y: auto;
  scrollbar-gutter: stable;
`;

const Order = styled.li`
  display: grid;
  grid-template-columns: 5rem 1fr 5rem 4.6rem;
  align-items: center;
  padding: 1.5rem 0;
  column-gap: 1.6rem;
  row-gap: 1rem;
  border-top: 1px solid #f3f4f6;
  font-size: 1.6rem;
  font-weight: 500;

  &:hover {
    background-color: #f0f9ff;
  }

  &:last-child {
    border-bottom: 1px solid #f3f4f6;
  }

  & > span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & > span:nth-child(2) {
    font-weight: 400;
  }
`;

const OrderDetailsLink = styled.button`
  color: #6366f1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  font-size: 1.4rem;

  svg {
    width: 1.4rem;
    height: 1.4rem;
  }
`;

const OrderStatus = styled.div`
  grid-row: 2;
  grid-column: 2 / -1;
  display: flex;
  gap: 1rem;
`;

function formatDishes(items) {
  return items.map((item) => `${item.name} x${item.servings}`).join(" , ");
}

// 今日訂單列表
function TodayOrderList({ data }) {
  const navigate = useNavigate();

  if (data.length === 0)
    return (
      <SectionContainer title="今日訂單列表">
        <EmptyState />
      </SectionContainer>
    );

  return (
    <SectionContainer title="今日訂單列表">
      <OrderList>
        {data.map((order) => (
          <Order key={order.id}>
            <span>{formatPickupNumber(order.pickupNumber)}</span>
            <span>{formatDishes(order.items)}</span>
            <Price>{`$ ${order.totalPrice}`}</Price>

            <OrderDetailsLink
              onClick={() =>
                navigate(`/order/${order.id}`, { state: { from: "dashboard" } })
              }
            >
              <span>檢視</span>
              <ArrowRight strokeWidth={2.4} />
            </OrderDetailsLink>

            <OrderStatus>
              <Tag $tagStatus={order.status}>{order.status}</Tag>
              <Tag $tagStatus={order.paid}>{order.paid}</Tag>
            </OrderStatus>
          </Order>
        ))}
      </OrderList>
    </SectionContainer>
  );
}

export default TodayOrderList;
