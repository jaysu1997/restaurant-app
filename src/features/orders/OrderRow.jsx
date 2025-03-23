import styled from "styled-components";
import Tag from "../../ui/Tag";
import OrderDropdownMenu from "./OrderDropdownMenu";

const StyledOrderRow = styled.div`
  display: grid;
  grid-template-columns:
    5.6rem minmax(0, 1fr) minmax(0, 1.5fr) repeat(3, minmax(0, 1fr))
    2.8rem;
  align-items: center;
  justify-items: start;
  gap: 0.8rem;
  padding: 1.6rem;
  border-top: 1px solid #f3f4f6;

  &:hover {
    background-color: #f0f9ff;
  }

  @media (max-width: 768px) {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr auto;
    grid-template-areas:
      "createdTime action"
      "orderType orderType"
      "orderNumber orderNumber"
      "totalPrice totalPrice"
      "status status"
      "paid paid";

    border: none;
    background-color: #f5f5f5;
    border-radius: 6px;

    &:hover {
      background-color: #f5f5f5;
    }

    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 2.8rem;
      font-weight: 600;
    }

    div::before {
      font-weight: 500;
      font-size: 1.4rem;
      color: #666;
    }

    div[data-order-type] {
      grid-area: orderType;

      &::before {
        content: "用餐方式";
      }
    }

    div[data-order-number] {
      grid-area: orderNumber;

      &::before {
        content: "取餐號碼";
      }
    }

    div[data-action] {
      grid-area: action;
      justify-content: flex-end;
    }

    div[data-created-time] {
      grid-area: createdTime;
    }

    div[data-status] {
      grid-area: status;

      &::before {
        content: "訂單狀態";
      }
    }

    div[data-total-price] {
      grid-area: totalPrice;

      &::before {
        content: "消費金額";
      }
    }

    div[data-paid] {
      grid-area: paid;

      &::before {
        content: "付款狀態";
      }
    }
  }
`;

const OrderType = styled.span`
  font-size: 1.4rem;
  color: ${(props) => (props.$orderType === "內用" ? "#1e88e5" : "#43a047")};
  font-weight: 700;
`;

function formatOrderNumber(orderNumber) {
  return `# ${String(orderNumber).padStart(3, "0")}`;
}

// 將訂單建立時間格式化
function formatCreatedTime(createdTime) {
  const time = new Date(createdTime);

  const formattedDate = time.toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const formattedTime = time.toLocaleTimeString("zh-TW", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${formattedDate} ${formattedTime}`;
}

// 計算訂單總消費金額
function calcOrderTotalPrice(orderData) {
  return orderData.reduce((total, item) => {
    total += item.itemTotalPrice * item.servings;

    return total;
  }, 0);
}

function OrderRow({ orderData, isOpen, setIsOpen, tableRef, activeMenuRef }) {
  return (
    <StyledOrderRow>
      <div data-order-type>
        <OrderType $orderType={orderData.orderType}>
          {`[${orderData.orderType}]`}
        </OrderType>
      </div>

      <div data-order-number>
        <span>{formatOrderNumber(orderData.orderNumber)}</span>
      </div>

      <div data-created-time>{formatCreatedTime(orderData.createdTime)}</div>

      <div data-status>
        <Tag $tagStatus={orderData.status}>{orderData.status}</Tag>
      </div>

      <div data-total-price>{`$ ${calcOrderTotalPrice(orderData.order)}`}</div>

      <div data-paid>
        <Tag $tagStatus={orderData.paid}>{orderData.paid}</Tag>
      </div>

      <div data-action>
        <OrderDropdownMenu
          orderId={orderData.id}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          tableRef={tableRef}
          activeMenuRef={activeMenuRef}
        />
      </div>
    </StyledOrderRow>
  );
}

export default OrderRow;
