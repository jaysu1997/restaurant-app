import styled from "styled-components";
import Modal from "./modal/Modal";
import ButtonSpinner from "../components/ButtonSpinner";
import Button from "./button/Button";
import { useState } from "react";
import { ModalContent } from "./modal/Modal";
import useRestoreFocus from "../hooks/ui/useRestoreFocus";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-1-5);
  font-size: var(--font-size-base);

  strong {
    color: var(--color-danger);
    word-break: break-all;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: var(--space-4);
  margin-top: var(--space-5);
`;

const CancelButton = styled(Button)`
  width: 100%;
`;

const DeleteButton = styled(CancelButton)`
  position: relative;
`;

const ButtonContent = styled.span`
  /* 隱藏span顯示載入中spinner */
  visibility: ${({ $processing }) => ($processing ? "hidden" : "visible")};
`;

function ConfirmDelete({
  isSuspended = false,
  data,
  render,
  deleteMutation,
  onClose,
}) {
  const handleCloseModal = useRestoreFocus(onClose, !isSuspended);
  const [isDeleteDisabled, setIsDeleteDisabled] = useState(false);
  // 刪除功能
  const { mutate: handleDelete, isPending: isDeleting } = deleteMutation;

  return (
    <Modal
      isSuspended={isSuspended}
      maxWidth={36}
      title="確認刪除"
      titleColor="#991b1b"
      onClose={handleCloseModal}
    >
      <ModalContent>
        <Main>{render({ setIsDeleteDisabled })}</Main>

        <Actions>
          <CancelButton $variant="outline" onClick={handleCloseModal}>
            取消
          </CancelButton>

          <DeleteButton
            $variant="danger"
            disabled={isDeleteDisabled || isDeleting}
            onClick={() => {
              handleDelete(data.id, {
                onSuccess: () => handleCloseModal(),
              });
            }}
          >
            <ButtonContent $processing={isDeleting}>刪除</ButtonContent>
            {isDeleting && <ButtonSpinner />}
          </DeleteButton>
        </Actions>
      </ModalContent>
    </Modal>
  );
}

export default ConfirmDelete;
