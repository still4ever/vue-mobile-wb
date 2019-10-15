<template>
  <div class="userServiceProtocol">
    <cell title="支付服务协议" is-link to="/user/bankCard/alipayserviceprotocol" />
    <cell title="支付银联二维码服务协议" is-link to="/user/bankCard/unionpayserviceprotocol" />
  </div>
</template>
<script>
  import { CellGroup, Cell } from "vant";
  export default {
    components: {
      CellGroup,
      Cell,
    }
  };
</script>
<style lang="less">
  .userServiceProtocol {
    padding-top: 12px;
  }
</style>
