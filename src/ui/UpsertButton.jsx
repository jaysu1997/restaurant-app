// 新增按鈕

import styled from "styled-components";
import Modal from "./Modal";
import { BsFileEarmarkPlus } from "react-icons/bs";

const Button = styled.button`
  background-color: #ecfeff;
  border: 2px solid #0891b2;
  font-size: 1.4rem;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
  padding: 0.4rem 0.8rem;
  height: 3.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #0891b2;
  gap: 0.2rem;
  transition: all 0.5s;

  & svg {
    height: 2rem;
    width: 2rem;
  }

  &:hover {
    background-color: #eff6ff;
    border: 2px solid #3b82f6;
    color: #3b82f6;
  }
`;

function UpsertButton({ openModal, setOpenModal, children }) {
  return (
    <div>
      <Button onClick={() => setOpenModal(true)}>
        <BsFileEarmarkPlus />
        <span>新增數據</span>
      </Button>

      {openModal && (
        <Modal onCloseModal={() => setOpenModal(false)}>{children}</Modal>
      )}
    </div>
  );
}

export default UpsertButton;
