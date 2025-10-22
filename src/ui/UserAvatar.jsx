import styled from "styled-components";
import defaultAvatar from "../assets/default-user.png";

const ImagePlaceHolder = styled.div`
  grid-row: 1 / -1;
  background-color: #f9fafb;
  width: auto;
  height: 100%;
  border-radius: 50%;
`;

const StyledUserAvatar = styled.img`
  display: block;
  width: auto;
  height: 100%;
  border-radius: 50%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  object-position: center;
`;

function UserAvatar({ avatarUrl }) {
  return (
    <ImagePlaceHolder>
      <StyledUserAvatar
        src={avatarUrl || ""}
        alt="User Avatar"
        onError={(e) => {
          // 防止預設圖檔錯誤後繼續循環加載預設圖檔
          e.currentTarget.onerror = null;
          e.currentTarget.src = defaultAvatar;
        }}
      />
    </ImagePlaceHolder>
  );
}

export default UserAvatar;
