import styled from "styled-components";
import { formatPickupStr } from "../../../context/settings/settingsHelpers";
import { formatDateTime } from "../../../utils/orderHelpers";
import DiningMethodSegmented from "../../../components/DiningMethodSegmented";
import DiningInfoField from "./DiningInfoField";
import PaymentStatusField from "./PaymentStatusField";
import OrderStatusField from "./OrderStatusField";
import Label from "../../../components/Label";

const StyledOrderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 2.4rem;
  min-height: 20.8rem;

  @media (max-width: 35em) {
    gap: 0px;
  }
`;

const InfoSection = styled.div`
  display: grid;
  column-gap: 2.8rem;
  row-gap: 0.6rem;
`;

const MetadataGrid = styled(InfoSection)`
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: 35em) {
    grid-template-columns: 1fr;
  }
`;

const OrderDetailsGrid = styled(InfoSection)`
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: 45em) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 35em) {
    grid-template-columns: 1fr;
  }
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const Value = styled.div`
  height: 4rem;
  font-size: 1.6rem;
  font-weight: 500;
  overflow-wrap: anywhere;

  @media (max-width: 35em) {
    height: 5.6rem;
  }
`;

function OrderInfo({ orderData, isEdit, canModifyItems }) {
  const {
    createdAt,
    orderUUID,
    diningMethod,
    tableNumber,
    pickupTime,
    status,
    paid,
  } = orderData;

  const isTakeout = diningMethod === "外帶";

  return (
    <StyledOrderInfo>
      <MetadataGrid>
        <InfoItem>
          <Label>建立時間</Label>
          <Value>{formatDateTime(createdAt)}</Value>
        </InfoItem>

        <InfoItem>
          <Label>訂單編號</Label>
          <Value>{orderUUID}</Value>
        </InfoItem>
      </MetadataGrid>

      <OrderDetailsGrid>
        {isEdit ? (
          <DiningMethodSegmented disabled={!canModifyItems} />
        ) : (
          <InfoItem>
            <Label>用餐方式</Label>
            <Value>{diningMethod}</Value>
          </InfoItem>
        )}

        {isEdit ? (
          <DiningInfoField disabled={!canModifyItems} />
        ) : (
          <InfoItem>
            <Label>{isTakeout ? "取餐時間" : "內用桌號"}</Label>
            <Value>
              {isTakeout ? formatPickupStr(pickupTime) : tableNumber}
            </Value>
          </InfoItem>
        )}

        {isEdit ? (
          <PaymentStatusField />
        ) : (
          <InfoItem>
            <Label>付款狀態</Label>
            <Value>{paid}</Value>
          </InfoItem>
        )}

        {isEdit ? (
          <OrderStatusField />
        ) : (
          <InfoItem>
            <Label>訂單狀態</Label>
            <Value>{status}</Value>
          </InfoItem>
        )}
      </OrderDetailsGrid>
    </StyledOrderInfo>
  );
}

export default OrderInfo;
