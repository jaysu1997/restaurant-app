import styled from "styled-components";
import { Image as EmptyImageIcon } from "lucide-react";

const StyledImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--space-3);

  background-color: var(--color-surface-subtle);
  color: var(--color-text-muted);
  border-radius: var(--radius-lg);
  user-select: none;

  svg {
    color: var(--color-text-placeholder);
    width: clamp(1.2rem, 40%, 3.2rem);
    height: clamp(1.2rem, 40%, 3.2rem);
  }
`;

const Text = styled.p`
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-muted);

  @media (max-width: 25em) {
    font-size: var(--font-size-xs);
  }
`;

function ImagePlaceholder({ text }) {
  return (
    <StyledImagePlaceholder role="img" aria-label="沒有圖片">
      <EmptyImageIcon strokeWidth={1.5} aria-hidden="true" />
      {text && <Text>{text}</Text>}
    </StyledImagePlaceholder>
  );
}

export default ImagePlaceholder;
