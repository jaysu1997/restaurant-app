import styled from "styled-components";
import { IoCloseCircle } from "react-icons/io5";

// 搜尋框
const StyledSearchFilter = styled.div`
  display: grid;
  grid-template-columns: 1fr 3.6rem;
  align-items: center;
  border-radius: 4px;
  border: 1px solid #ccc;
  height: 3.8rem;
  width: 100%;
  max-width: 100%;

  &:focus-within {
    border-color: #2684ff;
    box-shadow: 0 0 0 1px #2684ff;
  }

  input {
    padding: 0.2rem 0.8rem;
    font-size: 1.4rem;
    width: 100%;
  }

  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`;

function SearchFilter({ filterValue, handleValueChange, ...filters }) {
  const { queryKey, placeholder, inputType } = filters;

  return (
    <StyledSearchFilter>
      <input
        type="text"
        placeholder={placeholder}
        value={filterValue}
        onChange={(e) => {
          const finalValue =
            inputType === "number"
              ? e.target.value.replace(/\D/g, "")
              : e.target.value;

          handleValueChange(queryKey, finalValue);
        }}
      />
      {filterValue && (
        <button onClick={() => handleValueChange(queryKey, "")}>
          <IoCloseCircle size={20} />
        </button>
      )}
    </StyledSearchFilter>
  );
}

export default SearchFilter;
