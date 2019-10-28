import http from "../../utils/http";
import { order } from "../../config/api";

export default {
    buyNow(params) {
        return http
            .post(order.buynow, params)
            .then(response => response)
            .catch(err => err);
    },
    payOrder(params) {
        return http
            .post(order.pay, params)
            .then(response => response)
            .catch(err => err);
    },
    repayOrder(params) {
        return http
            .post(order.repay, params)
            .then(response => response)
            .catch(err => err);
    },
    cancelOrder(params) {
        return http
            .post(order.cancel, params)
            .then(response => response)
            .catch(err => err);
    },
    deleteOrder(params) {
        return http
            .post(order.delete, params)
            .then(response => response)
            .catch(err => err);
    },
    getList(params) {
        return http
            .get(order.list, { params })
            .then(response => response)
            .catch(err => err);
    },
    getIntegralByInvitCode(params) {
        return http
            .get(order.integral, { params })
            .then(response => response)
            .catch(err => err);
    },
    getExpress(params) {
        return http
            .get(order.express, { params })
            .then(response => response)
            .catch(err => err);
    },
    getSuccessPayOrder(params) {
        return http
            .get(order.success, { params })
            .then(response => response)
            .catch(err => err);
    }
};
