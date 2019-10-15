<template>
  <section class="editPaymentPwd-setPaw">
    <div><label>请输入支付密码</label></div>
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
import { AliPaySettingService } from "../../service/index";

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
    async onInput(key) {
      this.value = (this.value + key).slice(0, 6);
      let valueLength = this.value.length;

      if (valueLength == 6) {
        let params = {
            password: this.value
        }
        AliPaySettingService.checkUserPayPassword(params).then(({ code, msg }) => {
            if (code === 200) {
                this.$toast.success({
                    message: "身份认证成功",
                    duration: 500,
                    onClose: () => {
                        this.$router.push({ path: "/user/setNewPaymentPwd"});
                    }
                });
            }else {
                this.$toast.fail({
                    message: msg
                });
                
            }
        });
        // this.$router.push({ path: "/user/comfirmEditPaymentPwd" });
      }
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    }
  }
};
</script>

<style lang="less">
.editPaymentPwd-setPaw label {
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
