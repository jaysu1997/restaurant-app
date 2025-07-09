// Error回退處理功能組件(當在渲染時遇到Error時，會顯示此組件的內容，代替全白且無法操作的Error畫面)
import styled from "styled-components";
import Button from "./Button";
import { GlobalStyles } from "../style/GlobalStyles";
import PageHeader from "./PageHeader";

const StyledErrorFallback = styled.main`
  height: 100vh;
  background-color: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  /* Box */
  background-color: #fff;
  border: 1px solid #f3f4f6;
  border-radius: 6px;

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 1.6rem;
  }

  & p {
    font-family: "Sono";
    margin-bottom: 3.2rem;
    color: #6b7280;
  }
`;

// 這還需要再做修正
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <>
      <GlobalStyles />
      <StyledErrorFallback>
        <Box>
          <PageHeader title="Something went wrong 🧐" />
          <p>{error.message}</p>
          <Button onClick={resetErrorBoundary}>Try again</Button>
        </Box>
      </StyledErrorFallback>
    </>
  );
}

export default ErrorFallback;
