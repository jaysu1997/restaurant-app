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

function ConfirmDelete({ data, render, deleteMutation, onClose }) {
  const [isDeleteDisabled, setIsDeleteDisabled] = useState(false);
  // 刪除功能
  const { mutate: handleDelete, isPending: isDeleting } = deleteMutation;

  return (
    <Modal title="確認刪除" titleColor="#991b1b" onClose={onClose}>
      <ModalContent>
        <Main>{render({ setIsDeleteDisabled })}</Main>

        <Actions>
          <CancelButton $variant="outline" onClick={onClose}>
            取消
          </CancelButton>

          <DeleteButton
            $variant="danger"
            disabled={isDeleteDisabled || isDeleting}
            onClick={() => {
              handleDelete(data.id, {
                onSuccess: () => onClose(),
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
