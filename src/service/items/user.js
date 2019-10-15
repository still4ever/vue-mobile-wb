import http from "../../utils/http";
import { user } from "../../config/api";

export default {
  login(params) {
    return http
      .post(user.login, params)
      .then(response => response)
      .catch(err => err);
  },
  updateNickName(params) {
    return http
      .post(user.nickName, params)
      .then(response => response)
      .catch(err => err);
  },
  upload(params) {
    let form = new FormData();
    form.set("fileName", params.file);
    return http
      .post(user.upload, form, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => response)
      .catch(err => err);
  },
  getCode(params) {
    return http
      .get(user.code, { params })
      .then(response => response)
      .catch(err => err);
  },
  getToken(params) {
    return http
      .get(user.token, { params })
      .then(response => response)
      .catch(err => err);
  },
  getUserInfo(params) {
    return http
      .get(user.info, { params })
      .then(response => response)
      .catch(err => err);
  },
  saveBaseInfo(params) {
    return http
      .post(user.saveBaseInfo, params)
      .then(response => response)
      .catch(err => err);
  }
};
