import ModalFormSection from "../../../components/modal/ModalFormSection";
import Image from "../../../components/Image";
import ImageUploadPanel from "../../../components/ImageUploadPanel";
import { useFormContext } from "react-hook-form";
import { cropImage } from "../../../utils/cropImage";
import { useEffect, useState } from "react";
import ImagePlaceholder from "../../../components/ImagePlaceholder";

function ImageSection() {
  const { setValue, getValues } = useFormContext();
  const image = getValues("image");
  const imagePath = image
    ? `https://yaoivzqoyuqdmvxnxvwm.supabase.co/storage/v1/object/public/menu/${image}`
    : null;

  const [imageURL, setImageURL] = useState(imagePath);

  useEffect(() => {
    return () => {
      // 清除臨時url
      if (imageURL?.startsWith("blob:")) {
        URL.revokeObjectURL(imageURL);
      }
    };
  }, [imageURL]);

  async function handleUploadFile(e) {
    // 確認有選擇圖檔
    const file = e.target.files?.[0];
    if (!file) return;

    const croppedImage = await cropImage(file);

    setImageURL(URL.createObjectURL(croppedImage));
    setValue("selectedImage", croppedImage);
    // 避免同檔案無法再觸發 onChange
    e.target.value = "";
  }

  function handleClear() {
    setImageURL(null);
    setValue("selectedImage", null);
  }

  return (
    <ModalFormSection columns={1} title="餐點照片" required={false}>
      <ImageUploadPanel
        hasImage={Boolean(imageURL)}
        buttonText={imageURL ? "更換圖片" : "上傳圖片"}
        onChange={handleUploadFile}
        onClear={handleClear}
      >
        {imageURL ? (
          <Image src={imageURL} radius="8px" alt="dish img" />
        ) : (
          <ImagePlaceholder text="尚未上傳圖片" />
        )}
      </ImageUploadPanel>
    </ModalFormSection>
  );
}

export default ImageSection;
