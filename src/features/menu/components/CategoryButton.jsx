// ok
import styled from "styled-components";

const StyledCategoryItem = styled.button`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  scroll-snap-align: start;
  white-space: nowrap;
  width: calc((100% - 4rem) / 4.5);
  height: 3.6rem;
  border-radius: 6px;
  font-weight: 500;
  color: ${({ $isActive }) => ($isActive ? "#262626" : "#e5e5e5")};
  background-color: ${({ $isActive }) => ($isActive ? "#fff" : "#525252")};

  transition:
    background-color 0.2s,
    color 0.2s;

  &:hover {
    background-color: ${({ $isActive }) => ($isActive ? "#fff" : "#737373")};
  }

  @media (max-width: 40em) {
    width: calc((100% - 3rem) / 3.5);
  }

  @media (max-width: 25em) {
    width: calc((100% - 2rem) / 2.5);
  }
`;

function CategoryButton({ children, handleClick, isActive }) {
  return (
    <StyledCategoryItem onClick={handleClick} $isActive={isActive}>
      {children}
    </StyledCategoryItem>
  );
}

export default CategoryButton;
