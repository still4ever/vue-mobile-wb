<template>
  <list
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
</template>

<script>
    import { Tab, Tabs, Card, Button, List } from "vant";
    import { OrderService } from "../../../../service/index";
    import { orderStatusMap } from "../../../../utils/util";

    export default {
        name: "OList",
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
                pageSize: 10,
                allList: [],
                waitPayList: [],
                waitExpressList: [],
                waitReceiveList: [],
                loading: false,
                finished: false
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
                console.log(this.active === 10, "111");
                this.page = 0;
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
                        this.waitPayList = data.list;
                        break;
                    case 20:
                        this.waitExpressList = data.list;
                        break;
                    case 120:
                        this.waitReceiveList = data.list;
                        break;
                }
            },

            onLoad() {
                this.getData(true);
            }
        },
        mounted() {
            if (this.$route.params.type) this.active = this.$route.params.type;
        }
    };
</script>

<style scoped>

</style>