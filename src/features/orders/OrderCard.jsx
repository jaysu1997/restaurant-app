import styled from "styled-components";

const OrderCard = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & > div {
    display: grid;
    grid-template-columns: 8rem 1fr;
    grid-template-rows: 3.8rem minmax(2rem, auto);
    align-items: center;
    column-gap: 1.6rem;
    row-gap: 0.2rem;

    /* 寬度不足時可能需要縮小字體，因為grid的對其有點麻煩 */
    /* font-size: 1.4rem; */

    /* 這個應該用不到了 */
    /* span {
      overflow: hidden;
      overflow-wrap: break-word;
    } */
  }
`;

export default OrderCard;
