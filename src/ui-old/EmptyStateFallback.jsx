import styled from "styled-components";
import emptyState from "../assets/empty-state.svg";
import Image from "./Image";
import { useNavigate } from "react-router-dom";
import ReloadButton from "../ui/ReloadButton";

const StyledEmptyStateFallback = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 2rem;
`;

const Message = styled.p`
  font-size: 2rem;
  font-weight: 500;
`;

const SubMessage = styled.p`
  font-size: 1.4rem;
  color: #6b7280;
`;

// 數據獲取結果為無的fallback ui
function EmptyStateFallback({
  message = "",
  buttonText = "",
  redirectTo = "",
}) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(redirectTo);
  }

  return (
    <StyledEmptyStateFallback className="fadeIn">
      <Image src={emptyState} alt="emptyStateSvg" />
      <Message>沒有相關數據</Message>
      {message && <SubMessage>{message}</SubMessage>}
      {buttonText && (
        <ReloadButton onClick={handleClick}>{buttonText}</ReloadButton>
      )}
    </StyledEmptyStateFallback>
  );
}

export default EmptyStateFallback;
