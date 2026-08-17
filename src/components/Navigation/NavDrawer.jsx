import styled from "styled-components";
import StyledOverlay from "../StyledOverlay";
import { NavLink } from "react-router";
import BrandImage from "../BrandImage";
import BrandName from "../BrandName";
import ModalCloseButton from "../ModalCloseButton";
import NavList from "./NavList";

const Overlay = styled(StyledOverlay)`
  display: none;

  @media (max-width: 64em) {
    display: block;
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    transition: opacity 0.25s ease;
  }
`;

const Drawer = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 151;
  width: 24rem;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: inset -1px 0px #e5e7eb;

  transform: ${({ $isOpen }) =>
    $isOpen ? "translateX(0)" : "translateX(-100%)"};
  transition: transform 0.25s ease;
`;

const MobileHeader = styled.div`
  height: 6.4rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem 0 2.4rem;
  box-shadow: inset 0px -1px #e5e7eb;
`;

const MobileBrand = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  font-size: 2rem;

  & > img {
    height: 3.6rem;
    width: auto;
  }
`;

function NavDrawer({ isManager, isOpen, onClose }) {
  return (
    <>
      <Overlay
        inert={!isOpen}
        $isOpen={isOpen}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      />

      <Drawer $isOpen={isOpen} inert={!isOpen}>
        <MobileHeader>
          <MobileBrand to="/" onClick={onClose}>
            <BrandImage />
            <BrandName />
          </MobileBrand>

          <ModalCloseButton onClose={onClose} />
        </MobileHeader>

        <NavList isManager={isManager} onClose={onClose} iconOnly={false} />
      </Drawer>
    </>
  );
}

export default NavDrawer;
