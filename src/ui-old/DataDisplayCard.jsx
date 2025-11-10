// 用來展示數據的卡片ui
import styled from "styled-components";
import { GoTrash, GoPencil } from "react-icons/go";

const Card = styled.li`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  border-radius: 6px;
  overflow: hidden;
  border: 2px solid #dcdcdc;
  background-color: #fff;
  transition: transform 0.2s ease, border 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border: 2px solid #93c5fd;
  }
`;

const TableRow = styled.div`
  grid-column: 1 / -1;

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
  gap: 0.8rem;
  outline: 1px solid #dcdcdc;

  &:hover {
    background-color: #f0f9ff;
  }
`;

function DataDisplayCard({ handleEditButton, handleDeleteButton, dataFormat }) {
  return (
    <Card>
      {dataFormat.map((data) => (
        <TableRow key={data.head}>
          <TableHead>{data.head}</TableHead>
          <TableBody>{data.body}</TableBody>
        </TableRow>
      ))}

      <Button $fontColor="#0f766e" onClick={handleEditButton}>
        <GoPencil size={15} strokeWidth={0.6} />
        <span>編輯</span>
      </Button>
      <Button $fontColor="#b91c1c" onClick={handleDeleteButton}>
        <GoTrash size={15} strokeWidth={0.6} />
        <span>刪除</span>
      </Button>
    </Card>
  );
}

export default DataDisplayCard;
