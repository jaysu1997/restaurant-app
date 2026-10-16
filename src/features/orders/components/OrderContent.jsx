// 訂單詳情(檢視)
import styled from "styled-components";
import SectionContainer from "../../../components/SectionContainer";
import { formatPickupNumber } from "../../../utils/orderFormatting.js";
import OrderActions from "./OrderActions";
import OrderInfo from "./OrderInfo";
import OrderDishes from "./OrderDishes";
import Label from "../../../components/Label";
import Note from "../../../components/Note";
import StoreClosedNotice from "./StoreClosedNotice";

const StyledOrderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-7);
`;

const OrderOverview = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  padding: var(--space-6);
`;

const StickyNoticeWrapper = styled.div`
  position: sticky;
  top: 6.8rem;
  z-index: 1;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-5);
  margin-bottom: var(--space-7);
`;

const PickupNumber = styled.div`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  padding: var(--space-1-5) var(--space-3-5);
  height: 4rem;
  border-radius: var(--radius-full);
  background-color: #eef2ff;
  color: #4338ca;
  font-size: 1.8rem;
  font-weight: var(--font-weight-bold);
  border: 1px solid #c7d2fe;
`;

const NoteGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-1-5);
  padding: var(--space-6);
`;

const NoteValue = styled.span`
  min-width: 0;
  font-weight: var(--font-weight-medium);
  overflow-wrap: anywhere;
`;

function OrderContent({
  orderData,
  orderItems,
  isEdit = false,
  canModifyItems = false,
}) {
  return (
    <StyledOrderContent>
      <SectionContainer>
        <OrderOverview>
          {isEdit && !canModifyItems && (
            <StickyNoticeWrapper>
              <StoreClosedNotice>
                目前為非營業時段，無法修改訂購餐點與用餐資訊，
                但仍可更新付款與訂單狀態。
              </StoreClosedNotice>
            </StickyNoticeWrapper>
          )}

          <Header>
            <PickupNumber>
              {formatPickupNumber(orderData.pickupNumber)}
            </PickupNumber>

            {!isEdit && <OrderActions orderData={orderData} />}
          </Header>

          <OrderInfo
            orderData={orderData}
            isEdit={isEdit}
            canModifyItems={canModifyItems}
          />

          <OrderDishes
            orderItems={orderItems}
            isEdit={isEdit}
            canModifyItems={canModifyItems}
          />
        </OrderOverview>
      </SectionContainer>

      <SectionContainer>
        <NoteGroup>
          <Label htmlFor="order-note">訂單備註</Label>
          {!isEdit ? (
            <NoteValue>{orderData.note || "無"}</NoteValue>
          ) : (
            <Note id="order-note" />
          )}
        </NoteGroup>
      </SectionContainer>
    </StyledOrderContent>
  );
}

export default OrderContent;
