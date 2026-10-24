import styled from "styled-components";
import { formatDateTime } from "../../../../utils/dateTime.js";
import { formatPickupNumber } from "../../../../utils/orderFormatting.js";
import Tag from "../../../../components/Tag";
import Price from "../../../../components/Price";
import { Link } from "react-router";
import OrderActions from "../OrderActions";

const StyledOrderList = styled.div`
  display: none;

  @media (max-width: 50em) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(25.2rem, 1fr));
    gap: var(--space-7);
  }
`;

const OrderCard = styled.div`
  position: relative;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
`;

const ViewOrderLink = styled(Link)`
  position: absolute;
  z-index: 2;
  inset: 0;
  background-color: transparent;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-3);
`;

const PickupNumber = styled.div`
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
`;

const CardActions = styled.div`
  position: absolute;
  right: 1.6rem;
  z-index: 3;
`;

const OrderMeta = styled.div`
  gap: var(--space-2);
  display: flex;
  flex-wrap: wrap;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-2-5);
`;

const CreatedTime = styled.div`
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
`;

const TotalAmount = styled(Price)`
  font-size: 1.8rem;
`;

function OrdersListMobile({ ordersData }) {
  return (
    <StyledOrderList>
      {ordersData.map((orderData) => (
        <OrderCard key={orderData.id}>
          <ViewOrderLink to={`/orders/${orderData.id}`} />

          <CardHeader>
            <PickupNumber>
              {formatPickupNumber(orderData.pickupNumber)}
            </PickupNumber>

            <CardActions>
              <OrderActions orderData={orderData} />
            </CardActions>
          </CardHeader>

          <OrderMeta>
            <Tag $status={orderData.diningMethod}>{orderData.diningMethod}</Tag>
            <Tag $status={orderData.status}>{orderData.status}</Tag>
            <Tag $status={orderData.paid}>{orderData.paid}</Tag>
          </OrderMeta>

          <CardFooter>
            <CreatedTime>{formatDateTime(orderData.createdAt)}</CreatedTime>
            <TotalAmount value={orderData.totalAmount} />
          </CardFooter>
        </OrderCard>
      ))}
    </StyledOrderList>
  );
}

export default OrdersListMobile;
