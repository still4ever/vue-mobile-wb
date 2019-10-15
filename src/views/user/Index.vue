<template>
  <section id="user" class="user">
    <article class="user-info" @click.self.prevent="routeEditPage">
      <div class="avatar"><img :src="user.headUrl" alt="头像" /></div>
      <div class="info">
        <div class="name">{{ user.name || user.nickName}}</div>
        <div class="other">
          <span>邀请码：{{ user.invitCode }}</span>
          <span class="copy btn" @click="onCopy">复制</span>
        </div>
      </div>
      <icon name="arrow" />
    </article>
    <article class="order">
      <cell title="全部订单" is-link value="查看全部" to="/user/order" />
      <div class="order-status-list">
        <div class="order-status-list-item" @click="routeOrderPage(10)">
          <svg slot="icon" class="icon" aria-hidden="true">
            <use xlink:href="#iconfont-zu1"></use>
          </svg>
          <div
            v-if="order.waitingPay > 0"
            class="num"
            :class="{ max: order.waitingPay > 99 }"
          >
            {{ order.waitingPay }}
          </div>
          <span>待付款</span>
        </div>
        <div class="order-status-list-item" @click="routeOrderPage(20)">
          <svg slot="icon" class="icon" aria-hidden="true">
            <use xlink:href="#iconfont-zu2"></use>
          </svg>
          <div
            v-if="order.waitingSend > 0"
            class="num"
            :class="{ max: order.waitingSend > 99 }"
          >
            {{ order.waitingSend }}
          </div>
          <span>待发货</span>
        </div>
        <div class="order-status-list-item" @click="routeOrderPage(120)">
          <svg slot="icon" class="icon" aria-hidden="true">
            <use xlink:href="#iconfont-zu3"></use>
          </svg>
          <div
            v-if="order.waitingReceived > 0"
            class="num"
            :class="{ max: order.waitingReceived > 99 }"
          >
            {{ order.waitingReceived }}
          </div>
          <span>待收货</span>
        </div>
      </div>
    </article>
    <cell-group class="user-link">
      <cell title="额度充值记录" is-link to="/partner/chargeRecord">
        <Icon
          slot="icon"
          color="#FF5E5B"
          class-prefix="iconfont"
          name="hehuo1"
        />
      </cell>
      <cell title="我的积分" is-link value="积分可提现" to="/user/integral">
        <Icon
          slot="icon"
          color="#FFA044"
          class-prefix="iconfont"
          name="jifen"
        />
      </cell>
      <cell title="地址管理" is-link to="/user/address">
        <Icon
          class="icon-address"
          slot="icon"
          color="#26BE76"
          class-prefix="iconfont"
          name="dizhi"
        />
      </cell>
      <cell title="银行卡管理" is-link to="/user/bankCard/MyBankCrad">
        <Icon
          class="icon-yhk"
          slot="icon"
          color="#54A9F7"
          class-prefix="iconfont"
          name="yhk"
        />
      </cell>
      <cell title="支付宝管理" is-link to="/user/myalipay/addalipay">
        <Icon
          class="icon-zfb"
          slot="icon"
          color="#1594D9"
          class-prefix="iconfont"
          name="zfb"
        />
      </cell>
      <cell title="支付设置" is-link to="/user/paymentSetting">
        <Icon slot="icon" color="#FFA044" class-prefix="iconfont" name="zfsz" />
      </cell>
      <cell title="个人信息" is-link to="/user/personalinfo">
        <Icon slot="icon" color="#26BE76" class-prefix="iconfont" name="grxx" />
      </cell>
    </cell-group>
  </section>
</template>

<script>
import { CellGroup, Cell, Icon } from "vant";
import { mapState } from "vuex";
import { UserService } from "../../service/index";

export default {
  components: {
    CellGroup,
    Cell,
    Icon
  },
  data() {
    return {
      order: {}
    };
  },
  computed: mapState({
    user: state => state.userInfo
  }),
  methods: {
    async getData() {
      // const { data } = await UserService.getUserInfo();
      this.order = await this.$store.dispatch("setUserInfo");
      // this.order = data.order;
    },

    onCopy() {
      this.$copyText(this.user.invitCode).then(
        () => this.$toast({ message: "复制成功", duration: 500 }),
        () => this.$toast({ message: "复制失败", duration: 500 })
      );
    },

    routeEditPage() {
      this.$router.push({ name: "userInfo" });
    },

    routeOrderPage(type) {
      this.$router.push({ name: "userOrder", params: { type } });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style lang="less">
.user {
  &-info {
    padding: 40px 15px;
    background: url("../../assets/img/user_bg.png");
    background-size: cover;
    display: flex;
    .avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
      background-color: @grey;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .info {
      margin-left: 10px;
      line-height: 1.5;
      color: #fff;
      .name {
        font-size: 16px;
      }
      .other {
        display: inline-flex;
        font-size: 12px;
        align-items: center;
        .copy {
          margin-left: 15px;
          width: 46px;
          height: 20px;
          border-radius: 20px;
          text-align: center;
          line-height: 20px;
          background-color: rgba(255, 255, 255, 0.6);
        }
      }
    }
    .van-icon-arrow {
      margin-left: auto;
      display: inline-flex;
      color: #fff;
      align-items: center;
      font-size: 20px;
    }
  }
  .order {
    margin: 12px 0;
    background-color: #fff;
    .van-cell:not(:last-child)::after {
      border: none;
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
        position: relative;
        span {
          color: #757575;
          margin-top: 6px;
          font-size: 12px;
        }
        .num {
          position: absolute;
          top: 6px;
          left: 50%;
          transform: translateX(50%);
          font-size: 12px;
          min-width: 14px;
          text-align: center;
          color: @red;
          height: 14px;
          line-height: 14px;
          border-radius: 16px;
          border: 1px solid @red;
          &.max {
            padding: 0 4px;
          }
        }
      }
    }
  }
}
</style>
