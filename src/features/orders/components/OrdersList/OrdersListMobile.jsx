// ok
import styled from "styled-components";
import { useState } from "react";
import OrderDropdownMenu from "../OrderDropdownMenu";
import {
  formatCreatedTime,
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

const DiningBadge = styled.span`
  width: fit-content;
  height: fit-content;
  padding: 0.2rem 0.8rem;
  border-radius: 999px;
  font-size: 1.2rem;
  font-weight: 600;
  color: ${(props) => (props.$diningMethod === "內用" ? "#2563eb" : "#16a34a")};
  background-color: ${(props) =>
    props.$diningMethod === "內用" ? "#e8f1ff" : "#e8f8ed"};
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

            <DiningBadge $diningMethod={orderData.diningMethod}>
              {orderData.diningMethod}
            </DiningBadge>

            <OrderDropdownMenu
              orderData={orderData}
              openMenuId={openMenuId}
              setOpenMenuId={setOpenMenuId}
            />
          </CardHeader>

          <CreatedTime>{formatCreatedTime(orderData.createdAt)}</CreatedTime>

          <Footer>
            <StatusRow>
              <Tag $tagStatus={orderData.status}>{orderData.status}</Tag>
              <Tag $tagStatus={orderData.paid}>{orderData.paid}</Tag>
            </StatusRow>

            <Price>{`$ ${orderData.totalPrice}`}</Price>
          </Footer>
        </OrderCard>
      ))}
    </StyledOrderList>
  );
}

export default OrdersListMobile;
