import { Link } from "react-router";
import styled, { css } from "styled-components";
import { hoverStyles } from "../../style/helpers";

const StyledDropdownItem = styled(Link)`
  width: 100%;
  color: #000;
  padding: var(--space-2-5) var(--space-5);
  gap: var(--space-2-5);
  display: flex;
  align-items: center;
  font-weight: var(--font-weight-regular);
  font-size: var(--font-size-sm);

  svg {
    width: 1.8rem;
    height: 1.8rem;
  }

  ${hoverStyles(css`
    background-color: var(--color-surface-subtle);
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
