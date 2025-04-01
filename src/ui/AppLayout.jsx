import styled from "styled-components";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useOrder } from "../context/OrderContext";

const StyleAppLayout = styled.div`
  display: grid;
  grid-template-rows: 6.4rem 1fr;
  grid-template-columns: auto 1fr;
  min-height: 100dvh;
`;

const Body = styled.div`
  width: 100%;
  margin-top: 3.6rem;
`;

const Main = styled.main`
  max-width: 120rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
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
