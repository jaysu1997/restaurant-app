import defaultAvatar from "../assets/default-user.png";
import Image from "./Image";

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
