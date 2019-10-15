import http from "../../utils/http";
import { address } from "../../config/api";

export default {
  saveAddress(params) {
    return http
      .post(address.save, params)
      .then(response => response)
      .catch(err => err);
  },
  setDefAddress(params) {
    return http
      .post(address.setDef, params)
      .then(response => response)
      .catch(err => err);
  },
  getAddressList(params) {
    return http
      .get(address.list, params)
      .then(response => response)
      .catch(err => err);
  },
  deleteAddress(params) {
    return http
      .post(address.delete, params)
      .then(response => response)
      .catch(err => err);
  }
};
