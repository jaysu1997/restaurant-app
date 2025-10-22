import { useState } from "react";
import styled from "styled-components";
import AvatarCropper from "./AvatarCropper";
import { MdUpload } from "react-icons/md";
import UserAvatar from "../../ui/UserAvatar";
import SectionContainer from "../../ui/SectionContainer";
import ButtonAdd from "../../ui/ButtonAdd";

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

  const avatarFile = userData?.user_metadata?.avatar_file;
  const avatarUrl = `https://yaoivzqoyuqdmvxnxvwm.supabase.co/storage/v1/object/public/avatar/${avatarFile}`;

  function handleSelectFile(e) {
    const fileLength = e.target.files.length;

    if (imgUrl) {
      URL.revokeObjectURL(imgUrl);
    }

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

        <ButtonAdd as="label" htmlFor="avatar" role="avatarUploadButton">
          <MdUpload size={19} />
          選擇新頭像
        </ButtonAdd>

        <span>必須是 JPEG、PNG、GIF 檔。</span>
      </StyledUpdateUserAvatar>

      <input
        id="avatar"
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
