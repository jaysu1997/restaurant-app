// 用來展示數據的卡片ui
import styled from "styled-components";
import { Trash2, SquarePen, Minus } from "lucide-react";

const Card = styled.li`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 6px;
  overflow: hidden;
  border: 2px solid #dcdcdc;
  background-color: #fff;
  transition:
    transform 0.2s ease,
    border 0.2s ease;

  font-size: 1.4rem;
  font-weight: 600;

  &:hover {
    transform: translateY(-2px);
    border: 2px solid #93c5fd;
  }
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  white-space: nowrap;
  border-bottom: 1px solid #dcdcdc;
`;

const TableHead = styled.div`
  background-color: #e2e8f0;
  padding: 0.8rem;
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

  & svg {
    width: 1.5rem;
    height: 1.5rem;
    flex-shrink: 0;
  }

  &:hover {
    background-color: #f0f9ff;
  }
`;

const DeleteButton = styled(EditButton)`
  color: #b91c1c;
`;

const Divider = styled.div`
  background-color: #dcdcdc;
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
