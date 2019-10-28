import http from "../../utils/http";
import { aliPaySetting } from "../../config/api";

export default {
    getUserAplipayList() {
        return http
            .get(aliPaySetting.getUserAplipayList)
            .then(response => response)
            .catch(err => err);
    },
    addUserAipay(params) {
        return http
            .post(aliPaySetting.addUserAipay, params)
            .then(response => response)
            .catch(err => err);
    },
    deleteUserAlipay(params) {
        return http
            .post(aliPaySetting.deleteUserAlipay, { params })
            .then(response => response)
            .catch(err => err);
    },
    updatePassword(params) {
        return http
            .get(aliPaySetting.updatePassword, { params })
            .then(response => response)
            .catch(err => err);
    },
    checkUserPayPassword(params) {
        return http
            .post(aliPaySetting.checkUserPayPassword, params)
            .then(response => response)
            .catch(err => err);
    },
    getPassword() {
        return http
            .get(aliPaySetting.getPassword)
            .then(response => response)
            .catch(err => err);
    },
    addPassword(params) {
        return http
            .post(aliPaySetting.addPassword, params)
            .then(response => response)
            .catch(err => err);
    }
};
