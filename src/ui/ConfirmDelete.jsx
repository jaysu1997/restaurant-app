import styled from "styled-components";
import { useState } from "react";
import Modal from "./Modal";
import ButtonSpinner from "../ui/ButtonSpinner";
import useIngredientRelatedMenus from "../hooks/data/menus/useIngredientRelatedMenus";
import QueryStatusFallback from "./QueryStatusFallback";
import Button from "../ui/Button";
import ButtonCancel from "../ui/ButtonCancel";
import RelatedMenus from "../features/inventory/RelatedMenus";

const StyledConfirmDelete = styled.div`
  width: 36rem;
  max-width: 100%;
  display: flex;
  flex-direction: column;

  padding: 2rem;
  gap: 2.4rem;
  font-size: 1.6rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: 1.6rem;

  strong {
    color: #dc2626;
    word-break: break-all;
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
  justify-content: center;
  gap: 2rem;
`;

// 執行食材獲取的功能或許需要優化，目前這看起來有點醜，未來應該要分割
function ConfirmDelete({
  onCloseModal,
  data,
  showRelatedData = false,
  render,
  handleDelete,
  isDeleting,
}) {
  const [confirm, setConfirm] = useState(false);

  const {
    relatedMenus,
    relatedMenusIsLoading,
    relatedMenusIsError,
    relatedMenusError,
  } = useIngredientRelatedMenus(data.id, showRelatedData);

  return (
    <Modal
      modalHeader="確認刪除"
      headerColor="#991b1b"
      onCloseModal={onCloseModal}
    >
      <StyledConfirmDelete>
        <QueryStatusFallback
          status={{
            isLoading: showRelatedData && relatedMenusIsLoading,
            isError: showRelatedData && relatedMenusIsError,
          }}
          errorFallback={relatedMenusError}
        >
          <Content>{render()}</Content>

          {showRelatedData && (
            <RelatedMenus relatedMenus={relatedMenus} name={data.label} />
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
            <Button
              $variant="danger"
              $isProcessing={isDeleting}
              disabled={confirm === false || isDeleting}
              onClick={() => {
                handleDelete(data.id, {
                  onSuccess: () => onCloseModal(),
                });
              }}
            >
              <span>刪除</span>
              {isDeleting && <ButtonSpinner />}
            </Button>

            <ButtonCancel onClick={onCloseModal} />
          </ButtonRow>
        </QueryStatusFallback>
      </StyledConfirmDelete>
    </Modal>
  );
}

export default ConfirmDelete;
