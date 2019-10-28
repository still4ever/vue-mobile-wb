import http from "../../utils/http";
import { integral } from "../../config/api";

export default {
    getHomeData(params) {
        return http
            .get(integral.home, params)
            .then(response => response)
            .catch(err => err);
    },
    getRecord(params) {
        return http
            .get(integral.record, { params })
            .then(response => response)
            .catch(err => err);
    },
    getCashRecord(params) {
        return http
            .get(integral.cashRecord, { params })
            .then(response => response)
            .catch(err => err);
    },
    getCashData(params) {
        return http
            .get(integral.cashInfo, params)
            .then(response => response)
            .catch(err => err);
    },
    saveCash(params) {
        return http
            .post(integral.cash, params)
            .then(response => response)
            .catch(err => err);
    }
};
