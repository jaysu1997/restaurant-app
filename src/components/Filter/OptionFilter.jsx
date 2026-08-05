import styled, { css } from "styled-components";
import { hoverStyles } from "../../style/helpers";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  gap: 1rem;
`;

const OptionButton = styled.button`
  border-radius: 6px;
  padding: 0.6rem 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;

  font-weight: ${({ $isSelected }) => ($isSelected ? "500" : "400")};
  color: ${({ $isSelected }) => ($isSelected ? "#2563eb" : "#374151")};
  background-color: ${({ $isSelected }) =>
    $isSelected ? "#eff6ff" : "#f3f4f6"};
  border: 1px solid
    ${({ $isSelected }) => ($isSelected ? "#bfdbfe" : "transparent")};

  transition:
    font-weight 0.15s ease,
    background-color 0.15s ease,
    color 0.15s ease,
    border-color 0.15s ease;

  ${hoverStyles(css`
    background-color: ${({ $isSelected }) =>
      $isSelected ? "#dbeafe" : "#e5e7eb"};
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
