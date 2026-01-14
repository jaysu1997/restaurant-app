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
    grid-template-rows: minmax(6.2rem, auto);
    column-gap: 1.6rem;
    row-gap: 0.4rem;

    /* 寬度不足時可能需要縮小字體，因為grid的對其有點麻煩 */
    /* font-size: 1.4rem; */
  }
`;

export default OrderCard;
