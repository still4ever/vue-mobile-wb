<template>
  <list
    class="goods-list"
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <div class="wrapper">
      <div
        @click="routePage(item.commodityId)"
        class="goods-list-item"
        v-for="(item, key) in list"
        :key="key"
      >
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
</template>

<script>
import { List } from "vant";
import { GoodsService } from "../../service/index";

export default {
  components: {
    List
  },
  data() {
    console.log(this.$route);
    return {
      list: [],
      page: 0,
      pageSize: 10,
      catalogId: this.$route.query.id,
      loading: false,
      finished: false
    };
  },
  methods: {
    async fetchList() {
      const { page, pageSize, catalogId } = this;
      const { data } = await GoodsService.getGoodsList({
        page,
        pageSize,
        catalogId
      });

      this.page = data.page + 1;

      this.loading = false;
      if (this.page >= data.totalPage) {
        this.finished = true;
      }

      this.list = this.list.concat(data.list);
    },
    routePage(id) {
      this.$router.push({ path: "/goods/detail", query: { id } });
    },
    onLoad() {
      this.fetchList();
    }
  }
};
</script>

<style lang="less" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 12px 15px;
  &-item:nth-of-type(2n) {
    margin-right: 0;
  }
  &-item {
    display: inline-flex;
    flex-direction: column;
    /*width: 169px;*/
    width: calc(50% - 4px);
    height: 220px;
    overflow: hidden;
    border-radius: 4px;
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
</style>
