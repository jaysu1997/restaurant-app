import AvatarCropper from "./AvatarCropper";
import UserAvatar from "../../components/UserAvatar";
import SectionContainer from "../../components/SectionContainer";
import ImageUploadPanel from "../../components/ImageUploadPanel";
import { useState } from "react";

function UpdateUserAvatar({ userData }) {
  const [selectedImage, setSelectedImage] = useState(null);

  // 頭像圖檔來源
  const avatarFile = userData.avatarFile;

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (selectedImage) {
      URL.revokeObjectURL(selectedImage.url);
    }

    const url = URL.createObjectURL(file);

    setSelectedImage({ file, url });

    // 避免同檔案無法再觸發 onChange
    e.target.value = "";
  }

  function clearSelectedImage() {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage.url);
    }

    setSelectedImage(null);
  }

  return (
    <>
      <SectionContainer>
        <ImageUploadPanel
          avatarFile={avatarFile}
          buttonText={avatarFile ? "更換頭像" : "上傳頭像"}
          onChange={handleFileChange}
        >
          <UserAvatar avatarFile={avatarFile} lazy={false} />
        </ImageUploadPanel>
      </SectionContainer>

      {selectedImage && (
        <AvatarCropper
          userData={userData}
          selectedImage={selectedImage}
          onClose={clearSelectedImage}
        />
      )}
    </>
  );
}

export default UpdateUserAvatar;
