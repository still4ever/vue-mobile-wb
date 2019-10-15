<template>
    <section class="editPersonalInfo">
        <van-cell-group class="editPersonalInfo-item editPersonalInfo-phoneNumInfo">
            <van-field clearable label="姓名" placeholder="请输入姓名" />
        </van-cell-group>
        <van-cell-group class="editPersonalInfo-item editPersonalInfo-phoneNumInfo">
            <van-field clearable label="身份证号" placeholder="请输入身份证号" />
        </van-cell-group>
        <van-cell-group class="editPersonalInfo-item editPersonalInfo-phoneNumInfo">
            <van-field clearable label="手机号" placeholder="输入绑定的手机号">
                <van-button slot="button" size="small" type="primary">发送验证码</van-button>
            </van-field>
        </van-cell-group>
        <van-cell-group class="editPersonalInfo-item editPersonalInfo-phoneNumInfo">
            <van-field clearable label="验证码" placeholder="请输入验证码" />
        </van-cell-group>
        <van-button type="danger" class="editPersonalInfo-btn" @click="completeEdit">完成</van-button>
    </section>
</template>

<script>
import { CellGroup, Field, Button, Dialog  } from 'vant';

export default {
    components: {
        VanCellGroup: CellGroup,
        VanField: Field,
        VanButton: Button
    },
    data() {
        return {
            
        }
    },
    methods:{
        completeEdit() {
            Dialog.alert({
                message: '修改成功'
            }).then(() => {
                // on close
            });  
        }
    }
};
</script>

<style lang="less">
    .editPersonalInfo {
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
