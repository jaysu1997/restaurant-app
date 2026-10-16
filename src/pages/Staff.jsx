import styled from "styled-components";
import useGetStaff from "../hooks/data/staff/useGetStaff";
import PageHeader from "../components/PageHeader";
import QueryStatusFallback from "../components/QueryStatusFallback";
import Signup from "../features/staff/components/SignUp";
import StaffList from "../features/staff/components/StaffList";
import { UserRoundPlus } from "lucide-react";
import { useRef, useState } from "react";
import PageContainer from "../components/PageContainer";
import ConfirmDelete from "../components/ConfirmDelete";
import useDeleteStaff from "../hooks/data/staff/useDeleteStaff";
import HeaderActionButton from "../components/button/HeaderActionButton";

const StaffLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  width: 100%;
  max-width: 60rem;
`;

function Staff() {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState(null);
  const staffQuery = useGetStaff();
  const deleteMutation = useDeleteStaff();
  const triggerRef = useRef(null);

  return (
    <>
      <PageContainer $maxWidth="60rem">
        <PageHeader title="員工管理">
          <HeaderActionButton
            onClick={() => setIsSignupOpen(true)}
            ref={triggerRef}
          >
            <UserRoundPlus />
            <span>註冊</span>
          </HeaderActionButton>
        </PageHeader>

        <StaffLayout>
          <QueryStatusFallback queries={[staffQuery]}>
            <StaffList
              staffList={staffQuery?.data}
              onRequestDelete={setStaffToDelete}
            />
          </QueryStatusFallback>
        </StaffLayout>
      </PageContainer>

      {isSignupOpen && <Signup onClose={() => setIsSignupOpen(false)} />}

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
                {staffToDelete.name} ({staffToDelete.email}){" "}
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
