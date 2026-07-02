// ok
// 用來展示數據的卡片ui
import styled from "styled-components";
import { Trash2, SquarePen } from "lucide-react";

const Card = styled.li`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #d1d5db;
  background-color: #fff;
  font-size: 1.4rem;
  font-weight: 500;
  transition: transform 0.2s ease;

  &:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
    transform: translateY(-1px);
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 4.5rem 1fr;
  border-bottom: 1px solid #d1d5db;
`;

const Label = styled.div`
  background-color: #e2e8f0;
  padding: 0.8rem;
  color: #475569;
`;

const Value = styled.div`
  padding: 0.8rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Footer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1px 1fr;
  background-color: #f8fafc;
`;

const EditButton = styled.button`
  color: #15803d;
  font-weight: 600;
  padding: 0.6rem 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  &:hover {
    background-color: #f0fdf4;
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
  height: 100%;
`;

function DataDisplayCard({ handleEditButton, handleDeleteButton, dataFormat }) {
  return (
    <Card>
      {dataFormat.map((data, index) => (
        <Row key={index}>
          <Label>{data.label}</Label>
          <Value>{data.value}</Value>
        </Row>
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
