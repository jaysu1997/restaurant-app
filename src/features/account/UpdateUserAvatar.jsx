import { useState } from "react";
import styled from "styled-components";
import AvatarCropper from "./AvatarCropper";
import UserAvatar from "../../ui/UserAvatar";
import SectionContainer from "../../ui/SectionContainer";
import Button from "../../ui/Button";
import { Upload } from "lucide-react";
import { AVATAR_URL } from "../../utils/constants";

const StyledUpdateUserAvatar = styled.div`
  display: grid;
  grid-template-columns: 9.6rem 1fr;
  grid-template-rows: auto auto;
  column-gap: 1.6rem;
  row-gap: 0.8rem;
  height: 9.6rem;

  & label {
    align-self: end;
  }
`;

function UpdateUserAvatar({ userData }) {
  const [imgUrl, setImgUrl] = useState(undefined);
  // 頭像圖檔來源
  const avatarFile = userData?.user_metadata?.avatarFile;
  const avatarUrl = `${AVATAR_URL}${avatarFile}`;

  function handleSelectFile(e) {
    // 確認有選擇圖檔
    const fileLength = e.target.files.length;

    // 如果記憶體中有舊的臨時url先清除(釋放空間)
    if (imgUrl) {
      URL.revokeObjectURL(imgUrl);
    }

    // 為剛剛上傳的圖檔建立一個臨時網址，用來預覽
    if (fileLength) {
      const url = URL.createObjectURL(e.target.files[0]);
      setImgUrl(url);
    }

    // 避免同檔案無法再觸發 onChange
    e.target.value = "";
  }

  function handleCloseModal() {
    URL.revokeObjectURL(imgUrl);
    setImgUrl(undefined);
  }

  return (
    <SectionContainer>
      <StyledUpdateUserAvatar>
        <UserAvatar avatarUrl={avatarUrl} />

        <Button
          $variant="tertiary"
          as="label"
          htmlFor="upload-avatar"
          role="avatarUploadButton"
        >
          <Upload />
          選擇新頭像
        </Button>

        <span>必須是 JPEG、PNG、GIF 檔。</span>
      </StyledUpdateUserAvatar>

      <input
        id="upload-avatar"
        name="avatar"
        type="file"
        accept="image/png, image/jpeg, image/webp"
        hidden
        onChange={(e) => handleSelectFile(e)}
      />

      {imgUrl && (
        <AvatarCropper
          userData={userData}
          imgUrl={imgUrl}
          onCloseModal={handleCloseModal}
        />
      )}
    </SectionContainer>
  );
}

export default UpdateUserAvatar;
