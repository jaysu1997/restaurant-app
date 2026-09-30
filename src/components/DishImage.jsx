import Image from "./Image";

function DishImage({ image, alt }) {
  const imagePath = image
    ? `https://yaoivzqoyuqdmvxnxvwm.supabase.co/storage/v1/object/public/menu/${image}`
    : null;

  return <Image src={imagePath} lazy alt={alt} radius="8px" />;
}

export default DishImage;
