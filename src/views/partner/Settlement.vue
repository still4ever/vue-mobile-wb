<template>
  <section class="settle">
    <div class="goods-wrapper">
      <cell class="address-info" is-link @click="toPersonInfo">
        <div v-if="isValid" slot="title">
          <span
            class="tip"
            style="display:block;font-size:15px;font-weight:400;color:rgba(51,51,51,1);"
            >收货人：{{ cardAndUserInfo.name }}
            {{ cardAndUserInfo.phone }}</span
          >
          <span class="tip">身份证号：{{ cardAndUserInfo.idCard }}</span>
        </div>
        <div v-else slot="title"><span class="tip">添加个人信息</span></div>
      </cell>
      <article class="goods-list">
        <h4>
          <Icon
            class-prefix="iconfont"
            color="#666"
            name="dingdanxinxi"
          />订单信息
        </h4>
        <div class="post-from" v-bind:hidden="true">从华东自营仓库发货</div>
        <card
          num="1"
          :price="cardAndUserInfo.money"
          desc="购买产品的属性"
          :title="cardAndUserInfo.title"
          :thumb="cardAndUserInfo.thumb"
        >
        </card>
        <div class="goods-sum">
          <div class="label">支付金额</div>
          <div class="sum">
            总计:<span>￥{{ cardAndUserInfo.money }}</span>
          </div>
        </div>
        <!-- <div class="other">可获冻结积分：8</div> -->
        <field
          :value="invitCode"
          label="邀请码"
          :disabled="disabled"
          v-model="invitCode"
        />
        <div class="goods-sum">
          <div class="label">
            {{ commodity.title }} x {{ commodity.number }}
          </div>
          <div class="sum">
            <span>{{ commodity.money }}</span>
          </div>
        </div>
      </article>
      <article class="pay-list">
        <h4>
          <Icon color="#666" class-prefix="iconfont" name="zhifufangshi" />
          支付方式
        </h4>
        <checkbox-group v-model="result">
          <cell clickable @click="onToggle('wx')">
            <div slot="title">
              <Icon color="#00cf47" class-prefix="iconfont" name="weixin" />
              <span>微信支付</span>
            </div>
            <div slot="label">
              <span>推荐已再微信中绑定银行卡的用户使用</span>
            </div>
            <div slot="right-icon"><van-checkbox name="10" ref="wx" /></div>
          </cell>
          <cell clickable @click="onToggle('ali')">
            <div slot="title">
              <Icon
                class="icon-zfb"
                color="#00adf5"
                class-prefix="iconfont"
                name="zfb"
              />
              <span>支付宝支付</span>
            </div>
            <div slot="label"><span>快捷安全，可支持银行卡支付</span></div>
            <div slot="right-icon"><van-checkbox name="20" ref="ali" /></div>
          </cell>
        </checkbox-group>
      </article>
      <footer>
        <div class="tip">免运费</div>
        <div class="sum">
          实付金额:<span class="price">{{ cardAndUserInfo.money }}</span>
        </div>
        <van-button type="danger" @click="onOrder">支付订单</van-button>
      </footer>
    </div>
    <popup class="add-address-modal" v-model="showModal">
      <img src="../../assets/img/img1.png" alt="" />
      <p>请先添加个人信息</p>
      <van-button type="danger" @click="addPersonInfo">马上去添加</van-button>
      <Icon name="close" color="#fff" />
    </popup>
  </section>
</template>

<script>
import {
  Cell,
  Card,
  Button,
  SwipeCell,
  CheckboxGroup,
  Checkbox,
  Field,
  Icon,
  Popup
} from "vant";
import { mapState } from "vuex";
import { GoodsService, OrderService } from "../../service/index";
import { partnerService } from "../../service/index";

export default {
  name: "Settle",
  components: {
    Cell,
    Card,
    VanButton: Button,
    SwipeCell,
    Field,
    CheckboxGroup,
    VanCheckbox: Checkbox,
    Icon,
    Popup
  },

  data() {
    return {
      disabled: false,
      showModal: false,
      isValid: true,
      name: "",
      phone: "",
      isOrginal: "",
      idCard: "",
      invitCode: "",
      commodity: "",
      integral: 0,
      result: ["10"],
      cardAndUserInfo: this.$route.params
    };
  },

  methods: {
    async beforeCreatorOrder() {
      const { data } = await partnerService.beforeCreatorOrder({
        rankId: this.cardAndUserInfo.rankId
      });

      if (data.isOrginal == 1) {
        this.disabled = true;
        this.invitCode = "已为原始代理，无须邀请码";
      } else if (data.invitCode != "") {
        this.disabled = true;
        this.invitCode = data.invitCode;
      } else {
        this.disabled = false;
      }
      this.isOrginal = data.isOrginal;
      this.commodity = data.commodity;
      this.isValid = data.isValid;
    },
    async onOrder() {
      if (!this.isValid) this.showModal = true;
      if(this.isOrginal == 0 && this.invitCode == '') {
        this.$toast.fail({
          message: "请输入邀请码！"
        });

        return;
      }

      const params = {
        rankId: this.cardAndUserInfo.rankId,
        invitCode: this.invitCode,
        payType: Number(this.result[0]),
        url: `${location.origin}/goods/pay/success?type=2`
      };
      console.log(params);

      const { data, code, msg } = await partnerService.submitOrder(params);
      if (code === 200) {
        this.$store.dispatch("setPayData", data);
        this.$router.push({ path: "/payCenter" });
      } else {
        this.$toast.fail({ message: msg });
      }
    },
    addPersonInfo() {
      this.$router.push({
        path: "/user/personalinfo"
      });
    },
    toPersonInfo() {
      this.$router.push({
        path: "/user/personalinfo"
      });
    },
    onToggle(type) {
      this.$refs[type].toggle();
      if (type === "wx") this.result = ["10"];
      if (type === "ali") this.result = ["20"];
      console.log(this.result, this.$refs[type]);
    }
    // async onChangeInviteCode() {
    //   if (this.invitCode.length === 6) {
    //     const { data, code, msg } = await OrderService.getIntegralByInvitCode({
    //       invitCode: this.invitCode,
    //       dityTotal: this.order.dityTotal
    //     });
    //     console.log(data);
    //     if (code === 200) {
    //       this.integral = data;
    //     } else {
    //       this.$toast.fail({ message: msg, duration: 500 });
    //     }
    //   }
    // }
  },

  mounted() {
    this.beforeCreatorOrder();
  }
};
</script>

<style lang="less">
.settle {
  .address-info {
    position: relative;
    padding: 15px;
    .tip {
      font-size: 12px;
      color: @grey;
      margin-right: 8px;
    }
    &:before {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 2px;
      background: repeating-linear-gradient(
        -45deg,
        #ff6c6c 0,
        #ff6c6c 20%,
        transparent 0,
        transparent 25%,
        #1989fa 0,
        #1989fa 45%,
        transparent 0,
        transparent 50%
      );
      background-size: 80px;
      content: "";
    }
    .phone {
      margin-left: 30px;
    }
  }
  .goods-list {
    background-color: #fff;
    margin-top: 12px;
    h4 {
      font-size: 16px;
      font-weight: normal;
      padding: 10px 15px;
      margin: 0;
      i {
        margin-right: 4px;
      }
    }
    .post-from {
      padding-top: 5px;
      padding-left: 15px;
      color: @grey;
    }
    .other {
      padding: 15px;
      line-height: 1;
      border-top: 1px solid @border-color;
      &.inviteCode {
        display: flex;
        align-items: center;
        input {
          flex-grow: 2;
          background-color: #f6f6f6;
          border: none;
          text-indent: 16px;
        }
      }
    }
  }
  .pay-list {
    background-color: #fff;
    margin-top: 12px;
    h4 {
      font-size: 16px;
      font-weight: normal;
      padding: 10px 15px;
      margin: 0;
      i {
        margin-right: 4px;
      }
    }
    .van-cell {
      &__label {
        text-indent: 30px;
      }
    }
  }
  .van-card {
    margin: 0;
    padding: 5px 15px;
    background-color: #fff;
    &__thumb {
      width: 70px;
      height: 70px;
      img {
        object-fit: fill !important;
      }
    }
    &__content {
      flex-direction: row;
      flex-wrap: wrap;
      min-height: 70px;
    }
    &__title {
      flex-basis: 70%;
    }
    &__bottom {
      flex-basis: 30%;
      display: inline-flex;
      flex-direction: column;
      text-align: right;
      max-height: 40px;
    }
    &__price {
      font-size: 14px;
      color: @red;
    }
    &__num {
      color: @grey;
    }
    &__desc {
      order: 1;
      margin-top: 0;
      background-color: @background-color;
      padding: 2px 4px;
    }
    &__footer .foot {
      margin: 20px 0 10px;
    }
  }
  .goods-sum {
    display: flex;
    justify-content: space-between;
    padding: 15px;
    .label {
      font-size: 14px;
    }
    .sum {
      color: @grey;
      span {
        color: @red;
      }
    }
  }
  footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    border-top: 1px solid @border-color;
    .tip {
      font-size: 12px;
      color: @grey;
      margin-right: 8px;
    }
    .sum {
      margin-right: 15px;
      font-size: 16px;
      .price {
        color: @red;
        font-size: 18px;
      }
    }
    .van-button {
      min-width: 30%;
      height: 50px;
    }
  }
  .add-address-modal {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 200px;
    overflow: visible;
    padding-bottom: 25px;
    img {
      width: 87px;
      height: 87px;
      border-radius: 50%;
      transform: translateY(-10%);
    }
    p {
      margin: 0;
      padding-bottom: 35px;
    }
    button {
    }
    &::after {
      content: "";
      width: 1px;
      height: 43px;
      position: absolute;
      bottom: -43px;
      background-color: #fff;
    }
    .van-icon {
      font-size: 35px;
      transform: translateY(75px);
      position: absolute;
      bottom: 0;
    }
  }
}
</style>
