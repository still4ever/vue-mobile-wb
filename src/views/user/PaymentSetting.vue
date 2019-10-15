<template>
  <div class="paymentSetting">
    <cell title="修改支付密码" is-link to="/user/setNewPaymentPwd" />
    <cell title="找回支付密码" is-link to="/user/editPhoneNumber" />
  </div>
</template>
<script>
import { CellGroup, Cell } from "vant";
export default {
  components: {
    CellGroup,
    Cell
  }
};
</script>
<style lang="less">
.paymentSetting {
  padding-top: 12px;
}
</style>
