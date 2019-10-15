<template>
  <section class="addBankCard">
    <div class="warning">
      <label>提醒： 后续只能绑定该持卡人的银行卡</label>
    </div>
    <van-cell-group class="addBankCard-item addBankCard-personalInfo">
      <van-field v-model="name" clearable label="持卡人" />
      <van-field v-model="idcard" clearable label="身份证号" />
    </van-cell-group>
    <van-cell-group class="addBankCard-item">
      <van-field v-model="bankcardno" clearable label="银行卡号" />
      <van-field v-model="choosebank" clearable label="选择银行" />
    </van-cell-group>
    <van-cell-group class="addBankCard-item">
      <van-field v-model="phonenumber" clearable label="预留手机号" >
        <van-button slot="button" class="code-btn" size="small" type="primary" @click="onGetSmsCode">发送验证码</van-button>
      </van-field>
      <van-field v-model="verificationcode" clearable label="验证码" />
    </van-cell-group>
    <van-button type="danger" class="addBankCard-btn" @click="onAdd">绑定银行卡</van-button
    >
  </section>
</template>

<script>
import { CellGroup, Field, Button, Toast } from "vant";
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
      name: "",
      idcard: "",
      bankcardno: "",
      choosebank: "",
      phonenumber: "",
      verificationcode: ""
    };
  },

  methods: {
    async onGetSmsCode() {
      const { data, code } = await UserService.getCode({
        phone: this.phonenumber
      });
      console.log(data);
      if (code === 200) {
        this.$toast.success({
          message: "短信发送成功",
          duration: 500
        });
      }
    },

    onAdd() {
      let params = {
        name: this.choosebank,
        number: this.bankcardno,
        phone: this.phonenumber,
        code: this.verificationcode
      };

      bankCardService.addUserBank(params).then(({ code, msg }) => {
        if (code === 200) {
          this.$toast.success({
            message: "新增成功",
            duration: 500,
            onClose: () => {
              //this.$router.go(-1);
              this.$router.push({ path: "/user/bankCard/MyBankCrad" });
            }
          });
        } else {
          this.$toast.success({
            message: msg
          });
        }
      });
    }
  }
};
</script>

<style lang="less">
.addBankCard {
  .warning {
    margin-top: 40px;
    height: 30px;
  }
  .warning label {
    display: inline-block;
    padding-left: 16px;
    line-height: 30px;
    width: 203px;
    font-size: 12px;
    font-weight: 400;
    color: rgba(254, 90, 76, 1);
  }
  &-personalInfo input {
    font-size: 15px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
  }
  &-item {
    margin-bottom: 12px;
  }
  &-item > div {
    line-height: 34px;
  }
  &-item span {
    width: 44px;
    height: 14px;
    font-size: 15px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
  }
  &-btn {
    margin-top: 8px;
    margin-left: 15px;
    width: 345px;
    height: 44px;
  }
  .code-btn {
    border: none;
    background-color: #FFF;
    span {
      color: #FF695C;
    }
  }
}
</style>
