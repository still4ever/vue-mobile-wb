<template>
    <section class="recommend">
        <div class="recommend-title">
            <Icon name="zu5" class-prefix="iconfont" />猜你喜欢
        </div>
        <div class="recommend-list">
            <div class="recommend-list-item" v-for="item in [1, 2, 3, 4]">
                <div class="goods-img">
                    <img src="../assets/img/user_bg.png" alt="" />
                </div>
                <div class="goods-info">
                    <div class="title">紧致修复肌肤问 题折行</div>
                    <div class="foot">
                        <div class="price">￥199</div>
                        <Icon name="shopping-cart-o" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { Icon } from "vant";
export default {
  components: {
    Icon
  }
};
</script>

<style scoped lang="less">
.recommend {
  &-title {
    font-size: 16px;
    padding: 12px 0;
    text-align: center;
    line-height: 1;
    position: relative;
    i {
      font-size: 14px;
      color: @red;
      position: absolute;
      top: 14px;
      left: 50%;
      transform: translateX(-50%) scale(.65);
    }
  }
  &-list {
    display: flex;
    flex-wrap: wrap;
    &-item:nth-of-type(3n) {
      margin-right: 0;
    }
    &-item {
      display: inline-flex;
      flex-direction: column;
      width: 100px;
      height: 195px;
      padding: 5px;
      border-radius: 4px;
      margin: 0 7px 6px 0;
      background-color: #fff;
      .goods-img {
        width: 100%;
        flex-grow: 2;
        overflow: hidden;
        font-size: 0;
        img {
          width: 100%;
          min-height: 100%;
        }
      }
      .goods-info {
        height: 60px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title {
          width:100%;
          word-break:break-all;
          display:-webkit-box;
          -webkit-line-clamp:2;
          -webkit-box-orient:vertical;
          overflow:hidden;
        }
       .foot {
         display: flex;
         justify-content: space-between;
         .price { color: @red}
       }
        i {
          font-size: 14px;
          color: #666;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 1px solid #bababa;
          text-align: center;
          line-height: 20px;
        }
      }
    }
  }
}
</style>
