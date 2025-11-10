import styled from "styled-components";

// 這部分有在別的元件中有重名的存在，而且設定上也有點錯誤，可能需要再修正
const OrderCard = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & > div {
    display: grid;
    grid-template-columns: 8rem 1fr;
    grid-template-rows: minmax(3.8rem, auto) minmax(2rem, auto);
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
