<template>
  <section class="bankcard-setPaw">
    <div><label>请设置新支付密码</label></div>
    <van-password-input :value="value" @focus="showKeyboard = true" />

    <van-number-keyboard
      :show="show"
      :transition="true"
      extra-key="."
      title="安全输入键盘"
      :hide-on-click-outside="false"
      @blur="show = false"
      @input="onInput"
      @delete="onDelete"
    />
  </section>
</template>

<script>
import { PasswordInput, NumberKeyboard, Button } from "vant";

export default {
  components: {
    vanPasswordInput: PasswordInput,
    VanNumberKeyboard: NumberKeyboard,
    VanButton: Button
  },
  data() {
    return {
      value: "",
      show: true
    };
  },
  methods: {
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
      let valueLength = this.value.length;

      if (valueLength == 6) {
        this.$router.push({
          path: "/user/bankCard/confirm",
          query: { valueLength }
        });
      }
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    }
  }
};
</script>

<style lang="less">
.bankcard-setPaw label {
  display: inline-block;
  margin-top: 163px;
  margin-left: 124px;
  margin-bottom: 19px;
  width: 128px;
  height: 16px;
  font-size: 16px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
</style>
