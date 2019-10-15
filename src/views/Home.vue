<template>
  <section id="home" class="home">
    <div class="search_box">
      <search placeholder="搜索商品，共352款好物" class="search" />
      <Icon
        name="xinxi"
        class="notice"
        class-prefix="iconfont"
        color="#333333"
      />
    </div>
    <div class="swipe">
      <Swipe :autoplay="3000">
        <SwipeItem v-for="(item, index) in advetising" :key="index">
          <img :src="item.url" />
        </SwipeItem>
      </Swipe>
      <label class="ensure_tips"
        ><Icon name="duigou" class-prefix="iconfont" />高端自营品牌</label
      >
      <label class="ensure_tips"
        ><Icon name="duigou" class-prefix="iconfont" />30天无忧退货</label
      >
      <label class="ensure_tips"
        ><Icon name="duigou" class-prefix="iconfont" />48小时快速退款</label
      >
    </div>
    <div class="suit" v-if="catalog[0]">
      <div style="margin-bottom: 11px;">
        <label class="suit_title">热销套装精品</label>
        <router-link
          :to="{ path: '/goods/list', query: { id: catalog[0].catalogId } }"
          class="suit_more"
          >更多</router-link
        >
        <Icon
          name="left"
          class="left"
          class-prefix="iconfont"
          style="font-size: 10px;"
        />
      </div>
      <list class="goods-list" finished-text="没有更多了">
        <div class="wrapper">
          <div @click="routePage(item.commodityId)" class="goods-list-item" v-for="(item, idx) in catalog[0].commodityList" :key="idx">
            <div class="goods-img"><img :src="item.url" alt="" /></div>
          </div>
        </div>
      </list>
      <!-- <van-image
        width="49%"
        height="136px"
        fit="cover"
        v-for="(item, idx) in catalog[0].commodityList"
        :key="idx"
        :src="item.url"
        @click="routePage(item.commodityId)"
      /> -->
    </div>
    <div class="unit" v-if="catalog[1]">
      <div style="margin-bottom: 11px;">
        <label class="unit_title">畅销单品</label>
        <router-link
          :to="{ path: '/goods/list', query: { id: catalog[1].catalogId } }"
          class="unit_more"
          >更多</router-link
        >
        <Icon
          name="left"
          class="left"
          class-prefix="iconfont"
          style="font-size: 10px;"
        />
      </div>
      <list class="goods-list" finished-text="没有更多了">
        <div class="wrapper">
          <div @click="routePage(item.commodityId)" class="goods-list-item" v-for="(item, idx) in catalog[1].commodityList" :key="idx" style="height:210px">
            <div class="goods-img"><img :src="item.url" alt="" /></div>
            <div class="goods-info">
              <div class="title">{{ item.title }} {{ item.description }}</div>
              <div class="foot">
                <div class="price">￥{{ item.price }}</div>
              </div>
          </div>
          </div>
        </div>
      </list>
      <!-- <van-image
        width="170px"
        height="136px"
        fit="cover"
        v-for="(item, idx) in catalog[1].commodityList"
        :key="idx"
        :src="item.url"
        @click="routePage(item.commodityId)"
      /> -->
    </div>
  </section>
</template>
<script>
import { Search, Icon, Swipe, SwipeItem, Image, List } from "vant";
import { GoodsService } from "../service/index";

export default {
  components: {
    Search,
    Icon,
    Swipe,
    List,
    SwipeItem,
    VanImage: Image
  },

  data() {
    return {
      images: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg",
        "https://img.yzcdn.cn/vant/apple-3.jpg",
        "https://img.yzcdn.cn/vant/apple-4.jpg"
      ],
      advetising: [],
      catalog: []
    };
  },
  methods: {
    async fetchData() {
      const { data } = await GoodsService.getHomeDetail();
      console.log(data);
      const { advetising, catalog } = data;
      this.advetising = advetising;
      this.catalog = catalog;
    },

    routePage(id) {
      this.$router.push({ path: "/goods/detail", query: { id } });
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<style lang="less">
.goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  &-item:nth-of-type(2n) {
    margin-right: 0;
  }
  &-item {
    display: inline-flex;
    flex-direction: column;
    width: calc(50% - 4px);
    height: 136px;
    overflow: hidden;
    margin: 0 7px 7px 0;
    background-color: #fff;
    .goods-img {
      width: 100%;
      height: 144px;
      overflow: hidden;
      font-size: 0;
      img {
        width: 100%;
        min-height: 100%;
      }
    }
    .goods-info {
      padding: 4px 8px;
      display: flex;
      flex-grow: 2;
      flex-direction: column;
      justify-content: space-between;
      .title {
        width: 100%;
        word-break: break-all;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .foot {
        display: flex;
        justify-content: space-between;
        .price {
          color: #ee2828;
        }
      }
    }
  }
}
.home {
  padding-top: 12px;
  .search_box {
    background-color: #ffffff;
    border-bottom: 1px solid #f1f3f4;
    .search {
      display: inline-block;
      width: 338px;
    }
    .notice {
      font-size: 22px;
    }
  }
  .swipe {
    border-radius: 5px;
    padding-left: 16px;
    background-color: #fff;
    padding-right: 16px;
    padding-bottom: 8px;
    .van-swipe img {
      display: block;
      box-sizing: border-box;
      width: 100%;
      height: 164px;
      padding: 30px 60px;
      background-color: #fff;
      pointer-events: none;
    }
    .ensure_tips {
      font-size: 10px;
      font-weight: 400;
      color: rgba(240, 110, 81, 1);
      display: inline-block;
      margin-right: 24px;
    }
    .ensure_tips i {
      font-size: 10px;
    }
  }
  .suit {
    margin-top: 12px;
    background-color: #fff;
    padding-top: 10px;
    padding-left: 15px;
    padding-right: 15px;
    .suit_title {
      font-size: 16px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    .suit_more {
      font-size: 13px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      display: inline-block;
      margin-left: 210px;
    }
    .left {
      font-size: 10px;
    }
    .van-image {
      margin-right: 5px;
    }
  }
  .unit {
    margin-top: 12px;
    background-color: #fff;
    padding-top: 10px;
    padding-left: 15px;
    padding-right: 15px;
    .unit_title {
      font-size: 16px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    .unit_more {
      font-size: 13px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      display: inline-block;
      margin-left: 242px;
    }
    .left {
      font-size: 10px;
    }
    .van-image {
      margin-right: 9px;
    }
  }
}
</style>
