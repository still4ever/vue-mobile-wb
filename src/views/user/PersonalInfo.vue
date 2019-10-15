<template>
    <section class="personalInfo">
        <van-cell-group class="personalInfo-item personalInfo-phoneNumInfo">
            <van-field clearable label="姓名" v-model="user.name" disabled />
        </van-cell-group>
        <van-cell-group class="personalInfo-item personalInfo-phoneNumInfo">
            <van-field clearable label="身份证号" v-model="user.idCard" disabled />
        </van-cell-group>
        <van-cell-group class="personalInfo-item personalInfo-phoneNumInfo">
            <van-field clearable label="手机号" v-model="user.phone" disabled />
        </van-cell-group>
        <van-button type="danger" class="personalInfo-btn" @click="editPersonalInfo">修改个人信息</van-button>
    </section>
</template>

<script>
import { CellGroup, Field, Button, Dialog  } from 'vant';
import { mapState } from "vuex";

export default {
    components: {
        VanCellGroup: CellGroup,
        VanField: Field,
        VanButton: Button
    },
    computed: mapState({
        user: state => state.userInfo
    }),
    methods:{
        getUserInfo() {
            this.$store.dispatch("setUserInfo");
        },

        editPersonalInfo() {
            this.$router.push({ 
                name: "createpersonalinfo"
            });
        }
    },

    mounted() {
        this.getUserInfo();
    }
};
</script>

<style lang="less">
    .personalInfo {
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
