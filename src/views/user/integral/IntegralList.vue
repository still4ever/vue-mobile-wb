<template>
  <section id="integral-list" class="integral-list">
    <article class="content">
      <list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
      >
        <van-cell
            v-for="(item, key) in allList"
            :key="key"
            :class="{ 'integral-add': item.category === 20 }"
            :title="item.remark"
            :value="`${item.category === 20 ? '+' : ''}${item.integral}`"
            :label="item.createTime"
            isLink
            @click="routePage(item)"
        />
      </list>
    </article>
<!--    <tabs v-model="active" @change="onChange" sticky>-->
<!--      <tab>-->
<!--        <article class="content">-->
<!--          <list-->
<!--            v-model="loading"-->
<!--            :finished="finished"-->
<!--            finished-text="没有更多了"-->
<!--            @load="onLoad"-->
<!--          >-->
<!--            <van-cell-->
<!--              v-for="(item, key) in allList"-->
<!--              :key="key"-->
<!--              :class="{ 'integral-add': item.category === 20 }"-->
<!--              :title="item.remark"-->
<!--              :value="`${item.category === 20 ? '+' : ''}${item.integral}`"-->
<!--              :label="item.createTime"-->
<!--              isLink-->
<!--              @click="routePage(item)"-->
<!--            />-->
<!--          </list>-->
<!--        </article>-->
<!--      </tab>-->
      <!-- <tab title="可用">
        <article class="content">
          <van-cell
            v-for="(item, key) in enableList"
            :key="key"
            :class="{ 'integral-add': item.category === 20 }"
            :title="item.remark"
            :value="`${item.category === 20 ? '+' : ''}${item.integral}`"
            :label="item.createTime"
            isLink
            @click="routePage(item)"
          />
        </article>
      </tab> -->
      <!-- <tab title="冻结">
        <article class="content">
          <van-cell
            v-for="(item, key) in frozenList"
            :key="key"
            :class="{ 'integral-add': item.category === 20 }"
            :title="item.remark"
            :value="`${item.category === 20 ? '+' : ''}${item.integral}`"
            :label="item.createTime"
            isLink
            @click="routePage(item)"
          />
        </article>
      </tab> -->
<!--    </tabs>-->
  </section>
</template>

<script>
import { Tab, Tabs, Cell, List } from "vant";
import { IntegralService } from "../../../service/index";

export default {
  name: "Order",
  components: {
    Tab,
    Tabs,
    VanCell: Cell,
    List
  },
  data() {
    return {
      active: 0,
      page: 0,
      pageSize: 10,
      allList: [],
      enableList: [],
      frozenList: [],
      loading: false,
      finished: false
    };
  },
  computed: {
    catalog() {
      const list = ["isAll", "enable", "frozen"];

      return list[this.active];
    }
  },
  methods: {
    async getData() {
      const { page, pageSize, catalog } = this;
      const { data } = await IntegralService.getRecord({
        page,
        pageSize,
        catalog
      });
      this.page = data.page + 1;

      this.loading = false;
      if (this.page >= data.totalPage) {
        this.finished = true;
      }

      switch (catalog) {
        case "isAll":
          Object.assign(this.allList, data.list);
          break;
        case "enable":
          this.enableList = data.list;
          break;
        case "frozen":
          this.frozenList = data.list;
          break;
      }
    },

    onChange() {
      this.getData();
    },

    routePage(data) {
      this.$store.dispatch("setIntegralDetail", data);
      this.$router.push({ path: "/user/integral/Detail" });
    },

    onLoad() {
      this.getData();
    }
  },
  mounted() {}
};
</script>

<style lang="less">
.integral-list {
  .content {
    margin-top: 12px;
    .van-cell__value {
      color: @text-color;
    }
    .integral-add {
      .van-cell__value {
        color: @red;
      }
    }
  }
}
</style>
