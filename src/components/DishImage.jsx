import { getStoragePublicUrl } from "../services/supabase";
import Image from "./Image";

function DishImage({ image, alt }) {
  const imagePath = image ? getStoragePublicUrl("menu", image) : null;

  return <Image src={imagePath} lazy alt={alt} radius="8px" />;
}

export default DishImage;
