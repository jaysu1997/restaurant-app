import styled from "styled-components";
import ContentContainer from "../../../ui/ContentContainer";

// 這部分有在別的元件中有重名的存在，而且設定上也有點錯誤，可能需要再修正
const OrderSection = styled(ContentContainer)`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  & > div {
    width: 100%;
    display: grid;
    grid-template-columns: 8rem 1fr;
    grid-template-rows: minmax(6.2rem, auto);
    gap: 1.6rem;
  }
`;

export default OrderSection;
