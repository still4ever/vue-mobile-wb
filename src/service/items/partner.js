import http from "../../utils/http";
import { partner } from "../../config/api";

export default {
    getPartnerRank(params) {
        return http
            .get(partner.partnerRank, { params })
            .then(response => response)
            .catch(err => err);
    },
    creatorOrder(params) {
        return http
            .get(partner.creatorOrder, params)
            .then(response => response)
            .catch(err => err);
    },
    submitOrder(params) {
        return http
            .post(partner.submitOrder, params)
            .then(response => response)
            .catch(err => err);
    },
    getUserAmountList() {
        return http
            .get(partner.getUserAmountList)
            .then(response => response)
            .catch(err => err);
    },
    getRechargeRecord() {
        return http
            .get(partner.getRechargeRecord)
            .then(response => response)
            .catch(err => err);
    },
    getUserAmountRecord(params) {
        return http
            .get(partner.getUserAmountRecord, { params })
            .then(response => response)
            .catch(err => err);
    },
    getUserAmountRecordDetail(params) {
        return http
            .get(partner.getUserAmountRecordDetail, { params })
            .then(response => response)
            .catch(err => err);
    },
    getUserInvalidAmounRecord(params) {
        return http
            .get(partner.getUserInvalidAmounRecord, { params })
            .then(response => response)
            .catch(err => err);
    },
    beforeCreatorOrder(params) {
        return http
            .get(partner.beforeCreatorOrder, { params })
            .then(response => response)
            .catch(err => err);
    }
};
