<template>
    <div style="padding-top:80px;text-align:center;">
        <van-image height="125" fit="contain" style="display:block;" :src="`${host}/noRecord.png`"/>
        <span style="font-weight: 400;color: rgba(153,153,153,1);">{{ txt || "没有充值记录哦~" }}</span>
    </div>
</template>

<script>
import { Image } from "vant";

export default {
    name: "empty",
    components: {
        VanImage: Image
    },
    props: {
        txt: String
    },
    data() {
        return {
            host: location.origin
        };
    }
};
</script>

<style lang="less"></style>
