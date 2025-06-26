import styled from "styled-components";
import toast from "react-hot-toast";
import { FaXmark, FaTriangleExclamation, FaCircleCheck } from "react-icons/fa6";

const Wrapper = styled.div`
  padding: 0.8rem 0rem;
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: 2rem;
  line-height: 1.6;
  gap: 1.2rem;
  align-items: center;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.type === "error" ? "#e11d48" : "#22c55e")};
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
  height: 2rem;
  width: 2rem;
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
      <Icon type={type}>
        {type === "error" ? (
          <FaTriangleExclamation size={20} />
        ) : (
          <FaCircleCheck size={20} />
        )}
      </Icon>
      <Title type={type}>{title}</Title>
      {closeButton && (
        <CloseButton onClick={() => toast.dismiss(t.id)}>
          <FaXmark size={16} />
        </CloseButton>
      )}
      {content && <Content>{content}</Content>}
    </Wrapper>
  ));
}

export default StyledHotToast;
