<template>
    <section class="bankCardDetail">
        <div>
            <div class="bankCardDetail-item">
                <div class="name">
                    <Icon class="icon-zfb" slot="icon" color="#FF5E5B" class-prefix="iconfont" name="hehuo"/>
                    <div class="bankCard-type">
                        <div class="card-name">中国建设银行</div>
                        <div class="card-type">储蓄卡</div>
                    </div>
                </div>
                <div class="bankCard-number">
                    <label class="">1234 4567 7899 9987 3579</label>
                </div>
            </div>
            <cell-group class="limit-figure">
                <cell title="单笔支付限额" value="￥999999">
                </cell>
                <cell title="每日支付限额" value="￥999999">
                </cell>
            </cell-group>
        </div>
        <van-button class="deleteCard-btn" icon="delete" type="primary">解除绑定</van-button>
    </section>
</template>

<script>
import { CellGroup, Button, Icon, Cell } from 'vant';

export default {
    components: {
        CellGroup: CellGroup,
        Cell,
        Icon,
        VanButton: Button
    }
};
</script>

<style lang="less">
    .bankCardDetail {
        & > div {
            background-color: white;
        }
        &-item {
            background-color: #0E7CCD;
            width:345px;
            height:89px;
            border-radius:4px;
            margin-left: 15px;
            margin-top: 15px;
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
        .limit-figure {
            border-top: none;
            margin-top: 19px;
        }
        .limit-figure > div {
            height: 50px;
        }
        .limit-figure::after {
            border: none;
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
    }
</style>
