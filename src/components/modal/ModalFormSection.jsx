import styled from "styled-components";
import RequiredMark from "../RequiredMark";

const Section = styled.section`
  display: grid;
  grid-template-columns: ${({ $columns }) => `repeat(${$columns}, 1fr)`};
  column-gap: 2.4rem;
  row-gap: 1.6rem;

  label {
    color: #4b5563;
    font-size: 1.3rem;
    font-weight: 500;
  }

  @media (max-width: 35em) {
    grid-template-columns: 1fr;
  }
`;

const Header = styled.div`
  grid-column: 1 / -1;
  display: flex;
  gap: 0.4rem;
  font-size: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
`;

const Title = styled.h3`
  font-size: 2rem;
  color: #111827;
`;

const Description = styled.p`
  grid-column: 1 / -1;
  padding: 1.2rem 1.4rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background-color: #f8fafc;
  color: #475569;
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
