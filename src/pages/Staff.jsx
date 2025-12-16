import styled from "styled-components";
import useGetStaff from "../hooks/data/staff/useGetStaff";
import PageHeader from "../ui/PageHeader";
import QueryStatusFallback from "../ui-old/QueryStatusFallback";
import SignUp from "../features/staff/SignUp";
import StaffList from "../features/staff/StaffList";

const StaffLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  width: 100%;
  max-width: 60rem;
`;

function Staff() {
  const { data, isPending, error, isError } = useGetStaff();

  return (
    <StaffLayout>
      <PageHeader title="員工管理" />

      <QueryStatusFallback
        isPending={isPending}
        isError={isError}
        error={error}
      >
        {/* 這個或許可以改成一個新增按鈕 */}
        {/* <SignUp /> */}
        <StaffList staffList={data} />
      </QueryStatusFallback>
    </StaffLayout>
  );
}

export default Staff;
