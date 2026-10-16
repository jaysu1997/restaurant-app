function hasValidCropArea(cropArea) {
  if (!cropArea) return false;

  return ["x", "y", "width", "height"].every((key) =>
    Number.isFinite(cropArea[key]),
  );
}

function getDefaultCropArea(imageBitmap) {
  const size = Math.min(imageBitmap.width, imageBitmap.height);

  return {
    x: (imageBitmap.width - size) / 2,
    y: (imageBitmap.height - size) / 2,
    width: size,
    height: size,
  };
}

export async function cropImage(file, cropArea) {
  const outputSize = 300;
  let imageBitmap;

  try {
    imageBitmap = await createImageBitmap(file);
    const area = hasValidCropArea(cropArea)
      ? cropArea
      : getDefaultCropArea(imageBitmap);

    const canvas = document.createElement("canvas");
    canvas.width = outputSize;
    canvas.height = outputSize;

    const context = canvas.getContext("2d");
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(
      imageBitmap,
      area.x,
      area.y,
      area.width,
      area.height,
      0,
      0,
      outputSize,
      outputSize,
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("圖片 Blob 建立失敗"));
      }, "image/webp");
    });
  } catch (error) {
    console.error(error);
    throw new Error("圖片處理失敗");
  } finally {
    imageBitmap?.close();
  }
}
