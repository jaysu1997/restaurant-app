import styled, { css } from "styled-components";
import { Trash2, Upload } from "lucide-react";
import Button from "./button/Button";
import { hoverStyles } from "../style/helpers";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;

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
  color: #6b7280;
  font-size: 1.4rem;

  strong {
    color: #374151;
    font-weight: 600;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 1.2rem;

  @media (max-width: 25em) {
    justify-content: center;
  }
`;

const UploadTrigger = styled.label`
  width: fit-content;
`;

const RemoveButton = styled(Button).attrs({ $variant: "ghost" })`
  width: 4rem;
  height: 4rem;
  color: #dc2626;

  ${hoverStyles(css`
    background-color: #fef2f2;
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

            <input
              hidden
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={onChange}
            />
          </UploadTrigger>

          {hasImage && onClear && (
            <RemoveButton
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
