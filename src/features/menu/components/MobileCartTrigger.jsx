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
    gap: var(--space-2);
    padding: 0 var(--space-4);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    color: var(--color-surface);
    background-color: var(--color-brand);
    border-radius: var(--radius-lg);
    box-shadow:
      0 6px 16px rgba(15, 23, 42, 0.18),
      0 2px 5px rgba(37, 99, 235, 0.15);

    transition:
      background-color 0.16s ease,
      transform 0.12s ease;

    ${hoverStyles(css`
      background-color: var(--color-brand-hover);
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
  padding: var(--space-1-5);
  color: var(--color-brand);
  background-color: var(--color-surface);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
`;

const TotalAmount = styled(Price)`
  color: var(--color-surface);
  font-size: var(--font-size-base);
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
