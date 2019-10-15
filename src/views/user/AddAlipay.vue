<template>
    <section class="myAlipay">
        <van-button class="addAlipay-btn" icon="plus" type="primary" to="/user/myalipay/bindalipay">添加支付宝</van-button>
    </section>
</template>

<script>
import { Button, Icon } from 'vant';

export default {
    components: {
        Icon,
        VanButton: Button
    }
};
</script>

<style lang="less">
    .myAlipay {
        .addAlipay-btn {
            color: #4AA8FF;
            background-color: rgba(255,255,255,1);
            border-color: rgba(255,255,255,1);
            width:345px;
            height:50px;
            margin-top: 15px;
            margin-left: 15px;
        }
    }
</style>
