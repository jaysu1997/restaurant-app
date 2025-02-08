import styled from "styled-components";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import StyledOverlayScrollbars from "./StyledOverlayScrollbars";

const StyleAppLayout = styled.div`
  display: grid;
  grid-template-rows: 6.4rem 1fr;
  gap: 3.6rem;
  max-height: 100dvh;
`;

const Body = styled.div`
  margin: 0 auto;
  max-width: 144rem;
  /* 這裡如果設計100%會導致swiper無法具備RWD */
  width: 100vw;
  display: flex;
  gap: 6rem;

  /* 高度 = 100dvh - Header(6.4) - gap(3.4) */
  height: calc(100dvh - 10rem);
`;

const Main = styled.main`
  max-width: 120rem;
  /* width: 100%; */
  margin-left: auto;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  height: 100%;
  flex-grow: 1;
`;

function AppLayout() {
  return (
    <>
      <StyledOverlayScrollbars style={{ height: "100dvh" }} autoHide="scroll">
        <StyleAppLayout>
          <Header />
          <Body>
            <Nav />
            <Main>
              <Outlet />
            </Main>
          </Body>
        </StyleAppLayout>
      </StyledOverlayScrollbars>
    </>
  );
}

export default AppLayout;
