import styled, { css } from "styled-components";
import { Trash2, Upload } from "lucide-react";
import Button from "./button/Button";
import { focusRingStyles, hoverStyles } from "../style/helpers";
import VisuallyHiddenInput from "./VisuallyHiddenInput";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-6);

  @media (max-width: 25em) {
    flex-direction: column;
  }
`;

const Preview = styled.div`
  flex-shrink: 0;
  height: 15rem;
  width: 15rem;

  @media (max-width: 30em) {
    height: 10rem;
    width: 10rem;
  }
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.8rem;
`;

const Description = styled.p`
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);

  strong {
    color: var(--color-text-secondary);
    font-weight: var(--font-weight-semibold);
  }
`;

const Actions = styled.div`
  display: flex;
  gap: var(--space-3);

  @media (max-width: 25em) {
    justify-content: center;
  }
`;

const UploadTrigger = styled.label`
  width: fit-content;
  position: relative;
  border-radius: 999px;

  &:has(input:focus-visible) {
    ${focusRingStyles}
  }
`;

const RemoveButton = styled(Button)`
  width: 4rem;
  height: 4rem;
  color: var(--color-danger);

  ${hoverStyles(css`
    background-color: var(--color-danger-subtle);
  `)}

  svg {
    width: 2rem;
    height: 2rem;
  }
`;

function ImageUploadPanel({
  children,
  hasImage,
  buttonText = "上傳圖片",
  onChange,
  onClear,
}) {
  return (
    <Container>
      <Preview>{children}</Preview>

      <Content>
        <Description>
          建議上傳 <strong>300 × 300 px</strong> 以上的圖片， 支援{" "}
          <strong>JPG、PNG 或 WebP</strong> 格式。
        </Description>

        <Actions>
          <UploadTrigger>
            <Button as="span" $variant="secondary">
              <Upload />
              {buttonText}
            </Button>

            <VisuallyHiddenInput
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={onChange}
            />
          </UploadTrigger>

          {hasImage && onClear && (
            <RemoveButton
              $variant="ghost"
              onClick={onClear}
              aria-label="移除圖片"
              title="移除圖片"
            >
              <Trash2 />
            </RemoveButton>
          )}
        </Actions>
      </Content>
    </Container>
  );
}

export default ImageUploadPanel;
