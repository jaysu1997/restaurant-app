import { useState } from "react";
import styled from "styled-components";
import AvatarCropper from "./AvatarCropper";
import { MdUpload } from "react-icons/md";

const ChooseFile = styled.label`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 1.4rem;
  font-weight: 500;
  border: 1px solid #2563eb;
  color: #2563eb;
  width: fit-content;
  height: 3.8rem;
  padding: 0.8rem 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;

  &:hover {
    background-color: #eff6ff;
  }
`;

function UpdateUserAvatar({ userData }) {
  const [imgUrl, setImgUrl] = useState(undefined);

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
    <>
      <ChooseFile htmlFor="avatar">
        <MdUpload size={19} />
        選擇新頭像
      </ChooseFile>

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
    </>
  );
}

export default UpdateUserAvatar;
