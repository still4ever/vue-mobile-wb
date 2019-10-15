<template>
  <section id="integral" class="integral">
    <article class="integral-info">
      <div class="item1">
        <!-- <div class="a-l">
          <div class="title">可用积分</div>
          <div class="num">{{ integral.enable }}</div>
        </div> -->
        <div class="a-l">
          <div class="title">总积分</div>
          <div class="num">{{ integral.total }}</div>
        </div>
        <van-button @click="routePage">提现</van-button>
      </div>
      <!-- <div class="item2">
        <span>总积分 {{ integral.total }}</span
        ><span>冻结积分 {{ integral.freeze }}</span>
      </div> -->
    </article>
    <cell-group class="integral-link">
      <cell
        title="积分明细"
        is-link
        value="积分可提现"
        to="/user/integral/list"
      >
        <Icon
          slot="icon"
          color="#1594D9"
          class-prefix="iconfont"
          name="jifen"
        />
      </cell>
      <cell
        title="我的支付宝"
        :class="{ none: !isAddAli }"
        is-link
        :value="isAddAli ? '已添加' : '未添加'"
        to="/user/myalipay/addalipay"
      >
        <Icon
          class="icon-zfb"
          slot="icon"
          color="#1594D9"
          class-prefix="iconfont"
          name="zfb"
        />
      </cell>
      <cell
        title="我的银行卡"
        :class="{ none: !isAddBank }"
        is-link
        :value="isAddBank ? '已添加' : '未添加'"
        to="/user/bankCard/MyBankCrad"
      >
        <Icon
          class="icon-yhk"
          slot="icon"
          color="#54A9F7"
          class-prefix="iconfont"
          name="yhk"
        />
      </cell>
      <cell title="提现记录" is-link to="/user/integral/advance/record">
        <Icon
          class="icon-yhk"
          slot="icon"
          color="#54A9F7"
          class-prefix="iconfont"
          name="tixianjilu"
        />
      </cell>
    </cell-group>
    <router-link class="link" to="/user/faq">常见问题</router-link>
  </section>
</template>

<script>
import { CellGroup, Cell, Icon, Button } from "vant";
import { IntegralService } from "../../../service/index";

export default {
  components: {
    CellGroup,
    Cell,
    Icon,
    VanButton: Button
  },
  computed: {
    isAddAli() {
      return !!this.alipay.length;
    },
    isAddBank() {
      return !!this.bank.length;
    }
  },
  data() {
    return {
      integral: {},
      alipay: [],
      bank: []
    };
  },
  methods: {
    async getData() {
      const { data } = await IntegralService.getHomeData();
      const { integral, alipay, bank } = data;
      this.integral = integral;
      this.alipay = alipay;
      this.bank = bank;
      this.$store.dispatch("setBankList", bank);
      this.$store.dispatch("setAlipayList", alipay);
      this.$store.dispatch("setIntegral", integral);
    },
    routePage() {
      this.$router.push({ path: "/user/integral/advance" });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style lang="less">
.integral {
  background-color: #fff;
  &-info {
    margin: 20px 15px;
    padding: 25px 35px;
    background: linear-gradient(to right, #ff765b, #ff5153);
    color: #fff;
    .item1 {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      .num {
        font-size: 36px;
      }
      .van-button {
        color: #fff;
        border: @border-color;
        background-color: rgba(255, 255, 255, 0.4);
        width: 80px;
        height: 30px;
        line-height: 30px;
        margin-bottom: 10px;
      }
    }
    .item2 {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
    }
  }
  .none {
    .van-cell__value {
      color: @red;
    }
  }
  &-status-list {
    display: flex;
    border-top: 1px solid @border-color;
    &-item {
      padding: 12px 0;
      flex-grow: 1;
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      span {
        color: #757575;
        margin-top: 6px;
        font-size: 12px;
      }
    }
  }
  .link {
    position: fixed;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
    text-decoration: underline;
    color: @red;
  }
}
</style>
