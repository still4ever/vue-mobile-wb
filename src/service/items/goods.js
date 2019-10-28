import http from "../../utils/http";
import { goods } from "../../config/api";

export default {
    getHomeDetail(params) {
        return http
            .get(goods.home, { params })
            .then(response => response)
            .catch(err => err);
    },
    getGoodsList(params) {
        return http
            .get(goods.list, { params })
            .then(response => response)
            .catch(err => err);
    },
    getGoodsDetail(params) {
        return http
            .get(goods.detail, { params })
            .then(response => response)
            .catch(err => err);
    }
};
