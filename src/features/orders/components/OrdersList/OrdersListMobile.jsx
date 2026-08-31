// ok
import styled from "styled-components";
import { useState } from "react";
import OrderDropdownMenu from "../OrderDropdownMenu";
import {
  formatDateTime,
  formatPickupNumber,
} from "../../../../utils/orderHelpers";
import Tag from "../../../../components/Tag";

const StyledOrderList = styled.div`
  display: none;

  @media (max-width: 45em) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
    gap: 1.6rem;
  }
`;

const OrderCard = styled.div`
  background-color: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const PickupNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
`;

const CreatedTime = styled.div`
  font-size: 1.4rem;
  color: #6b7280;
  margin-bottom: 0.6rem;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const StatusRow = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
`;

const Price = styled.span`
  font-weight: 600;
  font-size: 1.8rem;
  white-space: nowrap;
`;

function OrdersListMobile({ ordersData }) {
  const [openMenuId, setOpenMenuId] = useState(null);

  return (
    <StyledOrderList>
      {ordersData.map((orderData) => (
        <OrderCard key={orderData.id}>
          <CardHeader>
            <PickupNumber>
              {formatPickupNumber(orderData.pickupNumber)}
            </PickupNumber>

            <Tag $status={orderData.diningMethod}>{orderData.diningMethod}</Tag>

            <OrderDropdownMenu
              orderData={orderData}
              openMenuId={openMenuId}
              setOpenMenuId={setOpenMenuId}
            />
          </CardHeader>

          <CreatedTime>{formatDateTime(orderData.createdAt)}</CreatedTime>

          <Footer>
            <StatusRow>
              <Tag $status={orderData.status}>{orderData.status}</Tag>
              <Tag $status={orderData.paid}>{orderData.paid}</Tag>
            </StatusRow>

            <Price>${orderData.totalPrice}</Price>
          </Footer>
        </OrderCard>
      ))}
    </StyledOrderList>
  );
}

export default OrdersListMobile;
