// ok
import styled from "styled-components";
import useUser from "../../hooks/data/auth/useUser";
import useScrollLock from "../../hooks/ui/useScrollLock";
import useMediaQuery from "../../hooks/ui/useMediaQuery";
import NavList from "./NavList";
import NavDrawer from "./NavDrawer";

const Sidebar = styled.aside`
  position: sticky;
  top: 6.4rem;
  left: 0;
  width: 24rem;
  height: calc(100dvh - 6.4rem);
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: inset -1px 0px #e5e7eb;
  transition:
    width 0.25s ease,
    transform 0.25s ease;

  @media (max-width: 80em) {
    width: 7.2rem;
  }

  @media (max-width: 50em) {
    display: none;
  }
`;

function Navbar({ isOpen, onClose }) {
  const { user } = useUser();
  // 是否為店長
  const isManager = user.userRole.value === "manager";

  const isDrawerMode = useMediaQuery(80, onClose);
  // html滾動功能鎖定
  useScrollLock(isDrawerMode && isOpen);

  return (
    <>
      <Sidebar>
        <NavList isManager={isManager} onClose={onClose} iconOnly />
      </Sidebar>

      {isDrawerMode && (
        <NavDrawer isManager={isManager} isOpen={isOpen} onClose={onClose} />
      )}
    </>
  );
}

export default Navbar;
