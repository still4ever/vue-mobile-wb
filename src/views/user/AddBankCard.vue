<template>
    <section class="myBankCard">
        <van-button class="addCard-btn" icon="plus" type="primary">添加银行卡</van-button>
    </section>
</template>

<script>
import { CellGroup, Field, Button, Icon } from 'vant';

export default {
    components: {
        VanCellGroup: CellGroup,
        VanField: Field,
        Icon,
        VanButton: Button
    }
};
</script>

<style lang="less">
    .myBankCard {
        padding-top: 15px;
        &-item {
            background-color: #0E7CCD;
            width:345px;
            height:89px;
            border-radius:4px;
            margin-left: 15px;
            .name {
                height: 51px;
                padding-left: 15px;
                img {
                    height: 36px;
                    width: 36px;
                    margin-top: 15px;
                    margin-left: 15px;
                }
                .bankCard-type {
                    display: inline-block;
                    margin-top: 15px;
                    .card-name {
                        color:rgba(253,253,253,1);
                        margin-left: 6px;
                    }
                    .card-type {
                        color:rgba(253,253,253,1);
                        margin-left: 6px;
                        opacity:0.8;
                    }
                }
                .icon-zfb {
                    font-size: 36px;
                }
            }
            .bankCard-number {
                width:247px;
                height:14px;
                font-size: 14px;
                font-weight:400;
                color:rgba(253,253,253,1);
                padding-left: 57px;
                margin-top: 5px;
            }
        }
        .addCard-btn {
            color: #FF695C;
            background-color: rgba(255,255,255,1);
            border-color: rgba(255,255,255,1);
            width:345px;
            height:50px;
            margin-top: 15px;
            margin-left: 15px;
        }
    }
</style>
