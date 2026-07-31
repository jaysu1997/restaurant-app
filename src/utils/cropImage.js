// 確認輸入的參數是否完整且都合法
function hasValidCropArea(cropArea) {
  if (!cropArea) return false;

  return ["x", "y", "width", "height"].every((key) =>
    Number.isFinite(cropArea[key]),
  );
}

// 計算默認的裁切參數(保留中間部分，然後圖檔尺寸為300x300)
function getDefaultCropArea(imageBitmap) {
  const size = Math.min(imageBitmap.width, imageBitmap.height);

  return {
    x: (imageBitmap.width - size) / 2,
    y: (imageBitmap.height - size) / 2,
    width: size,
    height: size,
  };
}

// 使用 Canvas 將 File 指定區域裁切並輸出為 WebP Blob
export async function cropImage(file, cropArea) {
  const OUTPUT_SIZE = 300;
  let imageBitmap;

  try {
    // File -> ImageBitmap
    imageBitmap = await createImageBitmap(file);
    // 沒有輸入完整合格參數就改用默認參數裁切
    const area = hasValidCropArea(cropArea)
      ? cropArea
      : getDefaultCropArea(imageBitmap);

    const canvas = document.createElement("canvas");
    canvas.width = OUTPUT_SIZE;
    canvas.height = OUTPUT_SIZE;

    const ctx = canvas.getContext("2d");

    // 高品質縮放
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      imageBitmap,
      area.x,
      area.y,
      area.width,
      area.height,
      0,
      0,
      OUTPUT_SIZE,
      OUTPUT_SIZE,
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
