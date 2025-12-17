import styled, { css } from "styled-components";
import SectionContainer from "../../ui/SectionContainer";
import { UsersRound } from "lucide-react";
import UserAvatar from "../../ui/UserAvatar";
import { UserRoundX } from "lucide-react";
import { useState } from "react";
import Select from "react-select";
import useUpdateStaff from "../../hooks/data/staff/useUpdateStaff";
import useUser from "../../hooks/data/auth/useUser";
import Button from "../../ui/Button";
import ConfirmDelete from "../../ui-old/ConfirmDelete";

const List = styled.ul`
  display: flex;
  flex-direction: column;
`;

const Item = styled.li`
  display: grid;
  grid-template-columns: 4rem 3fr minmax(8.6rem, 1fr) 2rem;
  grid-template-rows: 4rem;
  align-items: center;
  gap: 2rem;
  padding: 1rem;
  border-top: 1px solid #f3f4f6;

  &:last-child {
    border-bottom: 1px solid #f3f4f6;
  }

  &:first-child {
    pointer-events: none;
  }

  &:hover {
    background-color: #f0f9ff;
  }

  ${({ $isUpdating }) =>
    $isUpdating &&
    css`
      background-color: #f9fafb;
      opacity: 0.6;
      pointer-events: none;
      user-select: none;
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
    font-size: 1.2rem;
    font-weight: 400;
    color: #6b7280;
  }
`;

function StaffList({ staffList }) {
  const [roles, setRoles] = useState(
    Object.fromEntries(
      staffList.map((item) => [item.id, item.user_metadata.role])
    )
  );
  const [updating, setUpdating] = useState(
    Object.fromEntries(staffList.map((item) => [item.id, false]))
  );

  const { mutate } = useUpdateStaff();
  const { user } = useUser();

  const [isOpenModal, setIsOpenModal] = useState();

  const sortedList = staffList.toSorted((a, b) => {
    const priority = (item) => {
      if (item.id === user.id) return 0; // 第一順位
      if (item.user_metadata.role === "店長") return 1; // 第二順位
      return 2; // 第三順位（員工）
    };

    return priority(a) - priority(b);
  });

  const avatarUrl =
    "https://yaoivzqoyuqdmvxnxvwm.supabase.co/storage/v1/object/public/avatar/";

  function handleChange(id, currentRole, optionValue) {
    if (currentRole === optionValue) return;
    setRoles((roles) => ({ ...roles, [id]: optionValue }));
    setUpdating((updating) => ({ ...updating, [id]: true }));

    mutate(
      { userId: id, role: optionValue },
      {
        onSuccess: () => {
          setUpdating((updating) => ({ ...updating, [id]: false }));
        },
        onError: () => {
          setUpdating((updating) => ({ ...updating, [id]: false }));
          setRoles((roles) => ({ ...roles, [id]: currentRole }));
        },
      }
    );
  }

  return (
    <>
      <SectionContainer title="人員列表" icon={<UsersRound size={20} />}>
        <List>
          {sortedList.map((item) => {
            const { avatarFile, name, role } = item.user_metadata;
            return (
              <Item key={item.id} $isUpdating={updating[item.id]}>
                <UserAvatar
                  avatarUrl={`${avatarUrl}${avatarFile}`}
                  lazyLoading={true}
                />

                <Profile>
                  <span>{name}</span>
                  <span>{item.email}</span>
                </Profile>

                <Select
                  isDisabled={item.id === user.id || updating[item.id]}
                  options={[
                    { label: "店長", value: "店長" },
                    { label: "員工", value: "員工" },
                  ]}
                  value={{ label: roles[item.id], value: roles[item.id] }}
                  onChange={(option) =>
                    handleChange(item.id, role, option.value)
                  }
                  isSearchable={false}
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  menuPosition="fixed"
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  }}
                />

                <Button
                  $variant="plain"
                  disabled={item.id === user.id || updating[item.id]}
                >
                  <UserRoundX size={20} strokeWidth={2.2} />
                </Button>
              </Item>
            );
          })}
        </List>
      </SectionContainer>

      {/* {isOpenModal && (
        <ConfirmDelete
          onCloseModal={() => setIsOpenModal(false)}
          handleDelete={mutate}
          isDeleting={isPending}
          data={orderData}
          showRelatedData={false}
          render={() => (
            <p>
              請確認是否要刪除
              <strong>{`取餐號碼${formatPickupNumber(
                orderData.pickupNumber
              )}`}</strong>
              &#8203;&nbsp;(
              {formatCreatedTime(orderData.createdTime)})，此操作無法復原。
            </p>
          )}
        />
      )} */}
    </>
  );
}

export default StaffList;
