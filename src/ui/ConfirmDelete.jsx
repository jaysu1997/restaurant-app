// 確認刪除menu數據的彈出視窗
import styled from "styled-components";
import useDeleteMenu from "../features/menu/useDeleteMenu";

const StyleConfirmModal = styled.div`
  max-width: 40rem;
  display: grid;
  grid-template-columns: 1fr;
  flex-direction: column;
  padding: 2.4rem 4.8rem;
  gap: 2rem;
`;

const H1 = styled.h1`
  color: #991b1b;
  font-size: 2.4rem;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: end;
  gap: 0.6rem;
`;

const Button = styled.button`
  width: 8rem;
  font-size: 1.8rem;
  padding: 0.8rem 1.6rem;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  color: #eef2ff;
  font-weight: 600;
  background-color: ${(props) => props.$bgcolor};

  &:hover {
    background-color: ${(props) => props.$hover};
  }
`;

function ConfirmDelete({ onCloseModal, name, id }) {
  const { deleteMenu, isDeleting } = useDeleteMenu();

  function handleDelete(id) {
    deleteMenu(id);
    onCloseModal?.();
  }

  return (
    <StyleConfirmModal>
      <H1>確認刪除</H1>
      <p>請確認是否刪除餐點{name}，以及其相關設定數據。</p>
      <ButtonRow>
        <Button $bgcolor="#404040" $hover="#525252" onClick={onCloseModal}>
          取消
        </Button>
        <Button
          $bgcolor="#b91c1c"
          $hover="#dc2626"
          onClick={() => handleDelete(id)}
          disabled={isDeleting}
        >
          刪除
        </Button>
      </ButtonRow>
    </StyleConfirmModal>
  );
}

export default ConfirmDelete;
