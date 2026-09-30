import styled from "styled-components";
import { Image as EmptyImageIcon } from "lucide-react";

const StyledImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;

  background-color: #f3f4f6;
  color: #6b7280;
  border-radius: 8px;
  user-select: none;

  svg {
    color: #9ca3af;
    width: clamp(1.2rem, 40%, 3.2rem);
    height: clamp(1.2rem, 40%, 3.2rem);
  }
`;

const Text = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  color: #6b7280;

  @media (max-width: 25em) {
    font-size: 1.2rem;
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
