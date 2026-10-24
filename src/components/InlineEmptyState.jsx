import styled from "styled-components";

const EmptyState = styled.div`
  padding: 3.2rem 2.4rem 1.2rem;
  display: grid;
  grid-template-columns: 4rem 1fr;
  column-gap: 0.8rem;
  row-gap: 0.4rem;
  align-items: center;
  font-weight: 500;
`;

const EmptyIcon = styled.div`
  grid-row: 1 / 3;

  svg {
    width: 3.6rem;
    height: 3.6rem;
    color: #4b5563;
  }
`;

const EmptyTitle = styled.span`
  font-size: 1.6rem;
  color: #374151;
`;

const EmptyMessage = styled.p`
  color: #9ca3af;
  font-size: 1.4rem;
`;

function InlineEmptyState({ icon, title, message }) {
  return (
    <EmptyState>
      <EmptyIcon>{icon}</EmptyIcon>
      <EmptyTitle>{title}</EmptyTitle>
      <EmptyMessage>{message}</EmptyMessage>
    </EmptyState>
  );
}

export default InlineEmptyState;
