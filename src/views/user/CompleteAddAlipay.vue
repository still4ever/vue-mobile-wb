<template>
    <section class="completeAddAlipay">
        <article v-if="list.length > 0" style="margin-bottom: 10px;" class="address-list-item" v-for="(item, idx) in list" :key="idx">
            <div class="info">
                <Icon class="icon-zfb" slot="icon" color="#1296DB" class-prefix="iconfont" name="alipay"/>
                <label class="name">大裤衩</label>
                <label class="number" style="font-size:12px;">{{ item.number }}</label>
            </div>
        </article>
        <van-button :style="{display: deleteAlipay }" class="deleteCard-btn" icon="delete" type="primary">删除支付宝</van-button>
        <van-button :style="{display: addAlipay }" class="addAlipay-btn" icon="plus" type="primary" @click="onAdd">添加支付宝</van-button>
    </section>
</template>

<script>
import { Button, Icon } from 'vant';
import { AliPaySettingService } from "../../service/index";

export default {
    components: {
        Icon,
        VanButton: Button
    },

    data() {
        return {
            list: [],
            deleteAlipay: 'none',
            addlipay: 'none'
        };
    },

    methods: {
        async fetchList() {
            const { data } = await AliPaySettingService.getUserAplipayList();
            console.log(data);
            this.list = data;

            if(data && data.length > 0) {
                this.addAlipay = 'none';
                this.deleteAlipay = '';
            }else {
                this.addAlipay = '';
                this.deleteAlipay = 'none';
            }
        },

        async onAdd() {
            AliPaySettingService.getPassword().then(({ code, msg, data }) => {
                if (code === 200) {
                    if(data.isHas == false) {
                        let type = 'aliPay';
                        this.$router.push({ path: "/user/bankCard/setPaw", query: { type } });
                    }else {
                        this.$router.push({ path: "/user/bankCard/submitBankCrad" });
                    }
                }else if(code === 10020){
                    this.$toast.success({
                        message: msg
                    });
                    
                }
           });
        },
    },

    mounted() {
        this.fetchList();
    }
};
</script>

<style lang="less">
    .completeAddAlipay {
        padding-top: 15px;
        .info {
            height: 64px;
            background-color: #fff;
            .icon-zfb {
                font-size: 40px;
                margin-left: 15px;
                display: inline-block;
                margin-top: 12px;
            }
            .name {
                position: absolute;
                top: 29px;
                left: 67px;
            }
            .number {
                margin-left: 12px;
                color: #999999;
            }
        }
        .deleteCard-btn {
            color: #FF695C;
            background-color: rgba(255,255,255,1);
            border-color: rgba(255,255,255,1);
            width:345px;
            height:50px;
            margin-top: 15px;
            margin-left: 15px;
        }
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
