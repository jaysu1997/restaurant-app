import styled from "styled-components";
import useDeleteMenu from "../features/menu/useDeleteMenu";
import useDeleteInventory from "../features/inventory/useDeleteInventory";
import Button from "./Button";
import { Fragment, useState } from "react";
import Modal from "./Modal";
import useGetFilterMenuData from "../features/menu/useGetFilterData";
import UpsertMenuForm from "../features/menu/UpsertMenuForm";
import { RiArrowRightSLine } from "react-icons/ri";
import LoadingSpinner from "./LoadingSpinner";
import { useSearchParams } from "react-router-dom";
import StyledOverlayScrollbars from "./StyledOverlayScrollbars";

const StyleConfirmModal = styled.div`
  max-width: 36rem;
  display: flex;
  flex-direction: column;

  padding: 1.2rem 2.4rem;
  gap: 1.2rem;
  font-size: 1.6rem;
`;

const Content = styled.div`
  font-size: 1.6rem;

  & span {
    font-weight: 600;
    color: #dc2626;
  }
`;
const Accordion = styled.div`
  width: 100%;
  border: 1px solid #dddddd;
  border-radius: 6px;
  overflow: hidden;
  font-size: 1.2rem;
`;

const AccordionTitle = styled.button`
  width: 100%;
  height: 3.6rem;
  border: none;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0.8rem 1.2rem;
  gap: 0.4rem;
  background-color: #f9fafb;
  transition: background-color 0.3s;
  font-size: 1.4rem;
  line-height: 1.4;

  border-bottom: ${({ $collapse }) =>
    $collapse ? "1px solid #dddddd" : "none"};

  & svg {
    width: 1.4rem;
    height: 1.4rem;
    transition: transform 0.3s;
    transform: ${({ $collapse }) =>
      $collapse ? "rotate(90deg)" : "rotate(0deg)"};
  }

  &:hover {
    background-color: #f1f5f9;
  }
`;

const AccordionContent = styled.div`
  border: none;
  transition: all 0.3s;
  max-height: ${({ $collapse }) => ($collapse ? "10rem" : "0")};
  padding: ${({ $collapse }) => ($collapse ? "0.6rem 1.2rem" : "0 1.2rem")};
  line-height: 1.6;
  font-size: 1.4rem;

  & span[tabindex="0"] {
    color: #3b82f6;
    cursor: pointer;
  }

  & span[tabindex="0"]:hover {
    color: #2563eb;
    text-decoration: underline;
  }

  & span[tabindex="0"]:focus {
    outline: 2px solid #007bff;
  }
`;

const ConfirmCheckBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  height: fit-content;
  font-weight: 600;
  font-size: 1.4rem;

  & input {
    width: 1.6rem;
    height: 1.6rem;
    cursor: pointer;
  }

  & label {
    line-height: 1.6;
    cursor: pointer;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: end;
  gap: 0.6rem;
`;

function ConfirmDelete({ onCloseModal, name, id, tableName, render }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [confirm, setConfirm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [menuData, setMenuData] = useState(false);

  const { filterMenuData, isPending } = useGetFilterMenuData(name);
  const { deleteMenu, menuDeleting } = useDeleteMenu();
  const { deleteInventory, inventoryDeleting } = useDeleteInventory();

  if (isPending) return <LoadingSpinner />;

  function handleDelete(id, name) {
    tableName === "menus" ? deleteMenu(id) : deleteInventory({ id, name });
    onCloseModal();
    setSearchParams({});
  }

  return (
    <>
      <StyleConfirmModal>
        <Content>{render()}</Content>

        {tableName === "inventory" && (
          <Accordion>
            <AccordionTitle
              $collapse={isOpen}
              onClick={() => setIsOpen((isOpen) => !isOpen)}
            >
              <RiArrowRightSLine />
              <span>查看使用{name}的餐點</span>
            </AccordionTitle>

            <StyledOverlayScrollbars
              style={{ maxHeight: "10rem" }}
              autoHide="leave"
            >
              <AccordionContent $collapse={isOpen}>
                {filterMenuData.length !== 0 ? (
                  filterMenuData.map((menu, index) => (
                    <Fragment key={menu.id}>
                      <span
                        role="button"
                        tabIndex="0"
                        onClick={() => setMenuData(menu)}
                      >
                        {menu.name}
                      </span>
                      {index < filterMenuData.length - 1 ? "、" : "。"}
                    </Fragment>
                  ))
                ) : (
                  <span>無</span>
                )}
              </AccordionContent>
            </StyledOverlayScrollbars>
          </Accordion>
        )}

        <ConfirmCheckBox>
          <input
            type="checkbox"
            id="confirm"
            checked={confirm}
            onChange={(e) => setConfirm(e.target.checked)}
          />
          <label htmlFor="confirm">是的，我確認</label>
        </ConfirmCheckBox>

        <ButtonRow>
          <Button $buttonStyle="cancel" onClick={onCloseModal}>
            取消
          </Button>
          <Button
            $buttonStyle="confirm"
            onClick={() => handleDelete(id, name)}
            disabled={confirm === false || menuDeleting || inventoryDeleting}
          >
            刪除
          </Button>
        </ButtonRow>
      </StyleConfirmModal>

      {menuData && (
        <Modal
          modalHeader="編輯餐點設定"
          onCloseModal={() => setMenuData(false)}
        >
          <UpsertMenuForm
            onCloseModal={() => setMenuData(false)}
            menu={menuData}
          />
        </Modal>
      )}
    </>
  );
}

export default ConfirmDelete;
