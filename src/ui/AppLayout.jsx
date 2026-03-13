// ok
import styled from "styled-components";
import { useState } from "react";
import Header from "../ui/Header";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-rows: 6.4rem 1fr;
  grid-template-columns: auto 1fr;
  min-height: 100dvh;
  width: 100%;
  max-width: 192rem;
  margin: 0 auto;

  @media (max-width: 64em) {
    grid-template-columns: 1fr;
  }
`;

const Body = styled.div`
  width: 100%;
  padding: 3.6rem 2.4rem;

  @media (max-width: 50em) {
    padding: 3.6rem 1rem;
  }
`;

const Main = styled.main`
  width: min(120rem, 100%);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function AppLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StyledAppLayout>
      <Header setIsOpen={setIsOpen} />
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      <Body>
        <Main>
          <Outlet />
        </Main>
      </Body>
    </StyledAppLayout>
  );
}

export default AppLayout;
