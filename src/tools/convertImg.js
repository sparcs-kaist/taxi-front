import heic2any from "heic2any";
import imageCompression from "browser-image-compression";

const convertImg = async (image) => {
  try {
    if (!image) return null;
    if (/^image\/heic$/i.test(image.type)) {
      image = await heic2any({ blob: image, toType: "image/jpg" });
    }
    const imageAfter = await imageCompression(image, {
      maxSizeMb: 1,
      maxWidthOrHeight: 1000,
      maxIteration: 30,
    });
    return imageAfter;
  } catch (e) {
    // FIXME
    return null;
  }
};

export default convertImg;
