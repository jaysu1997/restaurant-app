import { useState } from "react";
import Modal, {
  ModalContainer,
  ModalFooter,
} from "../../components/modal/Modal";
import Cropper from "react-easy-crop";
import styled from "styled-components";
import Slider from "./Slider";
import useUpdateUserAvatar from "../../hooks/data/auth/useUpdateUserAvatar";
import showToast from "../../utils/showToast";
import FormActions from "../../components/FormActions";
import { cropImage } from "../../utils/cropImage";

const CropperWrapper = styled.div`
  height: 32rem;
  position: relative;
`;

// 頭像預覽裁切元件
function AvatarCropper({ userData, selectedImage, onClose }) {
  const [zoom, setZoom] = useState(1);
  const [cropPosition, setCropPosition] = useState({ x: 0, y: 0 });
  const [croppedArea, setCroppedArea] = useState(null);
  const { updateUserAvatar, isUpdatingUserAvatar } = useUpdateUserAvatar();

  const { file, url } = selectedImage;

  const onCropComplete = (_, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  async function handleSave() {
    try {
      if (!croppedArea) return;
      const blob = await cropImage(file, croppedArea);

      // 更新需要用到的數據(新檔名、舊檔名、新圖檔)
      const updateAvatarPayload = {
        oldPath: userData.avatarFile,
        newPath: `${userData.id}_${Date.now()}.webp`,
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
      <ModalContainer>
        <CropperWrapper>
          <Cropper
            image={url}
            crop={cropPosition}
            zoom={zoom}
            minZoom={1}
            maxZoom={3}
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
      </ModalContainer>
    </Modal>
  );
}

export default AvatarCropper;
