// ok
// 用來展示數據的卡片ui
import styled, { css } from "styled-components";
import { Trash2, SquarePen } from "lucide-react";
import { hoverStyles, insetFocusVisible } from "../style/helpers";

const Card = styled.li`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--color-border-strong);
  background-color: var(--color-surface);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  transition: transform 0.2s ease;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 4.5rem 1fr;
  border-bottom: 1px solid var(--color-border-strong);
`;

const Label = styled.div`
  background-color: var(--color-border-slate);
  padding: var(--space-2);
  color: var(--color-text-slate);
`;

const Value = styled.div`
  padding: var(--space-2);
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
  color: var(--color-text-muted);
  font-weight: var(--font-weight-semibold);
  padding: var(--space-1-5) var(--space-3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  border-radius: 0px 0px 0px var(--radius-md);

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  ${hoverStyles(css`
    color: var(--color-info);
  `)}

  &:focus-visible {
    ${insetFocusVisible}
  }
`;

const DeleteButton = styled(EditButton)`
  color: var(--color-danger-text);
  border-radius: 0px 0px var(--radius-md) 0px;

  ${hoverStyles(css`
    color: var(--color-danger);
  `)}
`;

const Divider = styled.div`
  background-color: var(--color-border-strong);
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
        <EditButton type="button" onClick={handleEditButton}>
          <SquarePen />
          <span>編輯</span>
        </EditButton>
        <Divider />
        <DeleteButton type="button" onClick={handleDeleteButton}>
          <Trash2 />
          <span>刪除</span>
        </DeleteButton>
      </Footer>
    </Card>
  );
}

export default DataDisplayCard;
