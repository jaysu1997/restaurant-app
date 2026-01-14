import styled from "styled-components";
import toast from "react-hot-toast";
import { X, TriangleAlert, Check } from "lucide-react";

const Wrapper = styled.div`
  padding: 0.8rem 0;
  width: 100%;
  display: grid;
  grid-template-columns: 2rem 1fr 1.6rem;
  grid-template-rows: 2rem;
  align-items: center;
  gap: 1.2rem;
  line-height: 1.6;
`;

const AlertIocn = styled(TriangleAlert)`
  stroke-width: 3;
  stroke: #fff;
  fill: #e11d48;

  & path:nth-child(1) {
    stroke: #e11d48;
  }
`;

const CheckIcon = styled(Check)`
  background-color: #22c55e;
  border-radius: 50%;
  padding: 0.4rem;
  stroke-width: 3.6;
  stroke: #fff;
`;

const Title = styled.h4`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${(props) => (props.type === "error" ? "#be123c" : "#166534")};
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;

const Content = styled.div`
  grid-column: 2 / 3;
  font-size: 1.4rem;
  font-weight: 400;
  word-break: break-all;
`;

function StyledHotToast({
  closeButton = true,
  type = "error",
  title = "提示訊息",
  content = "",
}) {
  // 判別toast類型
  const toastAlert = type === "error" ? toast.error : toast.success;

  return toastAlert((t) => (
    <Wrapper>
      {type === "error" ? <AlertIocn size={20} /> : <CheckIcon size={20} />}

      <Title type={type}>{title}</Title>
      {closeButton && (
        <CloseButton onClick={() => toast.dismiss(t.id)}>
          <X size={16} strokeWidth={2.8} />
        </CloseButton>
      )}
      {content && <Content>{content}</Content>}
    </Wrapper>
  ));
}

export default StyledHotToast;
