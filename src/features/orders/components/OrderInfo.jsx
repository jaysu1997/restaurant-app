import styled, { css } from "styled-components";
import { formatPickupStr } from "../../../context/settings/settingsHelpers";
import { formatCreatedTime } from "../../../utils/orderHelpers";
import DiningMethodSegmented from "../../../components/DiningMethodSegmented";
import DiningInfoField from "./DiningInfoField";
import PaymentStatusField from "./PaymentStatusField";
import OrderStatusField from "./OrderStatusField";

const StyledOrderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  label {
    color: #64748b;
    font-size: 1.3rem;
    font-weight: 500;
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

const StatusGrid = styled(InfoSection)`
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

const statusStyles = {
  準備中: css`
    color: #475569;
  `,
  已完成: css`
    color: #0f703c;
  `,
  未付款: css`
    color: #c03b00;
  `,
  已付款: css`
    color: #0052b3;
  `,
};

const Value = styled.div`
  height: 4.2rem;
  font-size: 1.6rem;
  font-weight: 600;
  overflow-wrap: anywhere;
  ${({ $status }) => statusStyles[$status]}
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
          <label>建立時間</label>
          <Value>{formatCreatedTime(createdAt)}</Value>
        </InfoItem>

        <InfoItem>
          <label>訂單編號</label>
          <Value>{orderUUID}</Value>
        </InfoItem>
      </MetadataGrid>

      <StatusGrid>
        {isEdit ? (
          <DiningMethodSegmented disabled={!canModifyItems} />
        ) : (
          <InfoItem>
            <label>用餐方式</label>
            <Value>{diningMethod}</Value>
          </InfoItem>
        )}

        {isEdit ? (
          <DiningInfoField disabled={!canModifyItems} />
        ) : (
          <InfoItem>
            <label>{isTakeout ? "取餐時間" : "內用桌號"}</label>
            <Value>
              {isTakeout ? formatPickupStr(pickupTime) : tableNumber}
            </Value>
          </InfoItem>
        )}

        {isEdit ? (
          <PaymentStatusField disabled={false} />
        ) : (
          <InfoItem>
            <label>付款狀態</label>
            <Value $status={paid}>{paid}</Value>
          </InfoItem>
        )}

        {isEdit ? (
          <OrderStatusField />
        ) : (
          <InfoItem>
            <label>訂單狀態</label>
            <Value $status={status}>{status}</Value>
          </InfoItem>
        )}
      </StatusGrid>
    </StyledOrderInfo>
  );
}

export default OrderInfo;
