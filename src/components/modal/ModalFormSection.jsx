import styled from "styled-components";
import RequiredMark from "../RequiredMark";

const Section = styled.section`
  display: grid;
  grid-template-columns: ${({ $columns }) => `repeat(${$columns}, 1fr)`};
  column-gap: var(--space-6);
  row-gap: var(--space-4);

  @media (max-width: 30em) {
    grid-template-columns: 1fr;
  }
`;

const Header = styled.div`
  grid-column: 1 / -1;
  display: flex;
  gap: var(--space-1);
  font-size: var(--font-size-lg);
  padding-bottom: var(--space-2-5);
  border-bottom: 1px solid var(--color-border);
`;

const Title = styled.h3`
  font-size: var(--font-size-lg);
  color: var(--color-text-strong);
`;

const Description = styled.p`
  grid-column: 1 / -1;
  padding: var(--space-3) var(--space-3-5);
  border: 1px solid var(--color-border-slate);
  border-radius: var(--radius-md);
  background-color: #f8fafc;
  color: var(--color-text-slate);
  font-size: 1.3rem;
`;

function ModalFormSection({
  columns = 1,
  title,
  required = false,
  descriptions = [],
  children,
}) {
  return (
    <Section $columns={columns}>
      {title && (
        <Header>
          <Title>{title}</Title>
          {required && <RequiredMark />}
        </Header>
      )}

      {descriptions.map((description, index) => (
        <Description key={index}>{description}</Description>
      ))}

      {children}
    </Section>
  );
}

export default ModalFormSection;
