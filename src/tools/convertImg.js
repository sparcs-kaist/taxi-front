import heic2any from "heic2any";

const convertImg = async (imgOri) => {
  try {
    if (!imgOri) return null;
    if (/^image\/heic$/i.test(imgOri.type)) {
      imgOri = await heic2any({ blob: imgOri, toType: "image/jpg" });
    }
    return imgOri;
  } catch (e) {
    // FIXME
    return null;
  }
};

export default convertImg;
