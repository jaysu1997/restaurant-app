import styled from "styled-components";
import ContentContainer from "../../../ui/ContentContainer";

const OrderSection = styled(ContentContainer)`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  font-weight: 500;

  & > div {
    width: 100%;
    display: grid;
    grid-template-columns: 8rem 1fr;
    grid-template-rows: minmax(6.2rem, auto);
    gap: 1.6rem;
  }
`;

export default OrderSection;
