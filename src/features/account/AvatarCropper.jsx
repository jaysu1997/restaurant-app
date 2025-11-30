import { useState } from "react";
import Modal from "../../ui-old/Modal";
import Cropper from "react-easy-crop";
import styled from "styled-components";
import Slider from "./Slider";
import useUpsertUserAvatar from "../../hooks/data/auth/useUpsertUserAvatar";
import StyledHotToast from "../../ui-old/StyledHotToast";
import ButtonSubmit from "../../ui/ButtonSubmit";
import ButtonCancel from "../../ui/ButtonCancel";

const Wrapper = styled.section`
  width: min(56rem, 95dvw);
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1.5 / 1;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1.6rem;
  padding: 2rem;
`;

const ButtonGroup = styled.div`
  display: inline-flex;
  gap: 1.2rem;
`;

// 使用Canvas將裁切區域轉成Blob Url
const getCroppedImg = (imageSrc, pixelCrop) => {
  // 因為監聽圖片onload是非同步功能，所以使用Promise方便處理
  return new Promise((resolve, reject) => {
    // 裁切後固定輸出成512x512尺寸的圖檔
    const outputSize = 512;

    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = outputSize;
      canvas.height = outputSize;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        outputSize,
        outputSize
      );

      // 輸出成webp圖檔
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Crop failed"));
      }, "image/webp");
    };

    image.onerror = (err) => reject(err);
  });
};

// 頭像裁切元件
function AvatarCropper({ userData, imgUrl, onCloseModal }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const { mutate, isPending } = useUpsertUserAvatar();

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  async function handleSave() {
    try {
      if (!croppedAreaPixels) return;
      const blob = await getCroppedImg(imgUrl, croppedAreaPixels);

      // 更新需要用到的數據(新檔名、舊檔名、新圖檔)
      const updateAvatarPayload = {
        oldFileName: userData.user_metadata.avatar_file,
        newFileName: `${userData.id}_${Date.now()}.webp`,
        newFile: blob,
      };

      // 上傳新的圖檔並更新數據
      mutate(updateAvatarPayload, {
        onSuccess: () => {
          onCloseModal();
        },
      });
    } catch (err) {
      console.error("頭像裁切失敗", err);
      StyledHotToast({ type: "error", title: "頭像裁切失敗" });
    }
  }

  return (
    <Modal modalHeader="選擇頭像範圍" onCloseModal={onCloseModal}>
      <Wrapper>
        <Container>
          <Cropper
            image={imgUrl}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            zoomWithScroll={false}
          />
        </Container>
      </Wrapper>
      <Footer>
        <Slider min={1} max={3} zoom={zoom} setZoom={setZoom} />
        <ButtonGroup>
          <ButtonSubmit
            isLoading={isPending}
            disabled={isPending}
            onClick={handleSave}
          />
          <ButtonCancel onClick={onCloseModal} disabled={isPending} />
        </ButtonGroup>
      </Footer>
    </Modal>
  );
}

export default AvatarCropper;
