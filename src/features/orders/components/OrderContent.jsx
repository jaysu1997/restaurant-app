// 訂單詳情(檢視)
import styled from "styled-components";
import SectionContainer from "../../../components/SectionContainer";
import { formatPickupNumber } from "../../../utils/orderHelpers";
import OrderActions from "./OrderActions";
import OrderInfo from "./OrderInfo";
import OrderDishes from "./OrderDishes";
import Label from "../../../components/Label";
import Note from "../../../components/Note";
import StoreClosedNotice from "./StoreClosedNotice";

const OrderOverview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding: 2.4rem;
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
  gap: 2rem;
  margin-bottom: 2.8rem;
`;

const PickupNumber = styled.div`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  padding: 0.6rem 1.4rem;
  height: 4rem;
  border-radius: 999px;
  background-color: #eef2ff;
  color: #4338ca;
  font-size: 1.8rem;
  font-weight: 700;
  border: 1px solid #c7d2fe;
`;

const NoteGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 2.4rem;
`;

const NoteValue = styled.span`
  min-width: 0;
  font-weight: 500;
  overflow-wrap: anywhere;
`;

function OrderContent({
  orderData,
  orderItems,
  isEdit = false,
  canModifyItems = false,
}) {
  return (
    <>
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
    </>
  );
}

export default OrderContent;
