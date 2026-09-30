// ok
import styled from "styled-components";
import {
  formatDateTime,
  formatPickupNumber,
} from "../../../../utils/orderHelpers";
import Tag from "../../../../components/Tag";
import Price from "../../../../components/Price";
import { Link } from "react-router";
import OrderActions from "../OrderActions";

const StyledOrderList = styled.div`
  display: none;

  @media (max-width: 50em) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(25.2rem, 1fr));
    gap: 2.8rem;
  }
`;

const OrderCard = styled.div`
  position: relative;
  background-color: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
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
  gap: 1.2rem;
`;

const PickupNumber = styled.div`
  font-size: 2.4rem;
  font-weight: 700;
`;

const CardActions = styled.div`
  position: absolute;
  right: 1.6rem;
  z-index: 3;
`;

const OrderMeta = styled.div`
  gap: 0.8rem;
  display: flex;
  flex-wrap: wrap;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
`;

const CreatedTime = styled.div`
  font-size: 1.4rem;
  color: #6b7280;
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
