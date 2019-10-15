<template>
  <div class="FAQ">
    <cell title="是什么事积分？" is-link to="/user/faq/detail" />
    <cell title="如何成为合伙人？" is-link to="/user/faq/detail" />
    <cell title="如何提现？" is-link to="/user/faq/detail" />
    <cell title="如何添加银行卡？" is-link to="/user/faq/detail" />
    <cell title="如何删除银行卡？" is-link to="/user/faq/detail" />
    <cell title="钱包的好功能" is-link to="/user/faq/detail" />
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
  .FAQ {
    padding-top: 12px;
  }
</style>
