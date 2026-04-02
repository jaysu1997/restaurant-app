import styled from "styled-components";
import useGetStaff from "../hooks/data/staff/useGetStaff";
import PageHeader from "../ui/PageHeader";
import QueryStatusFallback from "../ui/QueryStatusFallback";
import Signup from "../features/staff/SignUp";
import StaffList from "../features/staff/StaffList";
import { UserRoundPlus } from "lucide-react";
import Button from "../ui/Button";
import { useState } from "react";
import Modal from "../ui/Modal";
import PageContainer from "../ui/PageContainer";

const StaffLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  width: 100%;
  max-width: 60rem;
`;

function Staff() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { staff, staffIsLoading, staffIsError, staffError } = useGetStaff();

  return (
    <PageContainer $maxWidth="60rem">
      <PageHeader title="員工管理">
        <Button
          $iconSize="1.8rem"
          onClick={() => setIsOpenModal({ type: "create" })}
        >
          <UserRoundPlus />
          <span>註冊</span>
        </Button>
      </PageHeader>

      <StaffLayout>
        <QueryStatusFallback
          status={{
            isLoading: staffIsLoading,
            isError: staffIsError,
          }}
          errorFallback={staffError}
        >
          {isOpenModal.type === "create" && (
            <Modal
              modalHeader="註冊新帳號"
              onClose={() => setIsOpenModal(false)}
            >
              <Signup setIsOpenModal={setIsOpenModal} />
            </Modal>
          )}
          <StaffList
            staffList={staff}
            isOpenModal={isOpenModal}
            setIsOpenModal={setIsOpenModal}
          />
        </QueryStatusFallback>
      </StaffLayout>
    </PageContainer>
  );
}

export default Staff;
