export const orderStatusMap = {
  10: "待付款",
  20: "付款成功",
  30: "支付失败",
  120: "运送中",
  140: "已收货"
};

export function isLogin() {
  return !!localStorage.getItem("token");
}
