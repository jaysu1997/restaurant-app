import styled from "styled-components";
import Button from "./Button";
import { Fragment, useState } from "react";
import Modal from "./Modal";
import UpsertMenuForm from "../features/menu-manage/UpsertMenuForm";
import { RiArrowRightSLine } from "react-icons/ri";
import StyledOverlayScrollbars from "./StyledOverlayScrollbars";
import LoadingDotMini from "./LoadingDotMini";
import useGetFilterMenuData from "../hooks/data/menus/useGetFilterData";
import QueryStatusFallback from "./QueryStatusFallback";

const StyledConfirmDelete = styled.div`
  max-width: 36rem;
  display: flex;
  flex-direction: column;

  padding: 2rem;
  gap: 1.2rem;
  font-size: 1.6rem;
`;

const Content = styled.div`
  font-size: 1.6rem;

  strong {
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
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.8rem 1.2rem;
  gap: 0.4rem;
  background-color: #f9fafb;
  transition: background-color 0.3s;
  font-size: 1.4rem;
  line-height: 1.4;

  border-bottom: ${({ $collapse }) =>
    $collapse ? "1px solid #dddddd" : "none"};

  svg {
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

  span[tabindex="0"] {
    color: #3b82f6;
    cursor: pointer;
  }

  span[tabindex="0"]:hover {
    color: #2563eb;
    text-decoration: underline;
  }

  span[tabindex="0"]:focus {
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

  input {
    width: 1.6rem;
    height: 1.6rem;
    cursor: pointer;
  }

  label {
    line-height: 1.6;
    cursor: pointer;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.6rem;
`;

function ConfirmDelete({
  onCloseModal,
  data,
  modalType,
  render,
  handleDelete,
  isDeleting,
}) {
  const [confirm, setConfirm] = useState(false);
  // 只有在庫存數據刪除的時候，才需要執行以下custom hook以及展示FilterMenuList
  const shouldFetchFilterData = modalType === "inventory";
  const { filterMenuData, isPending, isError, error } = useGetFilterMenuData(
    data.label,
    shouldFetchFilterData
  );

  return (
    <Modal
      modalHeader="確認刪除"
      headerColor="#991b1b"
      maxWidth={36}
      onCloseModal={onCloseModal}
    >
      <StyledConfirmDelete>
        <QueryStatusFallback
          isPending={shouldFetchFilterData && isPending}
          isError={shouldFetchFilterData && isError}
          error={error}
        >
          <Content>{render()}</Content>

          {shouldFetchFilterData && (
            <FilterMenuList filterMenuData={filterMenuData} name={data.label} />
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
              $buttonStyle="confirmDelete"
              disabled={confirm === false || isDeleting}
              onClick={() => {
                handleDelete(data.id, {
                  onSuccess: () => onCloseModal(),
                });
              }}
            >
              {isDeleting ? <LoadingDotMini /> : "刪除"}
            </Button>
          </ButtonRow>
        </QueryStatusFallback>
      </StyledConfirmDelete>
    </Modal>
  );
}

export default ConfirmDelete;

// 刪除食材時才需要顯示的內容
function FilterMenuList({ name, filterMenuData }) {
  const [isCollapse, setIsCollapse] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <Accordion>
        <AccordionTitle
          $collapse={!isCollapse}
          onClick={() => setIsCollapse((isCollapse) => !isCollapse)}
        >
          <RiArrowRightSLine size={14} />
          <span>查看使用{name}的餐點</span>
        </AccordionTitle>

        <StyledOverlayScrollbars style={{ maxHeight: "10rem" }}>
          <AccordionContent $collapse={!isCollapse}>
            {filterMenuData.length !== 0 ? (
              filterMenuData.map((menu, index) => (
                <Fragment key={menu.id}>
                  <span
                    role="button"
                    tabIndex="0"
                    onClick={() => setIsOpenModal(menu)}
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

      {isOpenModal && (
        <UpsertMenuForm
          onCloseModal={() => setIsOpenModal(false)}
          menu={isOpenModal}
        />
      )}
    </>
  );
}
