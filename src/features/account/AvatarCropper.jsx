import { useState } from "react";
import Modal from "../../components/modal/Modal";
import Cropper from "react-easy-crop";
import styled from "styled-components";
import Slider from "./Slider";
import useUpdateUserAvatar from "../../hooks/data/auth/useUpdateUserAvatar";
import showToast from "../../ui/showToast";
import FormActions from "../../components/FormActions";
import { ModalContainer, ModalFooter } from "../../components/modal/ModalBody";

const StyledAvatarCropper = styled(ModalContainer)`
  height: 36rem;
`;

const CropperWrapper = styled.div`
  position: relative;
  flex: 1;
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
  const [cropPosition, setCropPosition] = useState({ x: 0, y: 0 });
  const [croppedArea, setCroppedArea] = useState(null);
  const { updateUserAvatar, isUpdatingUserAvatar } = useUpdateUserAvatar();

  const onCropComplete = (_, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  async function handleSave() {
    try {
      if (!croppedArea) return;
      const blob = await getCroppedImg(imgUrl, croppedArea);

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
      showToast({ type: "error", title: "頭像裁切失敗" });
    }
  }

  return (
    <Modal title="選擇頭像範圍" onClose={onClose} maxWidth={56}>
      <StyledAvatarCropper>
        <CropperWrapper>
          <Cropper
            image={imgUrl}
            crop={cropPosition}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCropPosition}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            zoomWithScroll={false}
          />
        </CropperWrapper>

        <ModalFooter>
          <Slider min={1} max={3} zoom={zoom} setZoom={setZoom} />

          <FormActions
            onSubmit={handleSave}
            onCancel={onClose}
            isProcessing={isUpdatingUserAvatar}
            gap="1.2rem"
          />
        </ModalFooter>
      </StyledAvatarCropper>
    </Modal>
  );
}

export default AvatarCropper;
