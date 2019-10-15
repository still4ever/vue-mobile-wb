<template>
  <section class="goods-detail">
    <article class="panel">
      <swipe
        v-if="goods.imgList && goods.imgList.length > 0"
        :show-indicators="false"
        @change="onChange"
      >
        <swipe-item v-for="(item, idx) in goods.imgList" :key="idx"
          ><img :src="item.url" alt="图片"
        /></swipe-item>
        <div class="custom-indicator" slot="indicator">
          {{ current + 1 }}/{{ goods.imgList.length }}
        </div>
      </swipe>
      <div class="info">
        <div class="price">
          <span class="num">￥{{ goods.price }}</span
          ><span class="tag">热卖</span
          ><span v-if="goods.isFreePost" class="type">免运费</span>
        </div>
        <div class="goods-name">{{ goods.description }}</div>
      </div>
    </article>
    <goods-action>
      <goods-action-icon
        icon-class="iconfont iconfont-cart"
        :info="cartNumber"
        to="/goods/cart"
        text="购物车"
      />
      <goods-action-button
        @click="addCart(goods)"
        type="warning"
        text="加入购物车"
      />
      <goods-action-button @click="buyNow" type="danger" text="立即购买" />
    </goods-action>
    <popup v-model="isShow" position="bottom">
      <article class="goods-buy">
        <header><Icon @click="onClose" name="cross" /></header>
        <main class="content">
          <div class="goods-info">
            <div class="goods-img"><img :src="goods.url" alt="商品" /></div>
            <div class="goods-detail">
              <div class="name">{{ goods.title }}</div>
              <div class="price">￥{{ goods.price }}</div>
            </div>
          </div>
          <div class="goods-action">
            <div>购买数量</div>
            <div class="action">
              <span @click="onSubtract" class="subtract btn">-</span
              ><input v-model.number="goodsNum" type="text" /><span
                class="add btn"
                @click="onAdd"
                >+</span
              >
            </div>
          </div>
        </main>
        <footer>
          <van-button type="danger" size="large" @click="onNext"
            >下一步</van-button
          >
        </footer>
      </article>
    </popup>
  </section>
</template>
<script>
import {
  Swipe,
  SwipeItem,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Popup,
  Icon,
  Button
} from "vant";
import { CartService, GoodsService, OrderService } from "../../service/index";

export default {
  components: {
    Swipe,
    SwipeItem,
    GoodsAction,
    GoodsActionIcon,
    GoodsActionButton,
    Popup,
    Icon,
    VanButton: Button
  },
  data() {
    return {
      goods: {},
      current: 0,
      isShow: false,
      goodsNum: 1,
      cartNumber: 0
    };
  },
  methods: {
    onChange(idx) {
      this.current = idx;
    },

    async addCart(goods) {
      const { msg, code } = await CartService.addCart({
        commodityId: goods.commodityId,
        number: 1
      });
      if (code === 200) {
        this.$toast.success({
          message: "添加成功",
          duration: 500,
          onClose: () => {
            this.$router.push({ path: "/goods/cart" });
          }
        });
      } else {
        this.$toast.fail({ message: msg });
      }
    },

    buyNow() {
      this.isShow = true;
    },

    onClose() {
      this.isShow = false;
    },

    onSubtract() {
      if (this.goodsNum <= 1) return;
      this.goodsNum -= 1;
    },

    onAdd() {
      this.goodsNum += 1;
    },

    async onNext() {
      const { data } = await OrderService.buyNow({
        [this.$route.query.id]: this.goodsNum
      });
      console.log(data);
      this.$store.dispatch("setOrder", data);
      this.$router.push({ path: "/goods/settle" });
    },

    async fetchData() {
      const { data } = await GoodsService.getGoodsDetail({
        commodityId: this.$route.query.id
      });
      console.log(data);
      this.goods = data;
    },
    async fetchCartNumber() {
      const { data } = await CartService.getCartNumber();
      console.log(data);
      this.cartNumber = data;
    }
  },
  mounted() {
    this.fetchData();
    this.fetchCartNumber();
  }
};
</script>
<style lang="less">
.goods-detail {
  .van-swipe {
    position: relative;
    &-item {
      font-size: 0;
      img {
        width: 100%;
      }
    }
    .custom-indicator {
      position: absolute;
      right: 15px;
      bottom: 15px;
      width: 45px;
      height: 24px;
      background-color: rgba(0, 0, 0, 0.3);
      color: #fff;
      text-align: center;
      line-height: 24px;
      border-radius: 24px;
    }
  }
  .info {
    padding: 15px;
    line-height: 1;
    background-color: #fff;
    .price {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      color: @red;
      .num {
        font-size: 18px;
        margin-right: 7px;
      }
      .tag {
        font-size: 12px;
        height: 16px;
        line-height: 16px;
        padding: 0 4px;
        border: 1px solid @red;
        border-radius: 18px;
      }
      .type {
        margin-left: auto;
        color: @grey;
      }
    }
    .goods-name {
      line-height: 1.5;
      font-size: 16px;
    }
  }
  .van-goods-action {
    &-icon {
      min-width: 30%;
    }
    &-button {
      &:first-of-type {
        background-color: @yellow;
        border-color: @yellow;
      }
    }
  }
  .goods-buy {
    background-color: #fff;
    header {
      display: flex;
      justify-content: flex-end;
      padding: 10px;
      color: @grey;
      font-size: 16px;
    }
    main {
      padding: 0 15px 60px;
      .goods-info {
        margin-bottom: 40px;
        display: flex;
        .goods-img {
          width: 95px;
          height: 95px;
          margin-right: 14px;
          font-size: 0;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .goods-detail {
          padding-top: 5px;
          line-height: 1.5;
          .price {
            font-size: 18px;
            color: @red;
          }
        }
      }
      .goods-action {
        display: flex;
        justify-content: space-between;
        .action {
          height: 24px;
          display: inline-flex;
          line-height: 24px;
          text-align: center;
          border: 1px solid @border-color;
          .btn {
            width: 24px;
            font-size: 18px;
          }
          input {
            width: 45px;
            border: none;
            text-align: center;
            border-right: 1px solid @border-color;
            border-left: 1px solid @border-color;
          }
        }
      }
    }
  }
}
</style>
