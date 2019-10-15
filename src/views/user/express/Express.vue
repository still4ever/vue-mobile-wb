<template>
  <section class="express">
    <article class="goods">
      <div class="goods-img"><img :src="express.logo" alt="" /></div>
      <div class="goods-info">
        <h4>{{ express.expName }}</h4>
        <div class="item express-no">
          运单号 {{ express.number }}
          <span class="btn btn-copy" @click="onCopy">复制</span>
        </div>
        <div class="item">官方电话 {{ express.expPhone }}</div>
      </div>
    </article>
    <article class="flow">
      <steps
        direction="vertical"
        :active="express.deliverystatus"
        active-color="#FF695C"
      >
        <step v-for="(item, key) in express.list" :key="key">
          <h3>{{ item.status }}</h3>
          <p>{{ item.time }}</p>
        </step>
      </steps>
    </article>
    <!--<article class="flow">-->
    <!--<steps direction="vertical" :active="num" active-color="#333">-->
    <!--<step>-->
    <!--<Icon-->
    <!--slot="active-icon"-->
    <!--class-prefix="iconfont"-->
    <!--name="shouhuodizhi"-->
    <!--/>-->
    <!--<Icon-->
    <!--slot="inactive-icon"-->
    <!--class-prefix="iconfont"-->
    <!--name="shouhuodizhi"-->
    <!--/>-->
    <!--<div class="time">-->
    <!--<span class="d">05-09</span><span class="h">11:47</span>-->
    <!--</div>-->
    <!--<div class="content">-->
    <!--【收货地址】浙江省义乌市 义务街道 义务车重 点站对面的义务平价店-->
    <!--</div>-->
    <!--</step>-->
    <!--<step>-->
    <!--<Icon slot="active-icon" class-prefix="iconfont" name="yunshuzhong" />-->
    <!--<Icon-->
    <!--slot="inactive-icon"-->
    <!--class-prefix="iconfont"-->
    <!--name="yunshuzhong"-->
    <!--/>-->
    <!--<div class="status">运输中</div>-->
    <!--<div class="content">【义务市】快件离开义务市中转部已发往义务</div>-->
    <!--</step>-->
    <!--<step>-->
    <!--<div class="status">运输中</div>-->
    <!--<div class="content">【义务市】快件离开义务市中转部已发往义务</div>-->
    <!--</step>-->
    <!--<step>-->
    <!--<div class="status">运输中</div>-->
    <!--<div class="content">【义务市】快件离开义务市中转部已发往义务</div>-->
    <!--</step>-->
    <!--<step>-->
    <!--<Icon slot="active-icon" class-prefix="iconfont" name="yilanjian" />-->
    <!--<Icon slot="inactive-icon" class-prefix="iconfont" name="yilanjian" />-->
    <!--<div class="status">已揽件</div>-->
    <!--<div class="content">-->
    <!--【上海市】上海嘉定区公司-->
    <!--<span class="phone"> 12345678910 </span>已揽收-->
    <!--</div>-->
    <!--</step>-->
    <!--<step>-->
    <!--<Icon slot="active-icon" class-prefix="iconfont" name="yichucangku" />-->
    <!--<Icon-->
    <!--slot="inactive-icon"-->
    <!--class-prefix="iconfont"-->
    <!--name="yichucangku"-->
    <!--/>-->
    <!--<div class="status">已出库</div>-->
    <!--<div class="content">您的包裹已出库</div>-->
    <!--</step>-->
    <!--<step>-->
    <!--<Icon slot="active-icon" class-prefix="iconfont" name="yifahuo" />-->
    <!--<Icon slot="inactive-icon" class-prefix="iconfont" name="yifahuo" />-->
    <!--<div class="status">已发货</div>-->
    <!--<div class="content">卖家发货</div>-->
    <!--</step>-->
    <!--<step>-->
    <!--<Icon slot="active-icon" class-prefix="iconfont" name="yixiadan" />-->
    <!--<Icon slot="inactive-icon" class-prefix="iconfont" name="yixiadan" />-->
    <!--<div class="status">已下单</div>-->
    <!--<div class="content">您的订单待配货</div>-->
    <!--</step>-->
    <!--</steps>-->
    <!--</article>-->
  </section>
</template>
<script>
import { Steps, Step, Icon } from "vant";
import { OrderService } from "../../../service/index";

export default {
  components: {
    Icon,
    Steps,
    Step
  },
  data() {
    return {
      num: 1,
      express: {}
    };
  },

  methods: {
    async getData() {
      const { num } = this.$route.query;
      const { data } = await OrderService.getExpress({
        number: num
      });
      this.express = JSON.parse(data).result;
      console.log(this.express);
    },

    onCopy() {
      this.$copyText(this.express.number).then(
        () => this.$toast({ message: "复制成功", duration: 500 }),
        () => this.$toast({ message: "复制失败", duration: 500 })
      );
    }
  },

  mounted() {
    this.getData();
  }
};
</script>
<style lang="less">
.express {
  .goods {
    padding: 15px 20px;
    display: flex;
    background-color: #fff;
    &-img {
      width: 50px;
      height: 50px;
      overflow: hidden;
      font-size: 0;
      margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-info {
      h4 {
        margin: 0;
      }
      .express-no {
      }
      .item {
        font-size: 12px;
      }
      .btn.btn-copy {
        padding: 1px 4px;
        display: inline-flex;
        background-color: @border-color;
        margin-left: 20px;
        border-radius: 14px;
      }
    }
  }
  .flow {
    padding: 30px 15px;
    background-color: #fff;
    margin-top: 12px;
  }
  .van-steps {
    h3,
    p {
      margin: 0;
      line-height: 1.5;
    }
    h3 {
      font-size: 14px;
    }
    p {
      font-size: 12px;
    }
    .time {
      position: absolute;
      top: 0;
      left: -75px;
      display: flex;
      flex-direction: column;
      text-align: right;
      .h {
        font-size: 12px;
      }
    }
    .phone {
      color: #f65d09;
      word-break: break-all;
    }
    .van-step {
      &__title {
        font-weight: normal;
        color: @grey;
      }
      .iconfont {
        font-size: 24px;
        color: #cdcdcd;
      }
      .status {
        margin-bottom: 10px;
      }
      &--process,
      &--finish {
        .van-step__title {
          color: #333;
        }
        .iconfont {
          color: @red;
        }
        .van-step__line {
          background-color: #eee;
        }
      }
    }
  }
}
</style>
