// ok
import styled, { css } from "styled-components";
import Tag from "../../../components/Tag";
import { formatPickupNumber, formatTime } from "../../../utils/orderHelpers";
import { Link } from "react-router";
import SectionContainer from "../../../components/SectionContainer";
import EmptyState from "./EmptyState";
import { hoverStyles } from "../../../style/helpers";
import {
  ClipboardList,
  ArrowRight,
  ClipboardClock,
  ClipboardCheck,
} from "lucide-react";
import StatsFooter from "./StatsFooter";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 2.4rem;
  height: 36rem;
  overflow-y: auto;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
`;

const Item = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 7.2rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid #f3f4f6;

  &:nth-child(n + 5):last-child {
    border-bottom: none;
  }
`;

const OrderItemHeader = styled.div`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) repeat(3, auto);
  align-items: center;
  gap: 0.8rem;
`;

const PickupNumber = styled.span`
  color: #111827;
  font-weight: 700;
`;

const OrderCreatedAt = styled.time`
  color: #9ca3af;
  font-weight: 500;
  font-size: 1.2rem;
`;

const OrderViewLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  gap: 0.2rem;
  color: #2563eb;
  font-size: 1.2rem;
  font-weight: 500;
  transition: color 0.15s ease;

  ${hoverStyles(css`
    color: #1d4ed8;
  `)}

  svg {
    width: 1.4rem;
    height: 1.4rem;
  }
`;

const OrderItemDetails = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 1.2rem;
`;

const OrderAmount = styled.span`
  color: #111827;
  font-weight: 700;
`;

const OrderItemsSummary = styled.span`
  color: #6b7280;
  font-size: 1.4rem;
  font-weight: 400;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

// 這個或許也可以搬出去到helpers中
function formatOrderItems(items) {
  return items.map((item) => `${item.name} x${item.servings}`).join("、");
}

// 今日訂單列表
function TodayOrderList({ todayOrders, orderStatus }) {
  const hasOrders = todayOrders.length > 0;

  return (
    <SectionContainer icon={<ClipboardList />} header="今日訂單列表">
      <Content>
        {!hasOrders && <EmptyState />}

        {hasOrders && (
          <List>
            {todayOrders.map((item) => (
              <Item key={item.orderUUID}>
                <OrderItemHeader>
                  <PickupNumber>
                    {formatPickupNumber(item.pickupNumber)}
                  </PickupNumber>

                  <OrderCreatedAt dateTime={formatTime(item.createdAt)}>
                    {formatTime(item.createdAt)}
                  </OrderCreatedAt>

                  <Tag $status={item.status}>{item.status}</Tag>
                  <Tag $status={item.paid}>{item.paid}</Tag>

                  <OrderViewLink to={`/orders/${item.id}`}>
                    <ArrowRight />
                  </OrderViewLink>
                </OrderItemHeader>

                <OrderItemDetails>
                  <OrderItemsSummary>
                    {formatOrderItems(item.items)}
                  </OrderItemsSummary>

                  <OrderAmount>${item.totalPrice}</OrderAmount>
                </OrderItemDetails>
              </Item>
            ))}
          </List>
        )}
      </Content>

      <StatsFooter
        stats={[
          {
            icon: <ClipboardClock />,
            label: "準備中訂單",
            value: `${orderStatus.preparing} 筆`,
          },
          {
            icon: <ClipboardCheck />,
            label: "已完成訂單",
            value: `${orderStatus.completed} 筆`,
          },
        ]}
      />
    </SectionContainer>
  );
}

export default TodayOrderList;
