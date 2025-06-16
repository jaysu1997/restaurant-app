import styled from "styled-components";
import StyledOverlayScrollbars from "../../ui/StyledOverlayScrollbars";
import { FaArrowRight } from "react-icons/fa";
import Tag from "../../ui/Tag";

const OrderList = styled.ul`
  max-height: 30rem;
  padding-right: 1.5rem;
`;

const Order = styled.li`
  border-top: 1px solid #f3f4f6;

  &:last-child {
    border-bottom: 1px solid #f3f4f6;
  }

  display: grid;
  grid-template-columns:
    6.6rem
    5.2rem
    minmax(0, 1fr)
    minmax(0, 6rem)
    auto;

  align-items: center;

  padding: 1.5rem 0;
  gap: 1.5rem;

  & > span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 600;
  }

  span:nth-child(3) {
    font-weight: 400;
  }

  button {
    color: #6366f1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    font-size: 1.4rem;
    font-weight: 600;
  }

  @media (max-width: 400px) {
    grid-template-columns: repeat(2, 1fr) minmax(0, 1fr) 1fr;
    gap: 1rem;

    & span:nth-child(3) {
      display: none;
    }
  }
`;

function TodayOrderList() {
  return (
    <StyledOverlayScrollbars autoHide="leave" style={{ maxHeight: "30rem" }}>
      <OrderList>
        {/* <EmptyData>無資料</EmptyData> */}
        <Order>
          <Tag $tagStatus="已完成">已完成</Tag>
          <span># 9999</span>
          <span>起司蛋餅 x 1 、 紅茶 x 2</span>
          <span>$ 50000</span>
          <button>
            <span>詳情</span>
            <FaArrowRight size={13} />
          </button>
        </Order>
      </OrderList>
    </StyledOverlayScrollbars>
  );
}

export default TodayOrderList;
