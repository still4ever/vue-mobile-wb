<template>
  <section class="integral-advance">
    <tabs v-model="active" sticky @change="onTab">
      <tab title="提现到银行卡" :name="10">
        <article class="content">
          <van-cell
            class="integral-add"
            title="提现至"
            isLink
            @click="onToggleModal"
          >
            <div v-if="bank" class="bank-select" slot="default">
              <img src="" alt="" />
              <span class="txt"
                >{{ bank.name }}({{
                  bank.number.slice(bank.number.length - 4, bank.number.length)
                }})</span
              >
            </div>
          </van-cell>
          <article class="money">
            <div class="title">10积分=1元</div>
            <field
              :value.number="money"
              @input="onInputMoney"
              placeholder="请输入金额"
            >
              <span slot="left-icon">￥</span>
              <van-button slot="button" size="small" @click="onCashAll"
                >全部提现</van-button
              >
            </field>
            <div v-if="money <= maxValue" class="amount">
              可提现金额{{ maxValue.toFixed(2) }}
            </div>
            <div v-else class="amount danger">
              输入的金额已经超过可提现的金额
            </div>
          </article>
          <div class="tip">预计2小时到账</div>
          <van-button
            @click="onSubmit"
            type="danger"
            class="submit"
            :disabled="!flag"
            size="large"
            >确认提现</van-button
          >
        </article>
      </tab>
      <tab title="提现到支付宝" :name="20">
        <article class="content">
          <van-cell
            class="integral-add"
            title="提现至"
            isLink
            @click="onToggleModal"
          >
            <div v-if="alipay" class="bank-select" slot="default">
              <img src="" alt="" />
              <span class="txt">{{ "支付宝账号" }}({{ alipay.number }})</span>
            </div>
          </van-cell>
          <article class="money">
            <div class="title">10积分=1元</div>
            <field
              :value.number="money"
              @input="onInputMoney"
              placeholder="请输入金额"
            >
              <span slot="left-icon">￥</span>
              <van-button slot="button" size="small" @click="onCashAll"
                >全部提现</van-button
              >
            </field>
            <div v-if="money <= maxValue" class="amount">
              可提现金额{{ maxValue.toFixed(2) }}
            </div>
            <div v-else class="amount danger">
              输入的金额已经超过可提现的金额
            </div>
          </article>
          <div class="tip">预计2小时到账</div>
          <van-button
            @click="onSubmit"
            type="danger"
            class="submit"
            :disabled="!flag"
            size="large"
            >确认提现</van-button
          >
        </article>
      </tab>
    </tabs>

    <popup class="bank-modal-wrapper" v-model="showModal">
      <article class="bank-modal">
        <h4 class="bank-modal-header">
          {{ type === 10 ? "选择银行卡" : "选择支付宝" }}
          <icon @click="onToggleModal" name="cross" />
        </h4>
        <div class="bank-modal-main">
          <div
            v-if="type === 10"
            @click="onSelectAccount(bank, key)"
            class="bank-item"
            v-for="(bank, key) in bankList"
            :key="key"
          >
            <img src="" alt="" />
            <span
              >{{ bank.name }}({{
                bank.number.slice(bank.number.length - 4, bank.number.length)
              }})</span
            >
            <icon v-if="selectIdx === key" class="selected" name="success" />
          </div>
          <div
            v-if="type === 20"
            @click="onSelectAccount(alipay, key)"
            class="bank-item"
            v-for="(alipay, key) in alipayList"
            :key="key"
          >
            <icon
              slot="icon"
              class-prefix="iconfont"
              name="zfb"
              color="#00ACF3"
              size="24"
            />
            <span>{{ "支付宝账号" }}({{ alipay.number }})</span>
            <icon v-if="selectIdx === key" class="selected" name="success" />
          </div>
          <div class="bank-item bank-add">
            <icon name="add-o" />
            <span>{{ type === 10 ? "添加新的银行卡" : "添加新的支付宝" }}</span>
          </div>
        </div>
      </article>
    </popup>

    <article class="pwd" v-show="isShow">
      <div class="pwd-cont">
        <div class="title">
          请输入支付密码
          <Icon name="arrow-down" />
        </div>
        <!-- 密码输入框 -->
        <password-input
          :value="value"
          info="密码为 6 位数字"
          @focus="showKeyboard = true"
        />

        <!-- 数字键盘 -->
        <number-keyboard
          :show="showKeyboard"
          @input="onInput"
          @delete="onDelete"
          @blur="showKeyboard = true"
        />
      </div>
    </article>
  </section>
</template>

<script>
import {
  Tab,
  Tabs,
  Cell,
  Icon,
  Field,
  Button,
  PasswordInput,
  NumberKeyboard,
  popup
} from "vant";
import { mapState } from "vuex";
import { IntegralService } from "../../../service/index";

export default {
  components: {
    Tab,
    Tabs,
    VanCell: Cell,
    Icon,
    Field,
    VanButton: Button,
    PasswordInput,
    NumberKeyboard,
    popup
  },
  computed: mapState({
    bankList: state => state.bankList,
    alipayList: state => state.alipayList,
    integral: state => state.integral,
    maxValue: state => state.integral.total / 10,
    listenChange() {
      const { money, maxValue, bank, alipay } = this;
      return { money, maxValue, bank, alipay };
    }
  }),
  data() {
    return {
      isShow: false,
      active: 0,
      money: "",
      value: "",
      type: 10,
      showKeyboard: true,
      showModal: false,
      selectIdx: -1,
      bank: null,
      alipay: null,
      flag: false
    };
  },

  methods: {
    onTab(type) {
      this.type = type;
      this.money = "";
      this.value = "";
      this.alipay = null;
      this.bank = null;
      this.selectIdx = -1;
      console.log(this.alipayList);
    },

    onInputMoney(val) {
      this.money = val;
    },
    onSubmit() {
      if (!this.flag) return;
      this.isShow = true;
    },

    // validator() {
    //   let { bank, money, maxValue, flag } = this;
    //   if (!bank) {
    //     this.$toast.fail({ message: "请选择银行卡", duration: 500 });
    //     this.flag = false;
    //     return;
    //   }
    //   if (!money) {
    //     this.$toast.fail({ message: "请输入大于0的金额", duration: 500 });
    //     this.flag = false;
    //     return;
    //   }
    //   if (money > maxValue) {
    //     this.$toast.fail({ message: "超出可提现金额", duration: 500 });
    //     this.flag = false;
    //     return;
    //   }
    //
    //   return this.flag;
    // },

    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
      console.log(this.value.length);
      if (this.value.length === 6) {
        this.isShow = false;
        this.confirmCash();
      }
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },

    async confirmCash() {
      const { money, value, type, bank, alipay } = this;
      const { code, msg } = await IntegralService.saveCash({
        money,
        password: value,
        type,
        number: type === 10 ? bank.number : alipay.number
      });
      if (code === 200) {
        this.$toast.success({
          message: "提现成功",
          duration: 500,
          onClose: () => {
            let record = "";
            if (type === 10) {
              record = `${bank.name}(${bank.number.slice(
                bank.number.length - 4,
                bank.number.length
              )})`;
            }
            if (type === 20) {
              record = `${"支付宝账号"}(${alipay.number})`;
            }
            this.$router.push({
              name: "userIntegralAdvanceResult",
              params: {
                money,
                record
              }
            });
          }
        });
      } else {
        this.$toast.fail({
          message: msg
        });
      }
    },

    onSelectAccount(data, idx) {
      this.selectIdx = idx;
      console.log(data);
      this.onToggleModal();
      if (this.type === 10) {
        this.bank = data;
      }
      if (this.type === 20) {
        this.alipay = data;
      }
    },

    onToggleModal() {
      this.showModal = !this.showModal;
    },

    onCashAll() {
      this.money = this.maxValue;
    }
  },
  watch: {
    listenChange(n, o) {
      let { money, bank, alipay, maxValue } = n;
      money = Number(money || 0);
      this.flag = !!(
        money &&
        money > 0 &&
        money <= maxValue &&
        (bank || alipay)
      );
    }
  }
};
</script>

<style lang="less">
.integral-advance {
  .content {
    margin-top: 12px;
    .van-cell__value {
      color: @text-color;
    }
    .integral-add {
      .van-cell__value {
      }
    }
    .money {
      padding: 0 13px;
      background-color: #fff;
      margin-top: 12px;
      .title {
        line-height: 3;
      }
      .van-field {
        display: flex;
        align-items: center;
        padding: 10px 0;
        &__left-icon {
          margin-right: 10px;
          font-size: 18px;
          align-self: flex-end;
          color: #999;
        }
        &__button {
          button {
            background-color: transparent;
            border: none;
            color: @red;
            font-size: 14px;
          }
        }
        input {
          font-size: 40px;
          line-height: 40px;
          height: 40px;
          &::placeholder {
            font-size: 14px;
          }
        }
      }
      .amount {
        line-height: 3;
        color: @grey;
        &.danger {
          color: @red;
        }
      }
    }
    .tip {
      text-indent: 15px;
      line-height: 3;
    }
    .submit {
      margin-top: 15px;
      width: calc(100% - 30px);
      margin-left: 15px;
    }
  }
  .bank-modal-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(100% - 30px);
    overflow: visible;
    .bank-modal {
      width: 100%;
      &-header {
        padding: 18px;
        margin: 0;
        font-size: 16px;
        text-align: center;
        position: relative;
        border-bottom: 1px solid @border-color;
        .van-icon {
          color: @grey;
          font-size: 20px;
          position: absolute;
          top: 50%;
          right: 15px;
          transform: translateY(-50%);
        }
      }
      &-main {
        padding-left: 20px;
        .bank-item {
          height: 50px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid @border-color;
          img {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            margin-right: 12px;
          }
          .selected {
            margin-left: auto;
            margin-right: 15px;
            color: @red;
          }
          &.bank-add {
            color: @grey;
            .van-icon {
              font-size: 18px;
              margin-right: 14px;
            }
          }
        }
      }
    }
  }
  .pwd {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    &-cont {
      position: fixed;
      left: 0;
      bottom: 0;
      right: 0;
      .title {
        line-height: 3;
        background-color: #f8f8f8;
        text-align: center;
        position: relative;
        padding: 0 15px;
        font-size: 16px;
        .van-icon {
          position: absolute;
          top: 15px;
          right: 15px;
          font-size: 20px;
          color: @grey;
        }
      }
      .van-password-input {
        background-color: #f8f8f8;
        padding: 15px 15px 30px;
        margin: 0;
        &__security li {
          background-color: transparent;
          border: 1px solid @border-color;
        }
      }
      .van-number-keyboard {
        position: relative;
      }
    }
  }
}
</style>
