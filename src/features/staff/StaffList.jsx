import styled, { css } from "styled-components";
import SectionContainer from "../../ui/SectionContainer";
import { UsersRound } from "lucide-react";
import UserAvatar from "../../ui/UserAvatar";
import { UserRoundX } from "lucide-react";
import { useState } from "react";
import useUpdateStaff from "../../hooks/data/staff/useUpdateStaff";
import useUser from "../../hooks/data/auth/useUser";
import Button from "../../ui/Button";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteStaff from "../../hooks/data/staff/useDeleteStaff";
import { AVATAR_URL } from "../../utils/constants";
import StyledSelect from "../../ui/StyledSelect";

const List = styled.ul`
  display: flex;
  flex-direction: column;
`;

const Item = styled.li`
  display: grid;
  grid-template-columns: auto 3fr minmax(8.6rem, 1fr) 2rem;
  grid-template-rows: 4.5rem;
  align-items: center;
  gap: 2rem;
  padding: 1rem;
  border-top: 1px solid #f3f4f6;

  &:first-child {
    border: none;
    pointer-events: none;
  }

  &:hover {
    background-color: ${({ $isUpdating }) =>
      $isUpdating ? "transparent" : "#f0f9ff"};
  }

  ${({ $isUpdating }) =>
    $isUpdating &&
    css`
      background-color: #e5e7eb;
      opacity: 0.6;
      user-select: none;
      cursor: progress;
    `}

  @media (max-width : 25em) {
    gap: 1.2rem;
    padding: 1rem 0.4rem;
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
    font-weight: 500;
  }

  & > span:last-child {
    /* font-size: 1.2rem; */
    font-weight: 400;
    color: #6b7280;
  }
`;

function StaffList({ staffList, isOpenModal, setIsOpenModal }) {
  const rolesById = Object.fromEntries(
    staffList.map((item) => [item.id, item.user_metadata.role]),
  );

  const [updating, setUpdating] = useState({});

  const { updateStaff } = useUpdateStaff();
  const { user } = useUser();
  const deleteMutation = useDeleteStaff();

  const sortedList = staffList.toSorted((a, b) => {
    const priority = (item) => {
      if (item.id === user.id) return 0; // 第一順位
      if (item.user_metadata.role === "店長") return 1; // 第二順位
      return 2; // 第三順位（員工）
    };

    return priority(a) - priority(b);
  });

  function handleChange(id, currentRole, optionValue) {
    if (currentRole === optionValue) return;
    setUpdating((updating) => ({ ...updating, [id]: true }));

    updateStaff(
      { userId: id, role: optionValue },
      {
        onSettled: () => {
          setUpdating((updating) => ({ ...updating, [id]: false }));
        },
      },
    );
  }

  return (
    <>
      <SectionContainer title="人員列表" icon={<UsersRound />}>
        <List>
          {sortedList.map((item) => {
            const { avatarFile, name, role } = item.user_metadata;
            return (
              <Item key={item.id} $isUpdating={!!updating[item.id]}>
                <UserAvatar
                  avatarUrl={`${AVATAR_URL}${avatarFile}`}
                  lazyLoading={true}
                />

                <Profile>
                  <span>{name}</span>
                  <span>{item.email}</span>
                </Profile>

                <StyledSelect
                  isDisabled={item.id === user.id || updating[item.id]}
                  options={[
                    { label: "店長", value: "店長" },
                    { label: "員工", value: "員工" },
                  ]}
                  value={{
                    label: rolesById[item.id],
                    value: rolesById[item.id],
                  }}
                  onChange={(option) =>
                    handleChange(item.id, role, option.value)
                  }
                />

                <Button
                  $variant="plain"
                  disabled={item.id === user.id || updating[item.id]}
                  onClick={() => setIsOpenModal({ type: "delete", data: item })}
                >
                  <UserRoundX strokeWidth={2.2} />
                </Button>
              </Item>
            );
          })}
        </List>
      </SectionContainer>

      {isOpenModal.type === "delete" && (
        <ConfirmDelete
          setIsOpenModal={setIsOpenModal}
          deleteMutation={deleteMutation}
          data={isOpenModal.data}
          showRelatedData={false}
          render={() => (
            <p>
              請確認是否要刪除
              <strong>
                {" "}
                {isOpenModal.data.user_metadata.name} ({isOpenModal.data.email}
                ){" "}
              </strong>
              ?
            </p>
          )}
        />
      )}
    </>
  );
}

export default StaffList;
