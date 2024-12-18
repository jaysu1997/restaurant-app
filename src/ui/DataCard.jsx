import styled from "styled-components";
import { TbEdit, TbTrashX } from "react-icons/tb";

const Card = styled.div`
  max-width: 40rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(5, auto);
  border-radius: 10px;
  overflow: hidden;
  border: none;
  outline: 1px solid #94a3b8;

  background-color: #f9fafb;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.15);
    outline: 2px solid #93c5fd;
  }
`;

const TableRow = styled.div`
  ${(props) => props.$twoColumns && "grid-column: 1 / -1;"}
  display: grid;
  grid-template-columns: min-content 1fr;
  white-space: nowrap;
  border-bottom: 1px solid #94a3b8;
`;

const TableHead = styled.div`
  background-color: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: start;
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
  background-color: #f9fafb;
  color: ${(props) => props.$fontColor};
  border: none;
  padding: 0.6rem 1.2rem;
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: 1px solid #94a3b8;

  &:hover {
    /* background-color: #e5e7eb; */
    background-color: #f0f9ff;
  }

  svg {
    width: 1.6rem;
    height: 1.6rem;
  }
`;

function DataCard({ handleEditButton, handleDeleteButton, dataFormat }) {
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

export default DataCard;
