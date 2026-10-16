// ok
import styled, { css } from "styled-components";
import Tag from "../../../components/Tag";
import { formatTime } from "../../../utils/dateTime.js";
import { formatPickupNumber } from "../../../utils/orderFormatting.js";
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
import Price from "../../../components/Price";
import { formatOrderItems } from "../utils/orderDisplay.js";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 var(--space-6);
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
  padding: var(--space-2) 0;
  border-bottom: 1px solid var(--color-surface-subtle);

  &:nth-child(n + 5):last-child {
    border-bottom: none;
  }
`;

const OrderItemHeader = styled.div`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) repeat(3, auto);
  align-items: center;
  gap: var(--space-2);
`;

const PickupNumber = styled.span`
  color: var(--color-text-strong);
  font-weight: var(--font-weight-bold);
`;

const OrderCreatedAt = styled.time`
  color: var(--color-text-placeholder);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-xs);
`;

const OrderViewLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  gap: var(--space-0-5);
  color: var(--color-brand);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  transition: color 0.15s ease;

  ${hoverStyles(css`
    color: var(--color-brand-hover);
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
  gap: var(--space-3);
`;

const OrderItemsSummary = styled.span`
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-regular);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

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

                  <Price value={item.totalAmount} />
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
