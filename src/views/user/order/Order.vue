<template>
  <section class="user-order-list">
    <tabs v-model="active" @change="onTab" sticky>
      <tab title="全部" :name="0">
        <list
          v-if="allList.length > 0"
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <article class="order" v-for="(item, key) in allList" :key="key">
            <div class="order-status">
              <span class="date">{{ item.createTime }}</span
              ><span class="status">{{ orderStatusMap[item.state] }}</span>
            </div>
            <article class="order-main">
              <card
                v-for="(goods, idx) in item.commodityList"
                :key="idx"
                :num="goods.commodityId"
                :price="goods.price"
                :desc="goods.keywords"
                :title="goods.title"
                :thumb="goods.url"
              />
            </article>
            <footer>
              <div class="sum">
                共{{ item.commodityList.length }}件商品 应付总额：￥{{
                  item.actual
                }}
              </div>
              <div class="action">
                <vant-button
                  v-if="item.state === 10"
                  size="small"
                  type="default"
                  @click="onCancelOrder(item.orderId)"
                  >取消订单</vant-button
                >
                <vant-button
                  v-if="/120|140/.test(item.state)"
                  size="small"
                  type="default"
                  @click="onDelOrder(item.orderId)"
                  >删除订单</vant-button
                >
                <vant-button
                  v-if="item.logisticsNum"
                  size="small"
                  type="default"
                  @click="onRouteLink(item.logisticsNum)"
                  >查看物流</vant-button
                >
                <vant-button
                  v-if="item.state === 10"
                  size="small"
                  type="danger"
                  @click="payNow(item)"
                  >立即付款</vant-button
                >
                <vant-button
                  v-if="item.state === 140"
                  size="small"
                  plain
                  type="danger"
                  @click="buyAgain(item.commodityList)"
                  >再次购买</vant-button
                >
              </div>
            </footer>
          </article>
        </list>
        <empty txt="暂无订单" v-else></empty>
      </tab>
      <tab :name="10" title="待付款">
        <list
          v-if="waitPayList.length > 0"
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <article class="order" v-for="(item, key) in waitPayList" :key="key">
            <div class="order-status">
              <span class="date">{{ item.createTime }}</span
              ><span class="status">{{ orderStatusMap[item.state] }}</span>
            </div>
            <article class="order-main">
              <card
                v-for="(goods, idx) in item.commodityList"
                :key="idx"
                :num="goods.commodityId"
                :price="goods.price"
                :desc="goods.keywords"
                :title="goods.title"
                :thumb="goods.url"
              />
            </article>
            <footer>
              <div class="sum">
                共{{ item.commodityList.length }}件商品 应付总额：￥{{
                  item.actual
                }}
              </div>
              <div class="action">
                <vant-button
                  v-if="item.state === 10"
                  size="small"
                  type="default"
                  @click="onCancelOrder(item.orderId)"
                  >取消订单</vant-button
                >
                <vant-button
                  v-if="/120|140/.test(item.state)"
                  size="small"
                  type="default"
                  @click="onDelOrder(item.orderId)"
                  >删除订单</vant-button
                >
                <vant-button
                  v-if="item.logisticsNum"
                  size="small"
                  type="default"
                  @click="onRouteLink(item.logisticsNum)"
                  >查看物流</vant-button
                >
                <vant-button
                  v-if="item.state === 10"
                  size="small"
                  type="danger"
                  @click="payNow(item)"
                  >立即付款</vant-button
                >
                <vant-button
                  v-if="item.state === 140"
                  size="small"
                  plain
                  type="danger"
                  @click="buyAgain(item.commodityList)"
                  >再次购买</vant-button
                >
              </div>
            </footer>
          </article>
        </list>
        <empty txt="暂无订单" v-else></empty>
      </tab>
      <tab :name="20" title="待发货">
        <list
          v-if="waitExpressList.length > 0"
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <article
            class="order"
            v-for="(item, key) in waitExpressList"
            :key="key"
          >
            <div class="order-status">
              <span class="date">{{ item.createTime }}</span
              ><span class="status">{{ orderStatusMap[item.state] }}</span>
            </div>
            <article class="order-main">
              <card
                v-for="(goods, idx) in item.commodityList"
                :key="idx"
                :num="goods.commodityId"
                :price="goods.price"
                :desc="goods.keywords"
                :title="goods.title"
                :thumb="goods.url"
              />
            </article>
            <footer>
              <div class="sum">
                共{{ item.commodityList.length }}件商品 应付总额：￥{{
                  item.actual
                }}
              </div>
              <div class="action">
                <vant-button
                  v-if="item.state === 10"
                  size="small"
                  type="default"
                  @click="onCancelOrder(item.orderId)"
                  >取消订单</vant-button
                >
                <vant-button
                  v-if="/120|140/.test(item.state)"
                  size="small"
                  type="default"
                  @click="onDelOrder(item.orderId)"
                  >删除订单</vant-button
                >
                <vant-button
                  v-if="item.logisticsNum"
                  size="small"
                  type="default"
                  @click="onRouteLink(item.logisticsNum)"
                  >查看物流</vant-button
                >
                <vant-button
                  v-if="item.state === 10"
                  size="small"
                  type="danger"
                  @click="payNow(item)"
                  >立即付款</vant-button
                >
                <vant-button
                  v-if="item.state === 140"
                  size="small"
                  plain
                  type="danger"
                  @click="buyAgain(item.commodityList)"
                  >再次购买</vant-button
                >
              </div>
            </footer>
          </article>
        </list>
        <empty txt="暂无订单" v-else></empty>
      </tab>
      <tab :name="120" title="待收货">
        <list
          v-if="waitReceiveList.length > 0"
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <article
            class="order"
            v-for="(item, key) in waitReceiveList"
            :key="key"
          >
            <div class="order-status">
              <span class="date">{{ item.createTime }}</span
              ><span class="status">{{ orderStatusMap[item.state] }}</span>
            </div>
            <article class="order-main">
              <card
                v-for="(goods, idx) in item.commodityList"
                :key="idx"
                :num="goods.commodityId"
                :price="goods.price"
                :desc="goods.keywords"
                :title="goods.title"
                :thumb="goods.url"
              />
            </article>
            <footer>
              <div class="sum">
                共{{ item.commodityList.length }}件商品 应付总额：￥{{
                  item.actual
                }}
              </div>
              <div class="action">
                <vant-button
                  v-if="item.state === 10"
                  size="small"
                  type="default"
                  @click="onCancelOrder(item.orderId)"
                  >取消订单</vant-button
                >
                <vant-button
                  v-if="/120|140/.test(item.state)"
                  size="small"
                  type="default"
                  @click="onDelOrder(item.orderId)"
                  >删除订单</vant-button
                >
                <vant-button
                  v-if="item.logisticsNum"
                  size="small"
                  type="default"
                  @click="onRouteLink(item.logisticsNum)"
                  >查看物流</vant-button
                >
                <vant-button
                  v-if="item.state === 10"
                  size="small"
                  type="danger"
                  @click="payNow(item)"
                  >立即付款</vant-button
                >
                <vant-button
                  v-if="item.state === 140"
                  size="small"
                  plain
                  type="danger"
                  @click="buyAgain(item.commodityList)"
                  >再次购买</vant-button
                >
              </div>
            </footer>
          </article>
        </list>
        <empty txt="暂无订单" v-else></empty>
      </tab>
    </tabs>
  </section>
</template>

<script>
import { Tab, Tabs, Card, Button, List } from "vant";
import { OrderService } from "../../../service/index";
import { orderStatusMap } from "../../../utils/util";

export default {
  name: "Order",
  components: {
    Tab,
    Tabs,
    List,
    Card,
    VantButton: Button
  },
  data() {
    return {
      numStyle: {
        color: "#fff",
        fontSize: "12px",
        position: "absolute",
        top: "5px",
        right: "12px",
        width: "20px",
        height: "20px",
        lineHeight: "20px",
        borderRadius: "20px",
        backgroundColor: "#FF695C"
      },
      orderStatusMap,
      active: 0,
      page: 0,
      pageSize: 15,
      allList: [],
      waitPayList: [],
      waitExpressList: [],
      waitReceiveList: [],
      loading: false,
      finished: false,
      immediateCheck: false
    };
  },
  methods: {
    onCancelOrder(orderId) {
      this.$dialog({
        title: "提示",
        message: "确定要取消订单吗？",
        showCancelButton: true
      }).then(async () => {
        const { code, msg } = await OrderService.cancelOrder({ orderId });
        if (code === 200) {
          this.$toast.success({
            message: "取消订单成功",
            duration: 500,
            onClose: () => {
              this.page = 0;
              this.getData();
            }
          });
        } else {
          this.$toast.fail({ message: msg });
        }
      });
    },

    async onDelOrder(orderId) {
      this.$dialog({
        title: "提示",
        message: "确定要删除订单吗？",
        showCancelButton: true
      }).then(async () => {
        const { code, msg } = await OrderService.deleteOrder({ orderId });
        if (code === 200) {
          this.$toast.success({
            message: "删除订单成功",
            duration: 500,
            onClose: () => {
              this.getData();
            }
          });
        } else {
          this.$toast.fail({ message: msg });
        }
      });
    },

    // 立即付款
    async payNow(order) {
      const { orderId } = order;
      const { code, data, msg } = await OrderService.repayOrder({
        orderId,
        url: `${location.origin}/goods/pay/success?type=1`,
        payType: 10
      });

      if (code === 200) {
        this.$store.dispatch("setPayData", data);
        this.$router.push({ path: "/payCenter" });
      } else {
        this.$toast.fail({ message: msg });
      }
    },

    buyAgain(goods) {
      this.$router.push({
        path: "/goods/detail",
        query: { id: goods[0].commodityId }
      });
    },

    onRouteLink(num) {
      this.$router.push({ path: "/user/express", query: { num } });
    },

    onTab() {
      this.page = 0;
      this.finished = false;
      this.loading = false;
      this.getData();
    },

    async getData(isScroll) {
      const { page, pageSize, active } = this;
      const { data } = await OrderService.getList({
        page,
        pageSize,
        state: active
      });
      this.page = data.page + 1;

      this.loading = false;
      if (this.page >= data.totalPage) {
        this.finished = true;
      }
      switch (active) {
        case 0:
          this.allList = isScroll ? [...this.allList, ...data.list] : data.list;

          break;
        case 10:
          this.waitPayList = isScroll
            ? [...this.waitPayList, ...data.list]
            : data.list;

          break;
        case 20:
          this.waitExpressList = isScroll
            ? [...this.waitExpressList, ...data.list]
            : data.list;

          break;
        case 120:
          this.waitReceiveList = isScroll
            ? [...this.waitReceiveList, ...data.list]
            : data.list;

          break;
      }
    },

    onLoad() {
      this.getData(true);
    }
  },
  mounted() {
    if (this.$route.params.type) this.active = this.$route.params.type;
    this.getData();
  }
};
</script>

<style lang="less">
.user-order-list {
  .order {
    margin-top: 12px;
    background-color: #fff;
    &-status {
      display: flex;
      justify-content: space-between;
      padding: 12px 15px;
      font-size: 12px;
      border-bottom: 1px solid @border-color;
      background-color: #fff;
      .date {
        color: @grey;
      }
      .status {
        color: @red;
      }
    }
    &-main {
      padding: 20px 15px 10px;
    }
    .van-card {
      margin-bottom: 10px;
      padding: 0;
      background-color: #fff;
      &:last-of-type {
        margin-bottom: 0;
      }
      &__thumb {
        width: 70px;
        height: 70px;
        img {
          object-fit: fill !important;
        }
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
        /*font-size: 14px;*/
        color: @text-color;
      }
      &__num {
        color: @grey;
      }
      &__desc {
        line-height: 20px;
        order: 1;
        margin-top: 0;
        background-color: @background-color;
        padding: 0 8px;
      }
      &__footer {
        margin-top: 25px;
        .sum {
          margin-bottom: 8px;
        }
      }
    }
    footer {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-end;
      padding-right: 15px;
      flex-direction: column;
      .sum {
        color: #333;
      }
      .action {
        padding: 10px 0;
        .van-button {
          margin-left: 10px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
