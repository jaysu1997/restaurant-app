import styled from "styled-components";
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
  gap: 0.6rem;
  font-size: 1.6rem;

  strong {
    color: #dc2626;
    word-break: break-all;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 1.6rem;
  margin-top: 2rem;
`;

// 執行食材獲取的功能或許需要優化，目前這看起來有點醜，未來應該要分割
function ConfirmDelete({
  data,
  showRelatedData = false,
  render,
  deleteMutation,
  setIsOpenModal,
}) {
  // 刪除功能
  const { mutate: handleDelete, isPending: isDeleting } = deleteMutation;

  // 關閉確認刪除modal
  const onCloseModal = () => setIsOpenModal(false);

  const {
    relatedMenus,
    relatedMenusIsLoading,
    relatedMenusIsError,
    relatedMenusError,
  } = useIngredientRelatedMenus(data.id, showRelatedData);

  return (
    <Modal modalHeader="確認刪除" headerColor="#991b1b" onClose={onCloseModal}>
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
            <RelatedMenus
              relatedMenus={relatedMenus}
              setIsOpenModal={setIsOpenModal}
            />
          )}

          <ButtonRow>
            <ButtonCancel onClick={onCloseModal} $isFullWidth={true} />

            <Button
              $variant="danger"
              $isProcessing={isDeleting}
              $isFullWidth={true}
              disabled={isDeleting}
              onClick={() => {
                handleDelete(data.id, {
                  onSuccess: () => onCloseModal(),
                });
              }}
            >
              <span>刪除</span>
              {isDeleting && <ButtonSpinner />}
            </Button>
          </ButtonRow>
        </QueryStatusFallback>
      </StyledConfirmDelete>
    </Modal>
  );
}

export default ConfirmDelete;
