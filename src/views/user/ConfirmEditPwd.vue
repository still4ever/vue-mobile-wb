<template>
  <section class="confirmEditPwd-setPaw">
    <div><label>请再次输入，以确认密码</label></div>
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
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
      let valueLength = this.value.length;

      if (valueLength == 6) {
        if(this.value == this.$route.query.value) {
          let params = {
            password: this.value
          }
          AliPaySettingService.updatePassword(params).then(({ code, msg }) => {
              if (code === 200) {
                  this.$toast.success({
                      message: "密码修改成功",
                      duration: 1000,
                      onClose: () => {
                          this.$router.push({ path: "/user/paymentSetting"});
                      }
                  });
              }else {
                  this.$toast.fail({
                      message: msg
                  });
                  
              }
          });
        }else {
           this.$toast.fail({
                message: '两次输入的密码不一致'
            });
        }
        // this.$router.push({ path: "/user/bankCard/confirm" });
      }
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    }
  }
};
</script>

<style lang="less">
.confirmEditPwd-setPaw label {
  display: inline-block;
  margin-top: 163px;
  margin-left: 92px;
  margin-bottom: 19px;
  height: 16px;
  font-size: 16px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
</style>
