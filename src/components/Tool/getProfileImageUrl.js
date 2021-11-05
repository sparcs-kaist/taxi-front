// 사용자의 id가 주어졌을 때 프로필 사진의 url을 반환하는 함수

import axios from "./axios";
import backServer from "../../serverconf";

const getProfileImageUrl = async (id) => {
  return await axios.get(`/users/${id}/getProfileImgUrl`).then((res) => {
    const result = res.data;
    if (result) {
      return backServer + result.profileImageUrl;
    } else {
      return null;
    }
  });
};

export default getProfileImageUrl;
