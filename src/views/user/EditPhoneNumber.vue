<template>
  <section class="editPhoneNumber">
    <van-cell-group class="editPhoneNumber-item editPhoneNumber-phoneNumInfo">
      <van-field clearable v-model="phone" label="手机号" placeholder="输入绑定的手机号">
        <van-button slot="button" size="small" @click="onGetSmsCode" type="primary"
          >发送验证码</van-button
        >
      </van-field>
    </van-cell-group>
    <van-cell-group class="editPhoneNumber-item editPhoneNumber-phoneNumInfo">
      <van-field v-model="code" clearable label="验证码" placeholder="请输入验证码" />
    </van-cell-group>
    <van-button type="danger" size="large" class="editPhoneNumber-btn" @click="retrieveUserPassword">确定</van-button>
  </section>
</template>

<script>
import { CellGroup, Field, Button } from "vant";
import { bankCardService } from "../../service/index";
import { UserService } from "../../service/index";

export default {
  components: {
    VanCellGroup: CellGroup,
    VanField: Field,
    VanButton: Button
  },
  data() {
    return {
        phone: '',
        code: ''
    };
  },

  methods: {
      async onGetSmsCode() {
          const { data, code } = await UserService.getCode({
            phone: this.phone
          });
          console.log(data);
          if (code === 200) {
            this.$toast.success({
              message: "短信发送成功"
            });
          }
      },

      async retrieveUserPassword() {
          const { data, code } = await bankCardService.retrieveUserPassword({
            phone: this.phone,
            code: this.code
          });
          console.log(data);
          if (code === 200 && data.isValid) {
            this.$toast.success({
              message: "密码已发送至您手机"
            });
          }else{
            this.$toast.fail({
              message: "请核验您的手机号"
            });
          }
      },
  }
};
</script>

<style lang="less">
    .editPhoneNumber {
        padding-top: 12px;
        &-phoneNumInfo input {
            font-size:15px;
            font-weight:400;
            color:rgba(153,153,153,1);
        }
        &-phoneNumInfo button {
            color: #FF695C;
            background-color: #ffffff;
            border: none;
        }
        &-item > div {
            line-height: 34px;
        }
        &-item span {
            width:44px;
            height:14px;
            font-size:15px;
            font-weight:400;
            color:#3333333;
        }
        &-btn {
            margin-top: 33px;
            margin-left: 15px;
            width: 345px;
            height: 44px;
        }
    }
</style>
