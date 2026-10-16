import styled from "styled-components";
import toast from "react-hot-toast";
import { X, CircleAlert, Check } from "lucide-react";

const Wrapper = styled.div`
  padding: var(--space-2) 0;
  width: 100%;
  display: grid;
  grid-template-columns: 2rem 1fr 1.6rem;
  grid-template-rows: 2rem;
  align-items: center;
  gap: var(--space-3);
  line-height: 1.6;
`;

const AlertIocn = styled(CircleAlert)`
  width: 2rem;
  height: 2rem;
  stroke-width: 3;
  stroke: var(--color-surface);
  fill: var(--color-danger-strong);

  circle {
    stroke: var(--color-danger-strong);
  }
`;

const CheckIcon = styled(Check)`
  width: 2rem;
  height: 2rem;
  background-color: #22c55e;
  border-radius: 50%;
  padding: var(--space-1);
  stroke-width: 3.6;
  stroke: var(--color-surface);
`;

const Title = styled.h4`
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: ${(props) =>
    props.type === "error" ? "#be123c" : "var(--color-success-text)"};
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  svg {
    width: 1.6rem;
    height: 1.6rem;
  }
`;

const Content = styled.div`
  grid-column: 2 / 3;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-regular);
  word-break: break-all;
`;

// 檔案放置位置可能需要重新考慮
function showToast({
  closeButton = true,
  type = "error",
  title = "提示訊息",
  content = "",
}) {
  // 判別toast類型
  const toastAlert = type === "error" ? toast.error : toast.success;

  return toastAlert((t) => (
    <Wrapper>
      {type === "error" ? <AlertIocn /> : <CheckIcon />}

      <Title type={type}>{title}</Title>
      {closeButton && (
        <CloseButton onClick={() => toast.dismiss(t.id)}>
          <X />
        </CloseButton>
      )}
      {content && <Content>{content}</Content>}
    </Wrapper>
  ));
}

export default showToast;
