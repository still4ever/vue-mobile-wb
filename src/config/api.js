export const address = {
    setDef: `/api/address/setAddressDefault`,
    save: `/api/address/saveAddress`,
    list: `/api/address/getAddressList`,
    delete: `/api/address/deleteAddress`
};

export const integral = {
    home: `/api/integral/getIntegralHomePage`,
    record: `/api/integral/getIntegralRecord`,
    cashRecord: `/api/integral/getCashRecord`,
    cashInfo: `/api/integral/getCashPageInfo`,
    cash: `/api/integral/confirmCash`
};

export const user = {
    login: `/api/user/loginByPhone`,
    code: `/api/user/getVerificationCode`,
    token: `/api/user/getToken`,
    info: `/api/user/getUserHomePage`,
    nickName: `/api/user/updateNickName`,
    upload: `/api/user/uploadAvatar`,
    saveBaseInfo: `/api/user/saveBaseInfo`
};

export const goods = {
    home: `/api/commodity/getHomepage`,
    list: `/api/commodity/getCommodityList`,
    detail: `/api/commodity/getCommodity`
};

export const cart = {
    list: `/api/shoppingCart/getCartList`,
    delete: `/api/shoppingCart/delteCart`,
    addCart: `/api/shoppingCart/addCommodityToCart`,
    add: `/api/shoppingCart/addNumberToCart`,
    number: `/api/shoppingCart/getShoppingCartNumber`,
    subtract: `/api/shoppingCart/reduceNumberFromCart`
};

export const order = {
    buynow: `/api/order/submitOrder`,
    pay: `/api/order/payOrder`,
    repay: `/api/order/rePayOrder`,
    integral: `/api/order/getIntegralByInvitCode`,
    list: `/api/order/getOrderByState`,
    cancel: `/api/order/cancelOrder`,
    delete: `/api/order/deleteOrder`,
    success: `/api/order/successPayOrder`,
    express: `/api/express/getExpressInfo`
};

export const partner = {
    partnerRank: `/api/partner/getPartnerRank`,
    creatorOrder: `/api/partner/beforeCreatorOrder`,
    submitOrder: `/api/partner/submitOrder`,
    getUserAmountList: `/api/partner/getUserAmountList`,
    getRechargeRecord: `/api/partner/getRechargeRecord`,
    getUserAmountRecord: `/api/partner/getUserAmountRecord`,
    getUserAmountRecordDetail: `/api/partner/getUserAmountRecordDetail`,
    getUserInvalidAmounRecord: `/api/partner/getUserInvalidAmounRecord`,
    beforeCreatorOrder: `/api/partner/beforeCreatorOrder`
};

export const backCard = {
    getBanks: `/api/bank/getBanks`,
    addUserBank: `/api/bank/addUserBank`,
    deleteUserBank: `/api/bank/deleteUserBank`,
    getUserBankList: `/api/bank/getUserBankList`,
    getPassword: `/api/user/getPassword`,
    addPassword: `/api/user/addPassword`,
    retrieveUserPassword: `/api/user/retrieveUserPassword`
};

export const aliPaySetting = {
    getUserAplipayList: `/api/alipay/getUserAplipayList`,
    addUserAipay: `/api/alipay/addUserAipay`,
    deleteUserAlipay: `/api/alipay/deleteUserAlipay`,
    updatePassword: `/api/user/updatePassword`,
    getPassword: `/api/user/getPassword`,
    addPassword: `/api/user/addPassword`,
    checkUserPayPassword: `/api/user/checkUserPayPassword`
};
