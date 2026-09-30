import { Link } from "react-router";
import styled, { css } from "styled-components";
import { hoverStyles } from "../../style/helpers";

const StyledDropdownItem = styled(Link)`
  width: 100%;
  color: #000;
  padding: 1rem 2rem;
  gap: 1rem;
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 1.4rem;

  svg {
    width: 1.8rem;
    height: 1.8rem;
  }

  ${hoverStyles(css`
    background-color: #f3f4f6;
  `)}
`;

function DropdownItem({ name, icon, ...rest }) {
  return (
    <li>
      <StyledDropdownItem {...rest}>
        {icon}
        <span>{name}</span>
      </StyledDropdownItem>
    </li>
  );
}

export default DropdownItem;
