import http from "../../utils/http";
import { backCard } from "../../config/api";

export default {
  getBanks(params) {
    return http
      .get(backCard.banks, { params })
      .then(response => response)
      .catch(err => err);
  },
  addUserBank(params) {
    return http
      .post(backCard.addUserBank, params)
      .then(response => response)
      .catch(err => err);
  },
  deleteUserBank(params) {
    return http
      .post(backCard.deleteUserBank, params)
      .then(response => response)
      .catch(err => err);
  },
  getUserBankList(params) {
    return http
      .get(backCard.getUserBankList, { params })
      .then(response => response)
      .catch(err => err);
  },
  checkUserPayPassword(params) {
    return http
      .post(backCard.checkUserPayPassword, { params })
      .then(response => response)
      .catch(err => err);
  },
  getPassword() {
    return http
      .get(backCard.getPassword)
      .then(response => response)
      .catch(err => err);
  },
  addPassword(params) {
    return http
      .post(backCard.addPassword, params)
      .then(response => response)
      .catch(err => err);
  },
  retrieveUserPassword(params) {
    return http
      .get(backCard.retrieveUserPassword, { params })
      .then(response => response)
      .catch(err => err);
  }
};
