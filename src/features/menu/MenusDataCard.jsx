// 菜單設定數據表單(需要修改)

import styled from "styled-components";
import { useState } from "react";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import UpsertMenuForm from "./UpsertMenuForm";

import { MacScrollbar } from "mac-scrollbar";
import { RiDeleteBin2Line, RiEditBoxLine } from "react-icons/ri";
import { FiMinus } from "react-icons/fi";

const Card = styled.div`
  max-width: 40rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(5, 3.2rem);
  border: 1px solid #cbd5e1;
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.15);
  height: min-content;
  transition: all 0.3s;

  &:hover {
    transform: scale(1.02);
  }
`;

const OneColumns = styled.div`
  display: grid;
  grid-template-columns: 4.8rem 1fr;
  border-bottom: 1px solid #94a3b8;
  background-color: #e2e8f0;
`;

const TwoColumns = styled.div`
  grid-column: 1 / 3;
  display: grid;
  grid-template-columns: 4.8rem 1fr;
  border-bottom: 1px solid #94a3b8;
  background-color: #e2e8f0;
`;

const Footer = styled.div`
  grid-column: 1 / 3;
  display: flex;
  background-color: #cbd5e1;
  gap: 0.2rem;
`;

const TableHead = styled.div`
  background-color: #60a5fa;
  text-align: center;
  padding: 0.2rem 0.4rem;
`;

const TableBody = styled.div`
  padding: 0.2rem 0.4rem;
  white-space: nowrap;
`;

const Button = styled.button`
  flex-grow: 1;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.6rem;

  background-color: ${(props) => props.$bgColor};
  color: ${(props) => props.$color};

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
`;

// 設定mac-scrollbar的高度
const trackStyle = (horizontal) => ({
  height: horizontal && "0px",
});

const thumbStyle = (horizontal) => ({
  height: horizontal && "5px",
});

function MenusDataCard({ menu }) {
  // 刪除、編輯Modal
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  // 菜單數據
  const { id, name, category, price, discount, ingredients, customize } = menu;

  // 成份
  const ingredientArray = ingredients.map((i) => i.name.label);

  const customizeArray = customize?.map((c) => c.title);

  return (
    <>
      <Card>
        <OneColumns>
          <TableHead>名稱</TableHead>
          <TableBody>{name}</TableBody>
        </OneColumns>
        <OneColumns>
          <TableHead>分類</TableHead>
          <TableBody>{category}</TableBody>
        </OneColumns>
        <OneColumns>
          <TableHead>售價</TableHead>
          <TableBody>{price}</TableBody>
        </OneColumns>
        <OneColumns>
          <TableHead>折扣</TableHead>
          <TableBody>{discount || <FiMinus />}</TableBody>
        </OneColumns>
        <TwoColumns>
          <TableHead>食材</TableHead>
          <MacScrollbar trackStyle={trackStyle} thumbStyle={thumbStyle}>
            <TableBody>{ingredientArray.join(", ")}</TableBody>
          </MacScrollbar>
        </TwoColumns>
        <TwoColumns>
          <TableHead>細項</TableHead>
          <TableBody>{customizeArray?.join(", ") || <FiMinus />}</TableBody>
        </TwoColumns>

        <Footer>
          <Button
            $color="#f0fdfa"
            $bgColor="#0f766e"
            onClick={() => setOpenEditModal(true)}
          >
            <RiEditBoxLine />
            <span>編輯</span>
          </Button>
          <Button
            $color="#fef2f2"
            $bgColor="#b91c1c"
            onClick={() => setOpenDeleteModal(true)}
          >
            <RiDeleteBin2Line />
            <span>刪除</span>
          </Button>
        </Footer>
      </Card>

      {/* 編輯指定菜單數據的彈出視窗 */}
      {openEditModal && (
        <Modal onCloseModal={() => setOpenEditModal(false)}>
          <UpsertMenuForm
            onCloseModal={() => setOpenEditModal(false)}
            menu={menu}
          />
        </Modal>
      )}

      {/* 刪除指定菜單數據的彈出視窗 */}
      {openDeleteModal && (
        <Modal onCloseModal={() => setOpenDeleteModal(false)}>
          <ConfirmDelete
            onCloseModal={() => setOpenDeleteModal(false)}
            name={name}
            id={id}
          />
        </Modal>
      )}
    </>
  );
}

export default MenusDataCard;
