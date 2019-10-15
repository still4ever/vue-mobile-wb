<template>
  <section class="integral-advance-result">
    <article class="content">
      <div class="top">
        <img src="../../assets/img/success.png" class="img" alt="" />
        <div class="txt">付款成功</div>
        <div class="tip">您的商品即将打包送至快递小哥手上</div>
      </div>
      <div class="bottom">
        <div class="item">
          <span class="label">流水号</span><span>{{ data.serialNum }}</span>
        </div>
        <div class="item">
          <span class="label">付款时间</span><span>{{ data.payTime }}</span>
        </div>
        <!--        <div class="item">-->
        <!--          <span class="label">订单编号</span><span>87278723783277832</span>-->
        <!--        </div>-->
        <div class="item">
          <span class="label">产品金额</span><span>¥{{ data.money }}</span>
        </div>
        <div class="item">
          <span class="label">所得积分</span><span>{{ data.integral }}</span>
        </div>
        <div class="item">
          <span class="label">邀请码</span><span>{{ data.invitCode }}</span>
        </div>
      </div>
    </article>
    <van-button @click="onSubmit" type="danger" class="submit" size="large"
      >返回主页</van-button
    >
  </section>
</template>

<script>
import { Button } from "vant";
import { OrderService } from "../../service/index";

export default {
  components: {
    VanButton: Button
  },
  data() {
    return {
      data: {}
    };
  },
  methods: {
    onSubmit() {
      const type = this.$route.query.type;
      if (type == 2) {
        this.$router.push({ path: "/partner" });
      } else {
        this.$router.push({ path: "/" });
      }
    },

    async getData() {
      const { data } = await OrderService.getSuccessPayOrder({
        orderId: this.$route.query.orderId
      });
      this.data = data;
    }
  },
  mounted() {
    this.getData();
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
      .tip {
        color: @grey;
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
  }
}
</style>
