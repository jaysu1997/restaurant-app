import styled from "styled-components";
import useDeleteMenu from "../features/menu/useDeleteMenu";
import useDeleteInventory from "../features/inventory/useDeleteInventory";
import Button from "./Button";
import { Fragment, useEffect, useState } from "react";
import Modal from "./Modal";
import toast from "react-hot-toast";
import useGetFilterMenuData from "../features/menu/useGetFilterData";
import useDeleteFilterDate from "../features/menu/useDeleteFilterData";
import UpsertMenuForm from "../features/menu/UpsertMenuForm";
import { RiArrowRightSLine } from "react-icons/ri";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

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
  height: fit-content;
  border: none;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0.8rem 1.2rem;
  gap: 0.4rem;
  background-color: #f9fafb;
  transition: background-color 0.3s;
  font-size: 1.4rem;

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

  & span {
    color: #3b82f6;
    cursor: pointer;
  }

  & span:hover {
    color: #2563eb;
    text-decoration: underline;
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

function ConfirmDelete({ onCloseModal, name, id, tableName }) {
  const [confirm, setConfirm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [menuData, setMenuData] = useState(false);

  const { deleteMenu, menuDeleting } = useDeleteMenu();
  const { deleteInventory, inventoryDeleting } = useDeleteInventory();
  const { filterMenuData, isPending } = useGetFilterMenuData(name);
  const { deleteFilterData, filterDataDeleting } = useDeleteFilterDate();

  useEffect(
    function () {
      if (filterMenuData?.length === 0) setConfirm(true);
    },
    [filterMenuData?.length]
  );

  if (isPending) return;

  function handleDelete(id) {
    tableName === "menus" ? deleteMenu(id) : deleteInventory(id);
    tableName === "inventory" && deleteFilterData(name);
    onCloseModal();
  }

  return (
    <>
      <StyleConfirmModal>
        <Content>
          {tableName === "menus" ? (
            <p>
              請確認是否要刪除
              <span>{`「${name}」`}</span>
              ，以及該餐點的所有設定。
            </p>
          ) : (
            <p>
              請確認是否要刪除食材：<span>{name}</span>
              ，以及各個餐點中所有使用此食材的備料和選項。
            </p>
          )}
        </Content>

        {tableName === "inventory" && filterMenuData.length !== 0 && (
          <Accordion>
            <AccordionTitle
              $collapse={isOpen}
              onClick={() => setIsOpen((isOpen) => !isOpen)}
            >
              <RiArrowRightSLine />
              <span>查看使用{name}的餐點</span>
            </AccordionTitle>
            <OverlayScrollbarsComponent
              options={{
                scrollbars: {
                  autoHide: "leave",
                  clickScrolling: true,
                  dragScrolling: true,
                  autoHideDelay: 1000,
                },
              }}
              style={{ maxHeight: "10rem" }}
            >
              <AccordionContent $collapse={isOpen}>
                {filterMenuData.map((menu, index) => (
                  <Fragment key={menu.id}>
                    <span onClick={() => setMenuData(menu)}>{menu.name}</span>
                    {index < filterMenuData.length - 1 ? "、" : "。"}
                  </Fragment>
                ))}
              </AccordionContent>
            </OverlayScrollbarsComponent>
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
            onClick={() => handleDelete(id)}
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
