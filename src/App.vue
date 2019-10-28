<template>
    <div id="app">
        <router-link v-if="!isShow && isLogin" to="/" class="back_home">
            <icon name="arrow-left"/>
        </router-link>
        <tabbar v-model="active" v-if="isShow">
            <tabbar-item replace to="/home">
                <span>首页</span>
                <svg slot="icon" slot-scope="props" class="icon" aria-hidden="true">
                <use v-if="props.active" xlink:href="#iconfont-zhuye"></use>
                <use v-else xlink:href="#iconfont-zhuyedefuben"></use>
                </svg>
            </tabbar-item>
            <tabbar-item replace to="/partner">
                <span>合伙人</span>
                <svg slot="icon" slot-scope="props" class="icon" aria-hidden="true">
                <use v-if="props.active" xlink:href="#iconfont-hehuo"></use>
                <use v-else xlink:href="#iconfont-hehuodefuben"></use>
                </svg>
            </tabbar-item>
            <tabbar-item replace to="/goods/cart">
                <span>购物车</span>
                <svg slot="icon" slot-scope="props" class="icon" aria-hidden="true">
                <use v-if="props.active" xlink:href="#iconfont-gouwuche"></use>
                <use v-else xlink:href="#iconfont-cart"></use>
                </svg>
            </tabbar-item>
            <tabbar-item replace to="/user">
                <span>我的</span>
                <svg slot="icon" slot-scope="props" class="icon" aria-hidden="true">
                <use v-if="props.active" xlink:href="#iconfont-wo"></use>
                <use v-else xlink:href="#iconfont-wodefuben"></use>
                </svg>
            </tabbar-item>
        </tabbar>
        <router-view />
    </div>
</template>

<script>
import { Tabbar, TabbarItem, Icon } from "vant";
import { isLogin } from "./utils/util";

export default {
    components: {
        Tabbar,
        TabbarItem,
        Icon
    },
    data() {
        return {
            active: 0,
            isShow: this.isShowMenu,
            isLogin: isLogin()
        };
    },
    mounted() {},
    updated() {
        this.isShow = this.isShowMenu;
        this.active = this.activeIdx;
    }
};
</script>

<style lang="less">
@import "./assets/style/color";
#app {
  min-height: calc(100vh - 60px);
  background-color: @background-color;
  font-size: 14px;
  padding-bottom: 60px;
  .back_home {
    position: fixed;
    top: 50px;
    left: 15px;
    z-index: 999;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
  }
  svg.icon,
  svg.iconfont {
    width: 22px;
    height: 22px;
    vertical-align: -10px;
    fill: currentColor;
    overflow: hidden;
  }
  .van-button--disabled {
    background-color: @grey;
    border: none;
  }
  .van-cell {
    align-items: center;
    .iconfont {
      font-size: 16px;
      margin-right: 10px;
      width: 28px;
      text-align: center;
    }
    .icon-address {
      font-size: 20px;
    }
    .icon-yhk {
      font-size: 14px;
    }
    .icon-zfb {
      font-size: 22px;
    }
  }
  .van-dialog__cancel span {
    color: @red;
  }
}
</style>
