import styled from "styled-components";
import Modal from "./modal/Modal";
import ButtonSpinner from "../components/ButtonSpinner";
import Button from "./button/Button";
import { useState } from "react";
import { ModalContent } from "./modal/Modal";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  font-size: 1.6rem;

  strong {
    color: #dc2626;
    word-break: break-all;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 1.6rem;
  margin-top: 2rem;
`;

function ConfirmDelete({ data, render, deleteMutation, onClose }) {
  const [isDeleteDisabled, setIsDeleteDisabled] = useState(false);
  // 刪除功能
  const { mutate: handleDelete, isPending: isDeleting } = deleteMutation;

  return (
    <Modal title="確認刪除" titleColor="#991b1b" onClose={onClose}>
      <ModalContent>
        <Main>{render({ setIsDeleteDisabled })}</Main>

        <Actions>
          <Button $variant="outline" onClick={onClose} $isFullWidth={true}>
            取消
          </Button>

          <Button
            $variant="danger"
            $isProcessing={isDeleting}
            $isFullWidth={true}
            disabled={isDeleteDisabled || isDeleting}
            onClick={() => {
              handleDelete(data.id, {
                onSuccess: () => onClose(),
              });
            }}
          >
            <span>刪除</span>
            {isDeleting && <ButtonSpinner />}
          </Button>
        </Actions>
      </ModalContent>
    </Modal>
  );
}

export default ConfirmDelete;
