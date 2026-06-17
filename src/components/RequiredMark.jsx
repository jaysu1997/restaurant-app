// 必填欄位標記
import styled from "styled-components";

const StyledRequiredMark = styled.span`
  color: #dc2626;
`;

function ReqiuredMark() {
  return <StyledRequiredMark aria-hidden="true">*</StyledRequiredMark>;
}

export default ReqiuredMark;
