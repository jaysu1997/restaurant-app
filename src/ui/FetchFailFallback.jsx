import styled from "styled-components";
import errorSvg from "../assets/error.svg";
import Image from "./Image";

const StyledFetchFailFallback = styled.section`
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

// 數據獲取失敗fallback ui
function FetchFailFallback() {
  return (
    <StyledFetchFailFallback>
      <Image src={errorSvg} alt="fetchingErrorSvg" />
      <Message>數據獲取失敗</Message>
      <SubMessage>請檢查網路連線，或稍後再試一次</SubMessage>
      <ReloadButton onClick={() => window.location.reload()}>
        重新嘗試
      </ReloadButton>
    </StyledFetchFailFallback>
  );
}

export default FetchFailFallback;
