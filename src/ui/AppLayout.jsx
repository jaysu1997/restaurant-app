import styled from "styled-components";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const StyleAppLayout = styled.div`
  display: grid;
  grid-template-rows: 6.4rem 1fr;
  grid-template-columns: auto 1fr;
  min-height: 100dvh;
  width: 100%;
  max-width: 192rem;
  margin: 0 auto;
`;

const Body = styled.div`
  width: 100%;
  padding: 3.6rem 1rem 0;
`;

const Main = styled.main`
  width: min(120rem, 100%, 95dvw);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.2rem;
  margin: 0 auto;
`;

function AppLayout() {
  return (
    <StyleAppLayout>
      <Header />
      <Navbar />
      <Body>
        <Main>
          <Outlet />
        </Main>
      </Body>
    </StyleAppLayout>
  );
}

export default AppLayout;
