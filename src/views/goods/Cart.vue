<template>
  <section class="goods-cart">
    <div v-if="goodsList.length > 0" class="goods-wrapper">
      <article class="goods-cart-slogan">
        <div class="goods-cart-slogan-item">
          <Icon name="duigou" class-prefix="iconfont" color="#FF695C" />
          <span>满88元免邮费</span>
        </div>
        <div class="goods-cart-slogan-item">
          <Icon name="duigou" class-prefix="iconfont" color="#FF695C" />
          <span>30天无忧退货</span>
        </div>
        <div class="goods-cart-slogan-item">
          <Icon name="duigou" class-prefix="iconfont" color="#FF695C" />
          <span>48小时快速退款</span>
        </div>
      </article>
      <list
        class="goods-cart-list"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <checkbox-group v-model="result">
          <swipe-cell
            v-for="(goods, key) in goodsList"
            :key="key"
            class="goods-cart-list-item"
          >
            <div class="content">
              <van-checkbox :name="key" checked-color="#FF695C" />
              <card
                :num="goods.number"
                :price="goods.commodity.price"
                :desc="goods.commodity.keywords"
                :title="goods.commodity.title"
                :thumb="goods.commodity.url"
              >
                <div slot="footer">
                  <div class="action">
                    <span class="subtract btn" @click="onSubtract(goods)"
                      >-</span
                    ><input :value="goods.number" readonly type="text" /><span
                      class="add btn"
                      @click="onAdd(goods)"
                      >+</span
                    >
                  </div>
                </div>
              </card>
            </div>
            <template slot="right">
              <van-button
                square
                @click="onDeleteGoods(goods.cartId)"
                type="danger"
                text="删除"
              />
            </template>
          </swipe-cell>
        </checkbox-group>
        <!--        <swipe-cell-->
        <!--          class="goods-cart-list-item"-->
        <!--          :class="{ disabled: disabled }"-->
        <!--        >-->
        <!--          <div class="content">-->
        <!--            <van-checkbox-->
        <!--              v-model="checked"-->
        <!--              :disabled="disabled"-->
        <!--              checked-color="#FF695C"-->
        <!--            />-->
        <!--            <card-->
        <!--              num="2"-->
        <!--              price="2.00"-->
        <!--              desc="标准套装+红色"-->
        <!--              title=" 莫次有机PWE活性美白洗面奶优惠套装"-->
        <!--              thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"-->
        <!--            >-->
        <!--              <div v-if="disabled" slot="tag">已下架</div>-->
        <!--              <div slot="footer">-->
        <!--                <div class="action">-->
        <!--                  <span class="subtract btn">-</span-->
        <!--                  ><input value="1" type="text" /><span class="add btn">+</span>-->
        <!--                </div>-->
        <!--              </div>-->
        <!--            </card>-->
        <!--          </div>-->
        <!--          <template slot="right">-->
        <!--            <van-button square type="danger" text="删除" />-->
        <!--          </template>-->
        <!--        </swipe-cell>-->
      </list>
      <footer>
        <div class="select-all">
          <van-checkbox
            @click="onCheckAll"
            v-model="isCheckAll"
            checked-color="#FF695C"
            >全选（{{ total }}）</van-checkbox
          >
        </div>
        <div class="sum">
          总计：<span class="price">￥{{ totalPrice }}</span>
        </div>
        <van-button type="danger" @click="onSubmit">下单</van-button>
      </footer>
    </div>
    <div v-else class="empty">
      <div class="tip">
        <svg id="svg" class="icon" aria-hidden="true">
          <use xlink:href="#iconfont-gouwuchekong"></use>
        </svg>
        <div class="txt">购物车空空如也,快来挑好货呗~</div>
        <van-button type="danger">逛逛今日特卖</van-button>
      </div>
      <!--<goods-recommend />-->
    </div>
  </section>
</template>

<script>
import {
  Tab,
  Tabs,
  Card,
  Button,
  SwipeCell,
  CheckboxGroup,
  Checkbox,
  Icon,
  List
} from "vant";
import GoodsRecommend from "../../components/Recommend";
import { CartService, OrderService } from "../../service/index";

export default {
  name: "Cart",
  components: {
    Tab,
    Tabs,
    Card,
    VanButton: Button,
    SwipeCell,
    CheckboxGroup,
    VanCheckbox: Checkbox,
    GoodsRecommend,
    Icon,
    List
  },
  computed: {
    totalPrice() {
      console.log(this.result);
      let sumPrice = 0;
      this.result.forEach(item => {
        const goods = this.goodsList[item];
        sumPrice += goods.number * goods.commodity.price;
      });

      return sumPrice;
    },
    total() {
      this.isCheckAll = this.result.length === this.goodsList.length;

      return this.result.length;
    }
  },
  data() {
    return {
      isCheckAll: false,
      checked: true,
      disabled: true,
      goodsList: [],
      result: [],
      page: 0,
      pageSize: 10,
      loading: false,
      finished: false
    };
  },
  methods: {
    onCheckAll() {
      if (!this.isCheckAll) {
        this.result = [...Array(this.goodsList.length).keys()];
      } else {
        this.result = [];
      }
    },

    async fetchList(isScroll) {
      const { page, pageSize } = this;
      const { data, code } = await CartService.getCartList({
        page,
        pageSize
      });

      if (code === 200) {
        this.page = data.page + 1;

        this.loading = false;
        if (this.page >= data.totalPage) {
          this.finished = true;
        }
        this.goodsList = isScroll
          ? this.goodsList.concat(data.list)
          : data.list;
      }
    },

    routePage(id) {
      this.$router.push({ path: "/goods/detail", query: { id } });
    },

    async onAdd(goods) {
      const { cartId, number } = goods;
      const { data } = await CartService.addCartNumber({
        cartId,
        number: 1
      });
      console.log(data);
      this.page = 0;
      this.fetchList();
    },

    async onSubtract(goods) {
      const { cartId, number } = goods;
      if (number <= 1) return;
      const { data } = await CartService.subtractCartNumber({
        cartId,
        number: 1
      });
      console.log(data);
      this.page = 0;
      this.fetchList();
    },

    async onDeleteGoods(id) {
      const { data, code, msg } = await CartService.deleteCart({ list: [id] });
      console.log(data);
      if (code === 200) {
        this.$toast.success({
          message: "删除成功",
          duration: 500,
          onClose: () => {
            this.page = 0;
            this.fetchList();
          }
        });
      } else {
        this.$toast.fail({
          message: msg
        });
      }
    },

    async onSubmit() {
      console.log(this.result);
      if (!this.result.length) {
        this.$toast.fail({ message: "请选择商品" });
        return;
      }

      let map = {};
      this.result.forEach(item => {
        const goods = this.goodsList[item];
        map[goods.commodity.commodityId] = goods.number;
      });
      const { data } = await OrderService.buyNow({
        ...map
      });
      console.log(data);
      this.$store.dispatch("setOrder", data);
      this.$router.push({ path: "/goods/settle" });
    },

    onLoad() {
      this.fetchList(true);
    }
  },

  mounted() {
    this.fetchList();
  }
};
</script>

<style lang="less">
.goods-cart {
  &-slogan {
    line-height: 2;
    font-size: 12px;
    color: @red;
    display: flex;
    &-item {
      flex: 1;
      text-align: center;
      i {
        font-size: 12px;
        margin-right: 2px;
      }
    }
  }
  &-list {
    &-item {
      background-color: #fff;
      margin-bottom: 12px;
      .content {
        display: flex;
        .van-checkbox {
          padding: 0 10px 0 20px;
        }
      }
    }
  }
  .van-swipe-cell .content {
    display: flex;
    .van-card {
      flex-grow: 2;
    }
  }
  .van-card {
    margin: 0;
    padding: 20px 15px 10px 0;
    background-color: #fff;
    &__thumb {
      width: 80px;
      height: 80px;
      border-radius: 4px;
      overflow: hidden;
      img {
        object-fit: fill !important;
      }
    }
    &__tag {
      bottom: 0;
      width: 100%;
      top: auto;
      text-align: center;
      color: #fff;
      line-height: 1.5;
      background-color: rgba(0, 0, 0, 0.4);
    }
    &__content {
      flex-direction: row;
      flex-wrap: wrap;
      min-height: 70px;
    }
    &__title {
      flex-basis: 70%;
    }
    &__bottom {
      flex-basis: 30%;
      display: inline-flex;
      flex-direction: column;
      text-align: right;
      max-height: 40px;
    }
    &__price {
      color: @text-color;
      font-size: 14px;
    }
    &__num {
      color: @grey;
    }
    &__desc {
      order: 1;
      margin-top: 0;
      background-color: @background-color;
      padding: 1px 4px;
      font-size: 12px;
    }
    &__footer {
      position: absolute;
      right: 15px;
      bottom: 15px;
      margin-top: 25px;
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
          outline: none;
          text-align: center;
          border-right: 1px solid @border-color;
          border-left: 1px solid @border-color;
          border-radius: 0;
          padding: 0;
        }
      }
    }
  }
  .van-swipe-cell {
    &__right {
      button {
        display: inline-flex;
        height: 100%;
      }
    }
  }
  footer {
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 50px;
    left: 0;
    right: 0;
    background-color: #fff;
    border-top: 1px solid @border-color;
    border-bottom: 1px solid @border-color;
    .select-all {
      flex-grow: 2;
      background-color: #fff;
      display: inline-flex;
      padding-left: 20px;
    }
    .sum {
      margin-right: 15px;
      .price {
        color: @red;
        font-weight: bold;
      }
    }
    .van-button {
      min-width: 30%;
    }
  }
  .recommend {
    margin: 0 15px;
  }
  .empty {
    .tip {
      background-color: #fff;
      text-align: center;
      padding-bottom: 30px;
      #svg.icon {
        /*font-size: 50px;*/
        width: 260px;
        height: 170px;
        text-align: center;
      }
      button {
        margin-top: 20px;
        height: 25px;
        line-height: 25px;
        width: 150px;
      }
    }
  }
}
</style>
