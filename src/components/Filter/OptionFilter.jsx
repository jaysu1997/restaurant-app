import styled, { css } from "styled-components";
import { hoverStyles } from "../../style/helpers";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  gap: var(--space-2-5);
`;

const OptionButton = styled.button`
  border-radius: var(--radius-md);
  padding: var(--space-1-5) var(--space-2-5);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;

  font-weight: ${({ $isSelected }) => ($isSelected ? "500" : "400")};
  color: ${({ $isSelected }) => ($isSelected ? "var(--color-brand)" : "var(--color-text-secondary)")};
  background-color: ${({ $isSelected }) =>
    $isSelected ? "var(--color-brand-subtle)" : "var(--color-surface-subtle)"};
  border: 1px solid
    ${({ $isSelected }) => ($isSelected ? "#bfdbfe" : "transparent")};

  transition:
    font-weight 0.15s ease,
    background-color 0.15s ease,
    color 0.15s ease,
    border-color 0.15s ease;

  ${hoverStyles(css`
    background-color: ${({ $isSelected }) =>
      $isSelected ? "#dbeafe" : "var(--color-border)"};
  `)}
`;

function OptionFilter({ filterValue, handleValueChange, filter }) {
  const { queryKey, options } = filter;

  return (
    <Container>
      {options.map(({ label, value }) => (
        <OptionButton
          type="button"
          key={label}
          title={label}
          $isSelected={filterValue === value}
          onClick={() =>
            handleValueChange(queryKey, filterValue === value ? "" : value)
          }
        >
          {label}
        </OptionButton>
      ))}
    </Container>
  );
}

export default OptionFilter;
