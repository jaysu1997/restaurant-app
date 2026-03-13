import styled from "styled-components";

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

  color: ${({ $isSelected }) => ($isSelected ? "#2563eb" : "#374151")};
  background-color: ${({ $isSelected }) =>
    $isSelected ? "#eff6ff" : "#f3f4f6"};
  border: 1px solid
    ${({ $isSelected }) => ($isSelected ? "#bfdbfe" : "transparent")};

  transition:
    background-color 0.15s,
    color 0.15s,
    border-color 0.15s;

  &:hover {
    background-color: ${({ $isSelected }) =>
      $isSelected ? "#dbeafe" : "#e5e7eb"};
  }
`;

function OptionFilter({ filterValue, handleValueChange, ...filters }) {
  const { queryKey, options } = filters;

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
