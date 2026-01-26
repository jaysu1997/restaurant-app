// 用來展示數據的卡片ui
import styled from "styled-components";
import { Trash2, SquarePen, Minus } from "lucide-react";

const Card = styled.li`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #d1d5db;
  background-color: #fff;
  transition: transform 0.2s ease;

  font-size: 1.4rem;
  font-weight: 600;

  &:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
    transform: translateY(-1px);
  }
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 4.5rem 1fr;
  white-space: nowrap;
  border-bottom: 1px solid #d1d5db;
`;

const TableHead = styled.div`
  background-color: #e2e8f0;
  padding: 0.8rem;
  color: #475569;
  font-weight: 500;
`;

const TableBody = styled.div`
  padding: 0.8rem;
  font-weight: 500;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Footer = styled.div`
  display: flex;
`;

const EditButton = styled.button`
  flex-grow: 1;
  color: #0f766e;
  padding: 0.6rem 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  background-color: #f8fafc;

  & svg {
    width: 1.5rem;
    height: 1.5rem;
    flex-shrink: 0;
  }

  &:hover {
    background-color: #f0fdfa;
  }
`;

const DeleteButton = styled(EditButton)`
  color: #b91c1c;

  &:hover {
    background-color: #fef2f2;
  }
`;

const Divider = styled.div`
  background-color: #d1d5db;
  width: 1px;
  flex-shrink: 0;
`;

function DataDisplayCard({ handleEditButton, handleDeleteButton, dataFormat }) {
  return (
    <Card>
      {dataFormat.map((data) => (
        <TableRow key={data.head}>
          <TableHead>{data.head}</TableHead>
          <TableBody>{data.body ?? <Minus className="icon-md" />}</TableBody>
        </TableRow>
      ))}

      <Footer>
        <EditButton onClick={handleEditButton}>
          <SquarePen />
          <span>編輯</span>
        </EditButton>
        <Divider />
        <DeleteButton onClick={handleDeleteButton}>
          <Trash2 />
          <span>刪除</span>
        </DeleteButton>
      </Footer>
    </Card>
  );
}

export default DataDisplayCard;
