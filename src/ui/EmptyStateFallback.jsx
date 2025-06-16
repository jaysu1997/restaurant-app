import styled from "styled-components";
import emptyState from "../assets/empty-state.svg";
import Image from "./Image";
import { useNavigate } from "react-router-dom";

const StyledEmptyStateFallback = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 2rem;
  animation: fadeIn 0.3s ease forwards;
  animation-fill-mode: forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Message = styled.p`
  font-size: 2rem;
  font-weight: 500;
`;

const SubMessage = styled.p`
  font-size: 1.4rem;
  color: #6b7280;
`;

const ReloadButton = styled.button`
  background-color: #2563eb;
  color: #fff;
  border-radius: 5px;
  padding: 1rem 2rem;
  font-size: 1.4rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #1e40af;
  }

  &:focus {
    outline: 2px solid #93c5fd;
    outline-offset: 2px;
  }
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
    <StyledEmptyStateFallback>
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
