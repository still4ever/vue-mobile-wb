<template>
  <section class="integral-advance-record">
    <article class="content">
      <van-cell
        v-for="(item, key) in list"
        :key="key"
        class="integral-add"
        title="提现金额"
        :value="`+${item.money}`"
        :label="item.createTime"
        isLink
        @click="routePage(item)"
      />
    </article>
  </section>
</template>

<script>
import { Tab, Tabs, Cell } from "vant";
import { IntegralService } from "../../../service/index";

export default {
  components: {
    Tab,
    Tabs,
    VanCell: Cell
  },
  data() {
    return {
      active: 0,
      page: 0,
      pageSize: 10,
      list: []
    };
  },
  methods: {
    async getData() {
      const { page, pageSize } = this;
      const { data } = await IntegralService.getCashRecord({
        page,
        pageSize
      });
      console.log(data);
      const { list } = data;
      this.list = list;
    },

    routePage() {
      this.$router.push({ path: "/user/integral/advance/flow" });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style lang="less">
.integral-advance-record {
  .content {
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
