import styled from "styled-components";
import useGetStaff from "../hooks/data/staff/useGetStaff";
import PageHeader from "../ui/PageHeader";
import QueryStatusFallback from "../ui-old/QueryStatusFallback";
import SignUp from "../features/staff/SignUp";
import StaffList from "../features/staff/StaffList";
import { UserRoundPlus } from "lucide-react";
import Button from "../ui/Button";
import { useState } from "react";
import Modal from "../ui-old/Modal";

const StaffLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  width: 100%;
  max-width: 60rem;
`;

function Staff() {
  const { data, isPending, error, isError } = useGetStaff();
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <StaffLayout>
      <PageHeader title="員工管理">
        <Button onClick={() => setIsOpenModal({ type: "create" })}>
          <UserRoundPlus size={18} />
          <span>註冊</span>
        </Button>
      </PageHeader>

      <QueryStatusFallback
        isPending={isPending}
        isError={isError}
        error={error}
      >
        {isOpenModal.type === "create" && (
          <Modal
            maxWidth={36}
            modalHeader="註冊新帳號"
            onCloseModal={() => setIsOpenModal(false)}
          >
            <SignUp setIsOpenModal={setIsOpenModal} />
          </Modal>
        )}
        <StaffList
          staffList={data}
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
        />
      </QueryStatusFallback>
    </StaffLayout>
  );
}

export default Staff;
