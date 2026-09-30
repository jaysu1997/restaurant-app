import defaultAvatar from "../assets/default-user.png";
import Image from "./Image";

// 其實餐點的圖片應該也可以做成這樣，然後被重複使用
function UserAvatar({ avatarFile, lazy = false }) {
  const avatarURL = avatarFile
    ? `https://yaoivzqoyuqdmvxnxvwm.supabase.co/storage/v1/object/public/avatar/${avatarFile}`
    : defaultAvatar;

  return (
    <Image
      src={avatarURL}
      lazy={lazy}
      alt="user avatar"
      fallbackSrc={defaultAvatar}
      radius="50%"
    />
  );
}

export default UserAvatar;
