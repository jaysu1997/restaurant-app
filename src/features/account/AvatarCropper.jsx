import { useState } from "react";
import Modal from "../../ui/Modal";
import Cropper from "react-easy-crop";
import styled from "styled-components";
import Slider from "./Slider";
import useUpdateUserAvatar from "../../hooks/data/auth/useUpdateUserAvatar";
import StyledHotToast from "../../ui/StyledHotToast";
import ButtonSubmit from "../../ui/ButtonSubmit";
import ButtonCancel from "../../ui/ButtonCancel";

const StyledAvatarCropper = styled.section`
  width: min(56rem, 95dvw);
  max-height: calc(90dvh - 5.6rem);
  display: flex;
  flex-direction: column;
`;

const CropperContainer = styled.div`
  width: 100%;
  height: 28rem;
`;

const CropperWrapper = styled.div`
  position: relative;
  height: 100%;
`;

const CropperFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.6rem;
  padding: 2rem;
  height: 7.9rem;
`;

const ButtonGroup = styled.div`
  display: inline-flex;
  gap: 1.2rem;
`;

// 使用canvas將裁切區域轉成Blob Url
const getCroppedImg = (imageSrc, pixelCrop) => {
  // 因為監聽圖片onload是非同步功能，所以使用Promise處理比較方便
  return new Promise((resolve, reject) => {
    // 固定裁切成300x300的圖檔輸出
    const outputSize = 300;

    const image = new Image();
    image.src = imageSrc;

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = outputSize;
      canvas.height = outputSize;
      const ctx = canvas.getContext("2d");

      // 高品質縮放
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        outputSize,
        outputSize,
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

// 頭像預覽裁切元件
function AvatarCropper({ userData, imgUrl, onClose }) {
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const { updateUserAvatar, isUpdatingUserAvatar } = useUpdateUserAvatar();

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  async function handleSave() {
    try {
      if (!croppedAreaPixels) return;
      const blob = await getCroppedImg(imgUrl, croppedAreaPixels);

      // 更新需要用到的數據(新檔名、舊檔名、新圖檔)
      const updateAvatarPayload = {
        oldFileName: userData.user_metadata.avatarFile,
        newFileName: `${userData.id}_${Date.now()}.webp`,
        newFile: blob,
      };

      // 上傳新的圖檔並更新數據
      updateUserAvatar(updateAvatarPayload, {
        onSuccess: () => onClose(),
      });
    } catch (err) {
      console.error("頭像裁切失敗", err);
      StyledHotToast({ type: "error", title: "頭像裁切失敗" });
    }
  }

  return (
    <Modal
      modalHeader="選擇頭像範圍"
      onClose={onClose}
      scrollBar={false}
      maxWidth={56}
    >
      <StyledAvatarCropper>
        <CropperContainer>
          <CropperWrapper>
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
          </CropperWrapper>
        </CropperContainer>

        <CropperFooter>
          <Slider min={1} max={3} zoom={zoom} setZoom={setZoom} />
          <ButtonGroup>
            <ButtonSubmit
              isProcessing={isUpdatingUserAvatar}
              disabled={isUpdatingUserAvatar}
              onClick={handleSave}
            />
            <ButtonCancel onClick={onClose} disabled={isUpdatingUserAvatar} />
          </ButtonGroup>
        </CropperFooter>
      </StyledAvatarCropper>
    </Modal>
  );
}

export default AvatarCropper;
