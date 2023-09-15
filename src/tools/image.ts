import imageCompression from "browser-image-compression";
import heic2any from "heic2any";

export const convertImage = async (image?: File) => {
  try {
    if (!image) return null;
    if (/^image\/heic$/i.test(image.type)) {
      image = (await heic2any({ blob: image, toType: "image/jpg" })) as File;
    }
    const imageAfter = await imageCompression(image, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1000,
      maxIteration: 30,
    });
    return imageAfter;
  } catch (e) {
    return null;
  }
};

export const getImageSrc = (file: File) =>
  new Promise<Nullable<string>>((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result;
      if (typeof src !== "string") resolve(null);
      else resolve(src);
    };
    reader.readAsDataURL(file);
  });
