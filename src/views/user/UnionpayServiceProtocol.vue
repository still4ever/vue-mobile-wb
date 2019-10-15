<template>
  <div class="unionpay_service_protocol">
    <h4>支付银联二维码服务协议</h4>
    <p>
        本服务协议的双方是中国银联（以下简称“银联”）及希望注册成
        为银联用户的持卡人（以下简称"您"）。您应仔细阅读本协议项下
        全部内容，并对加粗字体显示部分重点阅读。本协议的效力及于银
        联在本协议项下为您提供的一切服务。
    </p>
    <h4>目录</h4>
    <p>
        第一部分 银联用户服务协议通用条款<br>
        第二部分 银联在线支付专用条款<br>
        第三部分 银联移动支付专用条款<br>
        第四部分 云闪付专用条款<br>
                         
    </p>
    <h4>第一部分 银联用户服务协议通用条款</h4>
    <h5>一、 定义</h5>
    <p>
        1、“银联用户”，指在银联网站及银联授权的其他渠道成功注册
        银联账户的持卡人。未在银联网站及相关平台注册，但根据银联
        与合作商户的协议，使用合作商户账号登录并使用银联产品与服务
        的用户，在银联与该商户合作期间，视为银联用户。<br>
        2、“银联账户”，指银联用户注册成功后系统生成的相关电子账
        户，用于存储用户的相关个人信息、被关联的银行卡信息以及使用
        银联服务的所需信息等。
    </p>
  </div>
</template>
<script>
  import { CellGroup, Cell } from "vant";
  export default {
    components: {
      CellGroup,
      Cell,
    }
  };
</script>
<style lang="less">
  .unionpay_service_protocol {
    padding: 12px 15px;
    line-height: 1.5;
    h4 {
      margin: 0;
      font-size: 16px;
    }
    p {
      margin-top: 10px;
      color: @grey;
    }
  }
</style>
