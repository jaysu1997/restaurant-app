import styled, { css } from "styled-components";
import SectionContainer from "../../../components/SectionContainer";
import { UsersRound } from "lucide-react";
import UserAvatar from "../../../components/UserAvatar";
import { UserRoundX } from "lucide-react";
import { useState } from "react";
import useUpdateStaff from "../../../hooks/data/staff/useUpdateStaff";
import useUser from "../../../hooks/data/auth/useUser";
import BaseSelect from "../../../components/BaseSelect";
import IconButton from "../../../components/button/IconButton";
import { hoverStyles } from "../../../style/helpers";

const List = styled.ul`
  display: flex;
  flex-direction: column;
  font-size: var(--font-size-sm);
  /* padding: 0 var(--space-6); */
`;

const Item = styled.li`
  display: grid;
  grid-template-columns: auto 3fr minmax(8.6rem, 1fr) 2rem;
  grid-template-rows: 4.5rem;
  align-items: center;
  gap: var(--space-5);
  /* padding: var(--space-2-5); */
  border-top: 1px solid var(--color-surface-subtle);
  padding: var(--space-3) var(--space-6);

  &:first-child {
    border: none;
    pointer-events: none;
  }

  ${hoverStyles(css`
    background-color: ${({ $isUpdating }) =>
      $isUpdating ? "var(--color-border)" : "var(--color-background)"};
  `)}

  ${({ $isUpdating }) =>
    $isUpdating &&
    css`
      background-color: var(--color-border);
      opacity: 0.5;
      user-select: none;
      cursor: progress;
    `}

  @media (max-width : 25em) {
    gap: var(--space-3);
    padding: var(--space-3);
  }
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;

  min-width: 0;

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: var(--font-weight-medium);
  }

  & > span:last-child {
    /* font-size: var(--font-size-xs); */
    font-weight: var(--font-weight-regular);
    color: var(--color-text-muted);
  }
`;

function StaffList({ staffList, onRequestDelete }) {
  const [updatingById, setUpdatingById] = useState({});
  const { updateStaff } = useUpdateStaff();
  const { user } = useUser();

  const sortedList = staffList.toSorted((a, b) => {
    const priority = (item) => {
      if (item.id === user.id) return 0;
      if (item.userRole.value === "manager") return 1;
      return 2;
    };

    return priority(a) - priority(b);
  });

  function handleChange(id, currentRole, optionValue) {
    if (currentRole === optionValue) return;
    setUpdatingById((updating) => ({ ...updating, [id]: true }));

    updateStaff(
      { userId: id, role: optionValue },
      {
        onSettled: () => {
          setUpdatingById((updating) => ({ ...updating, [id]: false }));
        },
      },
    );
  }

  return (
    <SectionContainer header="人員列表" icon={<UsersRound />}>
      <List>
        {sortedList.map((item) => (
          <Item key={item.id} $isUpdating={!!updatingById[item.id]}>
            <UserAvatar avatarFile={item.avatarFile} lazy={true} />

            <Profile>
              <span>{item.name}</span>
              <span>{item.email}</span>
            </Profile>

            <BaseSelect
              isDisabled={item.id === user.id || updatingById[item.id]}
              options={[
                { label: "店長", value: "manager" },
                { label: "員工", value: "staff" },
              ]}
              value={item.userRole}
              onChange={(option) =>
                handleChange(item.id, item.userRole.value, option.value)
              }
            />

            <IconButton
              disabled={item.id === user.id || updatingById[item.id]}
              onClick={() => onRequestDelete(item)}
            >
              <UserRoundX strokeWidth={2.2} />
            </IconButton>
          </Item>
        ))}
      </List>
    </SectionContainer>
  );
}

export default StaffList;
