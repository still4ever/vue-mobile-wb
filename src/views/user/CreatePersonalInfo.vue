<template>
    <section class="createPersonalInfo">
        <van-cell-group class="createPersonalInfo-item createPersonalInfo-phoneNumInfo">
            <van-field clearable label="姓名" v-model="name" placeholder="请输入姓名" />
        </van-cell-group>
        <van-cell-group class="createPersonalInfo-item createPersonalInfo-phoneNumInfo">
            <van-field clearable label="身份证号" v-model="idCard" placeholder="请输入身份证号" />
        </van-cell-group>
        <van-cell-group class="createPersonalInfo-item createPersonalInfo-phoneNumInfo">
            <van-field clearable label="手机号" v-model="phone" placeholder="输入绑定的手机号">
                <van-button slot="button" size="small" @click="onGetSmsCode" type="primary">发送验证码</van-button>
            </van-field>
        </van-cell-group>
        <van-cell-group class="createPersonalInfo-item createPersonalInfo-phoneNumInfo">
            <van-field clearable label="验证码" v-model="code" placeholder="请输入验证码" />
        </van-cell-group>
        <van-button type="danger" class="createPersonalInfo-btn" @click="confirmPersonalInfo">完成</van-button>
    </section>
</template>

<script>
import { CellGroup, Field, Button, Dialog  } from 'vant';
import { mapState } from "vuex";
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
            idCard: "",
            phone: "",
            code: ""
        }
    },
    computed: mapState({
        user: state => state.userInfo
    }),
    methods:{
        getUserInfo() {
            let personalInfo = this.user;
            this.name = personalInfo.name;
            this.idCard = personalInfo.idCard;
            this.phone = personalInfo.phone;
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
        confirmPersonalInfo() {
            let info = '姓名&emsp;&emsp;&emsp;&emsp;' + this.name +'</br>手机号&emsp;&emsp;&emsp;' + this.phone + '</br>身份证号&emsp;&emsp;' + this.idCard + '</br>'
            Dialog.confirm({
                title: '个人信息确认',
                messageAlign: 'left',
                cancelButtonColor: '#FF695C',
                message: info
            }).then(async () => {
                const { data, code } = await UserService.saveBaseInfo({
                    name: this.name,
                    phone: this.phone,
                    idCard: this.idCard,
                    code: this.code
                });
                console.log(data);
                if (code === 200) {
                    this.$toast.success({
                        message: "修改个人信息成功",
                        duration: 500,
                        onClose:() => {
                            this.$router.push({ 
                                path: "/user/personalinfo" 
                            });
                        }
                    });
                }else{
                    this.$toast.fail({
                        message: "请检验修改信息",
                        duration: 500
                    });
                }
                
            }).catch(() => {
                // on cancel
            });   
        }
    },

    mounted() {
        this.getUserInfo();
    }
};
</script>

<style lang="less">
    .createPersonalInfo {
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
