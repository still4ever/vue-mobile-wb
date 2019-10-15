import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      meta: { title: "商品首页" },
      component: () => import("./views/Home.vue")
    },
    {
      path: "/home",
      name: "home",
      meta: { title: "商品首页" },
      component: () => import("./views/Home.vue")
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/goods/list",
      name: "goodsList",
      meta: { title: "商品列表" },
      component: () => import("./views/goods/List.vue")
    },
    {
      path: "/goods/detail",
      name: "goodsDetail",
      meta: { title: "商品详情" },
      component: () => import("./views/goods/Detail.vue")
    },
    {
      path: "/goods/cart",
      name: "cart",
      meta: { title: "购物车" },
      component: () => import("./views/goods/Cart.vue")
    },
    {
      path: "/goods/settle",
      name: "goodsSettle",
      meta: { title: "结算" },
      component: () => import("./views/goods/Settle.vue")
    },
    {
      path: "/goods/pay/success",
      name: "paySuccess",
      meta: { title: "付款成功" },
      component: () => import("./views/goods/PaySuccess.vue")
    },
    {
      path: "/payCenter",
      name: "payCenter",
      meta: { title: "支付" },
      component: () => import("./views/payCenter.vue")
    },
    {
      path: "/user",
      name: "user",
      meta: { title: "个人中心" },
      component: () => import("./views/user/Index.vue")
    },
    {
      path: "/user/info",
      name: "userInfo",
      meta: { title: "编辑资料" },
      component: () => import("./views/user/info/Index.vue")
    },
    {
      path: "/user/edit/nickname",
      name: "editNickName",
      meta: { title: "修改昵称" },
      component: () => import("./views/user/info/EditName.vue")
    },
    {
      path: "/user/order",
      name: "userOrder",
      meta: { title: "我的订单" },
      component: () => import("./views/user/order/Order.vue")
    },
    {
      path: "/user/express",
      name: "userExpress",
      meta: { title: "查看物流" },
      component: () => import("./views/user/express/Express.vue")
    },
    {
      path: "/user/address",
      name: "userAddress",
      meta: { title: "收货地址" },
      component: () => import("./views/user/address/AddressList.vue")
    },
    {
      path: "/user/address/edit",
      name: "userAddressEdit",
      meta: { title: "编辑地址" },
      component: () => import("./views/user/address/AddressEdit.vue")
    },
    {
      path: "/user/address/add",
      name: "userAddressAdd",
      meta: { title: "新增地址" },
      component: () => import("./views/user/address/AddressEdit.vue")
    },
    {
      path: "/user/integral",
      name: "userIntegral",
      meta: { title: "我的积分" },
      component: () => import("./views/user/integral/Integral.vue")
    },
    {
      path: "/user/integral/list",
      name: "userIntegralList",
      meta: { title: "积分明细" },
      component: () => import("./views/user/integral/IntegralList.vue")
    },
    {
      path: "/user/integral/detail",
      name: "userIntegralDetail",
      meta: { title: "积分详情" },
      component: () => import("./views/user/integral/IntegralDetail.vue")
    },
    {
      path: "/user/integral/advance",
      name: "userIntegralAdvance",
      meta: { title: "积分提现" },
      component: () => import("./views/user/integral/IntegralAdvance.vue")
    },
    {
      path: "/user/integral/advance/record",
      name: "userIntegralAdvanceRecord",
      meta: { title: "提现记录" },
      component: () => import("./views/user/integral/IntegralAdvanceRecord.vue")
    },
    {
      path: "/user/integral/advance/flow",
      name: "userIntegralAdvanceFlow",
      meta: { title: "进度查询" },
      component: () => import("./views/user/integral/IntegralAdvanceFlow.vue")
    },
    {
      path: "/user/integral/advance/result",
      name: "userIntegralAdvanceResult",
      meta: { title: "提现结果" },
      component: () => import("./views/user/integral/IntegralAdvanceResult.vue")
    },
    {
      path: "/user/faq",
      name: "userFaq",
      meta: { title: "常见问题" },
      component: () => import("./views/user/faq/FAQ.vue")
    },
    {
      path: "/user/faq/detail",
      name: "userFaqDetail",
      meta: { title: "问题详情" },
      component: () => import("./views/user/faq/FaqDetail.vue")
    },
    {
      path: "/user/bankCard/setPaw",
      name: "userSetPaymentPaw",
      meta: { title: "设置支付密码" },
      component: () => import("./views/user/BankCardSetPaw.vue")
    },
    {
      path: "/user/bankCard/confirm",
      name: "userConfirmPaymentPaw",
      meta: { title: "设置支付密码" },
      component: () => import("./views/user/BankCardConfirmPaw.vue")
    },
    {
      path: "/user/bankCard/addBankCrad",
      name: "userAddBankCrad",
      meta: { title: "添加银行卡" },
      component: () => import("./views/user/AddBankCard.vue")
    },
    {
      path: "/user/bankCard/submitBankCrad",
      name: "userSubmitBankCrad",
      meta: { title: "添加银行卡" },
      component: () => import("./views/user/SubmitBankCard.vue")
    },
    {
      path: "/user/bankCard/MyBankCrad",
      name: "userMyBankCrad",
      meta: { title: "我的银行卡" },
      component: () => import("./views/user/MyBankCard.vue")
    },
    {
      path: "/user/bankCard/BankCardDetail",
      name: "userBankCardDetail",
      meta: { title: "我的银行卡" },
      component: () => import("./views/user/BankCardDetail.vue")
    },
    {
      path: "/user/bankCard/userserviceprotocol",
      name: "userserviceprotocol",
      meta: { title: "用户服务协议" },
      component: () => import("./views/user/UserServiceProtocol.vue")
    },
    {
      path: "/user/bankCard/alipayserviceprotocol",
      name: "alipayserviceprotocol",
      meta: { title: "服务协议" },
      component: () => import("./views/user/AlipayServiceProtocol.vue")
    },
    {
      path: "/user/bankCard/unionpayserviceprotocol",
      name: "unionpayserviceprotocol",
      meta: { title: "服务协议" },
      component: () => import("./views/user/UnionpayServiceProtocol.vue")
    },
    {
      path: "/user/myalipay/addalipay",
      name: "addalipay",
      meta: { title: "添加支付宝" },
      component: () => import("./views/user/AddAlipay.vue")
    },
    {
      path: "/user/myalipay/bindalipay",
      name: "bindalipay",
      meta: { title: "添加支付宝" },
      component: () => import("./views/user/BindAlipay.vue")
    },
    {
      path: "/user/myalipay/completeAddAlipay",
      name: "completeAddAlipay",
      meta: { title: "我的支付宝" },
      component: () => import("./views/user/CompleteAddAlipay.vue")
    },
    {
      path: "/user/paymentSetting",
      name: "paymentSetting",
      meta: { title: "支付设置" },
      component: () => import("./views/user/PaymentSetting.vue")
    },
    {
      path: "/user/PaymentPwd",
      name: "PaymentPwd",
      meta: { title: "身份认证" },
      component: () => import("./views/user/PaymentPwd.vue")
    },
    {
      path: "/user/setNewPaymentPwd",
      name: "newPaymentPwd",
      meta: { title: "新支付密码" },
      component: () => import("./views/user/EditPaymentPwd.vue")
    },
    {
      path: "/user/comfirmEditPaymentPwd",
      name: "comfirmEditPaymentPwd",
      meta: { title: "新支付密码" },
      component: () => import("./views/user/ConfirmEditPwd.vue")
    },
    {
      path: "/user/editPhoneNumber",
      name: "editPhoneNumber",
      meta: { title: "验证手机号" },
      component: () => import("./views/user/EditPhoneNumber.vue")
    },
    {
      path: "/user/createpersonalinfo",
      name: "createpersonalinfo",
      meta: { title: "个人信息" },
      component: () => import("./views/user/CreatePersonalInfo.vue")
    },
    {
      path: "/user/personalinfo",
      name: "personalinfo",
      meta: { title: "个人信息" },
      component: () => import("./views/user/PersonalInfo.vue")
    },
    {
      path: "/user/editpersonalinfo",
      name: "editpersonalinfo",
      meta: { title: "个人信息" },
      component: () => import("./views/user/EditPersonalInfo.vue")
    },
    {
      path: "/partner",
      name: "partner",
      meta: { title: "合伙人" },
      component: () => import("./views/partner/Partner.vue")
    },
    {
      path: "/partner/settlement",
      name: "partnerSettlement",
      meta: { title: "结算" },
      component: () => import("./views/partner/Settlement.vue")
    },
    {
      path: "/partner/partnerQuota",
      name: "partner_quota",
      meta: { title: "合伙人额度" },
      component: () => import("./views/partner/PartnerQuota.vue")
    },
    {
      path: "/partner/quotaDetail",
      name: "quota_detail",
      meta: { title: "额度使用明细" },
      component: () => import("./views/partner/QuotaDetail.vue")
    },
    {
      path: "/partner/chargeRecord",
      name: "charge_record",
      meta: { title: "充值记录" },
      component: () => import("./views/partner/RechargeRecord.vue")
    },
    {
      path: "/partner/overdueQuota",
      name: "overdue_quota",
      meta: { title: "过期额度明细" },
      component: () => import("./views/partner/OverdueQuotaDetail.vue")
    },
    {
      path: "/partner/recordDetail",
      name: "record_detail",
      meta: { title: "充值明细" },
      component: () => import("./views/partner/RecordDetail.vue")
    },
    {
      path: "/partner/chargeback",
      name: "chargeback",
      meta: { title: "付款成功" },
      component: () => import("./views/partner/ChargeBack.vue")
    },
    {
      path: "/login",
      name: "login",
      meta: { title: "登录" },
      component: () => import("./views/Login.vue")
    }
  ]
});
