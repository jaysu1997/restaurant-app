import styled from "styled-components";
import errorSvg from "../assets/error.svg";
import Image from "./Image";
import { FaTriangleExclamation } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import HomeButton from "../ui/HomeButton";
import ReloadButton from "../ui/ReloadButton";

const StyledFetchFailFallback = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  width: 100%;
  gap: 2rem;
`;

const Message = styled.p`
  font-size: 2rem;
  font-weight: 500;
`;

const SubMessage = styled.p`
  font-size: 1.5rem;
  color: #6b7280;
  word-break: break-word;
  /* white-space: pre-wrap; */
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3.6rem;
`;

// const ReloadButton = styled.button`
//   background-color: #2563eb;
//   color: #fff;
//   border-radius: 6px;
//   padding: 1rem 2rem;
//   font-size: 1.4rem;
//   cursor: pointer;
//   transition: background-color 0.2s ease;

//   &:hover {
//     background-color: #1e40af;
//   }

//   &:focus {
//     outline: 2px solid #93c5fd;
//     outline-offset: 2px;
//   }
// `;

// 數據獲取失敗fallback ui
function FetchFailFallback({ error }) {
  const navigate = useNavigate();

  return (
    <StyledFetchFailFallback className="fadeIn">
      {/* 離線errorSvg會死圖，所以放個備用icon */}
      {navigator.onLine ? (
        <Image src={errorSvg} alt="fetchingErrorSvg" />
      ) : (
        <FaTriangleExclamation size={96} color="#dc2626" />
      )}
      <Message>數據獲取失敗</Message>
      <SubMessage>{error?.message}</SubMessage>
      <ButtonGroup>
        <ReloadButton onClick={error?.action}>
          {error?.actionLabel}
        </ReloadButton>
        <HomeButton onClick={() => navigate("/")}>返回首頁</HomeButton>
      </ButtonGroup>
    </StyledFetchFailFallback>
  );
}

export default FetchFailFallback;
