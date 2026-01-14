import Navbar from "../components/Navbar";
import styled from "styled-components";
import Header from "../ui-old/Header";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const StyleAppLayout = styled.div`
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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.2rem;
  margin: 0 auto;
`;

function AppLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StyleAppLayout>
      <Header setIsOpen={setIsOpen} />
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      <Body>
        <Main>
          <Outlet />
        </Main>
      </Body>
    </StyleAppLayout>
  );
}

export default AppLayout;
