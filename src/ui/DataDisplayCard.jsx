// 用來展示數據的卡片ui

import styled from "styled-components";
import { TbEdit, TbTrashX } from "react-icons/tb";

const Card = styled.li`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  border-radius: 10px;
  overflow: hidden;
  outline: 2px solid #dcdcdc;
  /* background-color: #f9fafb; */
  background-color: #fff;
  /* box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2); */
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    /* box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.2); */
    outline: 2px solid #93c5fd;
  }
`;

const TableRow = styled.div`
  ${(props) => props.$twoColumns && "grid-column: 1 / -1;"}
  display: grid;
  grid-template-columns: min-content 1fr;
  white-space: nowrap;
  border-bottom: 1px solid #dcdcdc;
`;

const TableHead = styled.div`
  background-color: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-weight: 600;
  font-size: 1.4rem;
  padding: 0.8rem;
`;

const TableBody = styled.div`
  padding: 0.8rem;
  font-size: 1.4rem;
  font-weight: 500;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Button = styled.button`
  width: 100%;
  /* background-color: #f9fafb; */
  background-color: #fff;
  color: ${(props) => props.$fontColor};
  padding: 0.6rem 1.2rem;
  font-size: 1.4rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: 1px solid #dcdcdc;

  &:hover {
    background-color: #f0f9ff;
  }

  svg {
    width: 1.6rem;
    height: 1.6rem;
  }
`;

function DataDisplayCard({ handleEditButton, handleDeleteButton, dataFormat }) {
  return (
    <Card>
      {dataFormat.map((data) => (
        <TableRow $twoColumns={data.twoColumns} key={data.head}>
          <TableHead>{data.head}</TableHead>
          <TableBody>{data.body}</TableBody>
        </TableRow>
      ))}

      <Button $fontColor="#0f766e" onClick={handleEditButton}>
        <TbEdit />
        <span>編輯</span>
      </Button>
      <Button $fontColor="#b91c1c" onClick={handleDeleteButton}>
        <TbTrashX />
        <span>刪除</span>
      </Button>
    </Card>
  );
}

export default DataDisplayCard;
