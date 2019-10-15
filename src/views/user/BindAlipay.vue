<template>
  <section class="bindAlipay">
    <label for="">请输入支付宝账户</label>
    <van-cell-group>
      <van-field v-model="number" @input="onInputxx" placeholder="请输入手机号或邮箱"/>
      <van-field v-model="phone" label-class='labelColor' label="预留手机号" placeholder="请输入手机号">
        <van-button slot="button" class="code_btn" size="small" type="primary" @click="onGetSmsCode">发送验证码</van-button>
      </van-field>
      <van-field v-model="code" label-class='labelColor' label="验证码" placeholder="请输入验证码"/>
    </van-cell-group>
    <van-button :disabled="isClick" :style="complete_btn" @click="completeAdd" type="primary">完成</van-button
    >
  </section>
</template>

<script>
import { Button, CellGroup, Field } from "vant";
import { AliPaySettingService } from "../../service/index";
import { UserService } from "../../service/index";

export default {
  components: {
    VanCellGroup: CellGroup,
    VanButton: Button,
    VanField: Field
  },

  data() {
    return {
      number: "",
      phone: "",
      code: "",
      isClick: true,
      complete_btn: {
        color: "#ffffff",
        backgroundColor: "#BEBEBE",
        borderColor: "rgba(255,255,255,1)",
        width: "345px",
        height: "50px",
        marginTop: "15px",
        marginLeft: "15px"
      }
    };
  },

  methods: {
    onInputxx(key) {
      this.value = key;
      let valueLength = this.value.length;

      if (valueLength > 0) {
        this.$data.isClick = false;
        this.$data.complete_btn.backgroundColor = "#FF695C";
      } else {
        this.$data.isClick = true;
        this.$data.complete_btn.backgroundColor = "#BEBEBE";
      }
    },
    async onGetSmsCode() {
      const { data, code } = await UserService.getCode({
        phone: this.phone
      });
      console.log(data);
      if (code === 200) {
        this.$toast.success({
          message: "短信发送成功",
          duration: 500
        });
      }
    },
    async completeAdd() {
      let params = {
        number: this.number,
        phone: this.phone,
        code: this.code
      }

      if(params.number == '') {
        this.$toast.success({
          message: "请输入支付宝账号",
          duration: 500,
        });
      }

      if(params.phone == '') {
        this.$toast.success({
          message: "请输入手机号",
          duration: 500,
        });
      }

      if(params.code == '') {
        this.$toast.success({
          message: "请输入验证码",
          duration: 500,
        });
      }

      AliPaySettingService.addUserAipay(params).then(({ code, msg }) => {
          if (code === 200) {
              this.$toast.success({
                message: "保存成功",
                duration: 500,
                onClose: () => {
                  this.$router.push({ path: "/user/myalipay/completeAddAlipay"});
                }
              });
          }else if(code === 10020){
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
.bindAlipay {
  label {
    font-size: 12px;
    font-weight: 400;
    color: #999999;
    display: inline-block;
    margin-top: 7px;
    margin-bottom: 7px;
    margin-left: 16px;
  }
  .labelColor {
    color:rgba(153,153,153,1);
  }
  .van-cell {
    line-height: 34px;
  }
  .code_btn {
    background-color: #FFF;
    border: none;
    color: #FF695C;
  }
  // .complete-btn {
  //     color: #ffffff;
  //     background-color: #BEBEBE;
  //     border-color: rgba(255,255,255,1);
  //     width:345px;
  //     height:50px;
  //     margin-top: 15px;
  //     margin-left: 15px;
  // }
}
</style>
