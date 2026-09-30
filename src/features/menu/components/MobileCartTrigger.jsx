import styled, { css } from "styled-components";
import { hoverStyles } from "../../../style/helpers";
import { ShoppingCart } from "lucide-react";
import Price from "../../../components/Price";

const StyledTrigger = styled.button`
  display: none;

  @media (max-width: 50em) {
    position: fixed;
    left: 2rem;
    bottom: 1.6rem;
    z-index: 50;
    width: calc(100% - 4rem);
    height: 5.2rem;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0 1.6rem;
    font-size: 1.4rem;
    font-weight: 600;
    color: #fff;
    background-color: #2563eb;
    border-radius: 8px;
    box-shadow:
      0 6px 16px rgba(15, 23, 42, 0.18),
      0 2px 5px rgba(37, 99, 235, 0.15);

    transition:
      background-color 0.16s ease,
      transform 0.12s ease;

    ${hoverStyles(css`
      background-color: #1d4ed8;
    `)}

    &:active {
      transform: translateY(1px);
    }

    svg {
      width: 2rem;
      height: 2rem;
    }
  }
`;

const TotalServings = styled.span`
  min-width: 2.8rem;
  height: 2.8rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem;
  color: #2563eb;
  background-color: #fff;
  border-radius: 999px;
  font-size: 1.2rem;
  font-weight: 700;
`;

const TotalAmount = styled(Price)`
  color: #fff;
  font-size: 1.6rem;
  margin-left: auto;
`;

function MobileCartTrigger({ totalServings, totalAmount, onOpen }) {
  return (
    <StyledTrigger type="button" onClick={onOpen} aria-label="開啟購物車">
      <ShoppingCart />
      <span>購物車</span>

      <TotalServings>{totalServings}</TotalServings>

      <TotalAmount value={totalAmount} />
    </StyledTrigger>
  );
}

export default MobileCartTrigger;
