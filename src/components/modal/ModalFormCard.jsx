import styled, { css } from "styled-components";
import { Trash2 } from "lucide-react";
import IconButton from "../button/IconButton";

const Card = styled.div`
  display: grid;
  grid-template-columns: ${({ $columns }) => `repeat(${$columns}, 1fr)`};
  column-gap: 2.4rem;
  row-gap: 1.6rem;

  ${({ $compact }) =>
    !$compact &&
    css`
      padding: 2rem;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      background: #fafafa;
    `}

  @media (max-width: 35em) {
    grid-template-columns: 1fr;
  }
`;

const Header = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${({ $compact }) =>
    !$compact &&
    css`
      padding-bottom: 0.8rem;
      border-bottom: 1px dashed #e5e7eb;
    `}
`;

const Title = styled.h4`
  ${({ $compact }) =>
    $compact
      ? css`
          font-size: 1.4rem;
          font-weight: 600;
          color: #374151;
        `
      : css`
          font-size: 1.8rem;
          font-weight: 600;
          color: #111827;
        `}
`;

const DeleteButton = styled(IconButton)`
  &:hover {
    color: #dc2626;
  }
`;

function ModalFormCard({
  columns = 1,
  compact = false,
  title,
  onDelete,
  children,
}) {
  return (
    <Card $columns={columns} $compact={compact}>
      {title && (
        <Header $compact={compact}>
          <Title as={compact ? "h5" : "h4"} $compact={compact}>
            {title}
          </Title>

          {onDelete && (
            <DeleteButton $variant="ghost" onClick={onDelete}>
              <Trash2 size={18} />
            </DeleteButton>
          )}
        </Header>
      )}

      {children}
    </Card>
  );
}

export default ModalFormCard;
