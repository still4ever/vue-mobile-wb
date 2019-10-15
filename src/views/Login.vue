<template>
  <section id="chargeback" class="chargeback">
    <div class="item_phone">
      <Icon name="shouji" class="iphone" class-prefix="iconfont" />
      <label class="iphone_name">手机</label>
      <div class="phoneNum_box">
        <Dropdown-menu class="phone_select">
          <dropdown-item v-model="value" :options="option" />
        </Dropdown-menu>
        <!--        <field-->
        <!--          placeholder="请输入电话号码"-->
        <!--          error-message="手机号格式错误！"-->
        <!--          v-model="formData.phone"-->
        <!--          maxlength="11"-->
        <!--        />-->
        <field
          placeholder="请输入电话号码"
          v-model.trim="formData.phone"
          maxlength="11"
        />
      </div>
      <divider :style="{ borderColor: '#E7E7E7', padding: '0 38px' }"></divider>
    </div>
    <div class="item_verification">
      <Icon name="yanzhengma" class="verification" class-prefix="iconfont" />
      <label class="verification_name">验证码</label>
      <van-button class="verification_btn" type="default" @click="onGetSmsCode"
        >获取验证码</van-button
      >
      <div class="verification_box">
        <!--        <field-->
        <!--          placeholder="请输入验证码"-->
        <!--          error-message="验证码错误，请重新输入！"-->
        <!--          v-model="formData.code"-->
        <!--          maxlength="6"-->
        <!--        />-->
        <field
          placeholder="请输入验证码"
          v-model.trim="formData.code"
          maxlength="6"
        />
      </div>
      <divider :style="{ borderColor: '#E7E7E7', padding: '0 38px' }"></divider>
    </div>
    <van-button class="login_btn" type="danger" @click="onLogin"
      >登录</van-button
    >
    <!--    <label class="fast_login">一键快速登录</label>-->
    {{ tt }}
  </section>
</template>

<script>
import {
  Cell,
  Icon,
  DropdownMenu,
  DropdownItem,
  Field,
  Divider,
  Button
} from "vant";
import { UserService } from "../service/index";

export default {
  components: {
    VanButton: Button,
    Field,
    Cell,
    Icon,
    DropdownMenu,
    DropdownItem,
    Divider
  },

  data() {
    return {
      value: 0,
      option: [
        { text: "+86", value: 0 },
        { text: "+20", value: 1 },
        { text: "+1", value: 2 }
      ],
      formData: {
        phone: "",
        code: ""
      },
      tt: ""
    };
  },
  methods: {
    async onGetSmsCode() {
      const { data, code } = await UserService.getCode({
        phone: this.formData.phone
      });
      console.log(data);
      this.tt = data;
      if (code === 200) {
        this.$toast.success({
          message: "短信发送成功",
          duration: 500
        });
      }
    },
    async onLogin() {
      const { data, code, msg } = await UserService.login({
        ...this.formData
      });
      console.log(data);
      if (code === 200) {
        const { isNew, token, user } = data;
        localStorage.setItem("token", token);
        this.$toast.success({
          message: "登录成功",
          duration: 500,
          onClose: () => {
            const url = localStorage.getItem("pageUrl");
            if (url && url.indexOf("login") < 0) {
              window.location.replace(url);
            } else {
              window.location.replace(`${window.location.origin}`);
            }
          }
        });
      } else {
        this.$toast.fail({
          message: msg,
          duration: 500
        });
      }
    }
  }
};
</script>

<style lang="less">
.chargeback {
  background-color: #fff;
  height: calc(100vh - 36px);
  .item_phone {
    margin-top: 36px;
    .iphone {
      display: inline-block;
      margin-left: 43px;
      margin-right: 13px;
    }
    .iphone_name {
      font-size: 15px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    .phoneNum_box {
      display: flex;
      padding-top: 5px;
      [class*="van-hairline"]::after {
        border: none;
      }
      .phone_select {
        width: 85px;
        margin-left: 26px;
      }
      .van-dropdown-menu__title {
        color: #666666;
      }
      .van-field__control {
        color: #999999;
      }
    }
    .van-divider {
      margin: 0 0;
    }
  }
  .item_verification {
    margin-top: 23px;
    .van-button {
      height: 30px;
      line-height: 30px;
      border-radius: 15px;
      color: #999999;
      float: right;
      margin-right: 38px;
    }
    .verification {
      display: inline-block;
      margin-left: 43px;
      margin-right: 13px;
      line-height: 30px;
    }
    .verification_name {
      font-size: 15px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    .verification_box {
      display: flex;
      padding-top: 5px;
      padding-left: 30px;
      [class*="van-hairline"]::after {
        border: none;
      }
      .van-field__control {
        color: #999999;
      }
    }
    .van-divider {
      margin: 0 0;
    }
  }
  .login_btn {
    width: 265px;
    height: 44px;
    background: rgba(255, 105, 92, 1);
    border-radius: 4px;
    margin-top: 40px;
    margin-left: 55px;
    font-size: 16px;
  }
  .fast_login {
    display: block;
    margin-top: 21px;
    width: 100%;
    text-align: center;
    font-weight: 400;
    color: rgba(255, 105, 92, 1);
  }
}
</style>
