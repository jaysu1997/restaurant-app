import styled from "styled-components";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";

const StyleAppLayout = styled.div`
  display: grid;
  grid-template-rows: 6.4rem 1fr;
  gap: 3.6rem;
`;

const Body = styled.div`
  margin: 0 auto;
  max-width: 144rem;
  /* 這裡如果設計100%會導致swiper無法具備RWD */
  width: 100dvw;
  display: flex;
  gap: 6rem;
`;

const Main = styled.main`
  max-width: 120rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

function AppLayout() {
  return (
    <StyleAppLayout id="top">
      <Header />
      <Body>
        <Nav />
        <Main>
          <Outlet />
        </Main>
      </Body>
    </StyleAppLayout>
  );
}

export default AppLayout;
