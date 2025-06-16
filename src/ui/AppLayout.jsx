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
  margin: 3.6rem 0;
  padding: 0 1rem;
`;

const Main = styled.main`
  width: min(120rem, 100%, 95dvw);
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  margin: 0 auto;
`;

function AppLayout() {
  return (
    <StyleAppLayout id="top">
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
