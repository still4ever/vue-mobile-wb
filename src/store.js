import Vue from "vue";
import Vuex from "vuex";
import { UserService } from "./service/index";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        userInfo: {},
        integralDetail: {},
        integral: {},
        order: {},
        bankList: [],
        alipayList: [],
        payData: ""
    },
    mutations: {
        updateUserInfo(state, data) {
            state.userInfo = data;
        },
        updateIntegralDetail(state, data) {
            state.integralDetail = data;
        },
        updateIntegral(state, data) {
            state.integral = data;
        },
        updateBankList(state, data) {
            state.bankList = data;
        },
        updateAlipayList(state, data) {
            state.alipayList = data;
        },
        updateOrder(state, data) {
            state.order = data;
        },
        updatePayData(state, data) {
            state.payData = data;
        },
        updateAddress(state, data) {
            state.order.address = data;
        }
    },
    actions: {
        async setUserInfo({ commit }) {
            const { data } = await UserService.getUserInfo();
            const { order, user } = data;
            commit("updateUserInfo", user);
            return order;
        },
        setIntegralDetail({ commit }, data) {
            commit("updateIntegralDetail", data);
        },
        setIntegral({ commit }, data) {
            commit("updateIntegral", data);
        },
        setBankList({ commit }, data) {
            commit("updateBankList", data);
        },
        setAlipayList({ commit }, data) {
            commit("updateAlipayList", data);
        },
        setOrder({ commit }, data) {
            commit("updateOrder", data);
        },
        setOrderAddress({ commit }, data) {
            commit("updateAddress", data);
        },
        setPayData({ commit }, data) {
            commit("updatePayData", data);
        }
    }
});

export default store;