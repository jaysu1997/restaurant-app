import styled from "styled-components";
import useGetStaff from "../hooks/data/staff/useGetStaff";
import PageHeader from "../components/PageHeader";
import QueryStatusFallback from "../components/QueryStatusFallback";
import Signup from "../features/staff/SignUp";
import StaffList from "../features/staff/StaffList";
import { UserRoundPlus } from "lucide-react";
import { useState } from "react";
import Modal from "../ui/Modal";
import PageContainer from "../components/PageContainer";
import ConfirmDelete from "../ui/ConfirmDelete";
import useDeleteStaff from "../hooks/data/staff/useDeleteStaff";
import HeaderActionButton from "../components/button/HeaderActionButton";

const StaffLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  width: 100%;
  max-width: 60rem;
`;

function Staff() {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState(null);
  const staffQuery = useGetStaff();
  const deleteMutation = useDeleteStaff();
  const onClose = () => setIsSignupOpen(false);

  return (
    <>
      <PageContainer $maxWidth="60rem">
        <PageHeader title="員工管理">
          <HeaderActionButton onClick={() => setIsSignupOpen(true)}>
            <UserRoundPlus />
            <span>註冊</span>
          </HeaderActionButton>
        </PageHeader>

        <StaffLayout>
          <QueryStatusFallback queries={[staffQuery]}>
            <StaffList
              staffList={staffQuery?.data?.users}
              onRequestDelete={setStaffToDelete}
            />
          </QueryStatusFallback>
        </StaffLayout>
      </PageContainer>

      {isSignupOpen && (
        <Modal modalHeader="建立員工帳號" onClose={onClose} maxWidth={56}>
          <Signup onClose={onClose} />
        </Modal>
      )}

      {staffToDelete && (
        <ConfirmDelete
          onClose={() => setStaffToDelete(false)}
          deleteMutation={deleteMutation}
          data={staffToDelete}
          render={() => (
            <p>
              請確認是否要刪除
              <strong>
                {" "}
                {staffToDelete.user_metadata.name} ({staffToDelete.email}){" "}
              </strong>
              ?
            </p>
          )}
        />
      )}
    </>
  );
}

export default Staff;
