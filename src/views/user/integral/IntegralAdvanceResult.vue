<template>
  <section class="integral-advance-result">
    <article class="content">
      <div class="top">
        <img src="../../../assets/img/success.png" class="img" alt="" />
        <div class="txt">提现成功，等待银行处理</div>
        <div class="tip">预计2小时内到账</div>
      </div>
      <div class="bottom">
        <div class="item">
          <span class="label">提现金额</span><span> ¥{{ money }}</span>
        </div>
        <div class="item">
          <span class="label">提现方式</span><span>{{ record }}</span>
        </div>
      </div>
    </article>
    <van-button @click="onSubmit" type="danger" class="submit" size="large"
      >确认提现</van-button
    >
  </section>
</template>

<script>
import { Button } from "vant";

export default {
  components: {
    VanButton: Button
  },
  data() {
    const { record, money } = this.$route.params;
    return {
      record,
      money
    };
  },
  methods: {
    onSubmit() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less">
.integral-advance-result {
  padding: 15px;
  .content {
    background-color: #fff;
    overflow: hidden;
    .top {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 30px;
      border-bottom: 1px dashed @border-color;
      &:after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        transform: translate(-50%, 50%);
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: @background-color;
      }
      &:before {
        content: "";
        position: absolute;
        right: 0;
        bottom: 0;
        transform: translate(50%, 50%);
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: @background-color;
      }
      .img {
        width: 88px;
        height: 88px;
      }
      .txt,
      .tip {
        line-height: 2;
      }
      .txt {
        font-size: 18px;
      }
    }
    .bottom {
      padding: 20px;
      line-height: 2;
      .item {
        display: flex;
        .label {
          flex-basis: 35%;
          color: @grey;
        }
      }
    }
  }
  .submit {
    margin-top: 30px;
    width: calc(100% - 30px);
    margin-left: 15px;
  }
}
</style>
