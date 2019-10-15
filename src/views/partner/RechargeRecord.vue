<template>
  <section id="quota" class="quota">
    <article
      v-if="list.length > 0"
      style="margin-bottom: 10px;"
      class="address-list-item"
      v-for="(item, idx) in list"
      :key="idx"
    >
      <cell-group class="month-detail">
        <cell
          :title="`订单号： ${item.serialNum}`"
          :label="item.createTime"
          :value="item.money"
          is-link
          @click="getUserAmountRecordDetail(item)"
        ></cell>
      </cell-group>
    </article>
    <div v-if="list.length == 0" style="padding-top:130px;text-align:center;">
      <van-image
        height="125"
        fit="contain"
        style="display:block;"
        :src="`${host}/noRecord.png`"
      />
      <span style="font-weight: 400;color: rgba(153,153,153,1);"
        >没有充值记录哦~</span
      >
    </div>
  </section>
</template>

<script>
import { CellGroup, Cell, Icon, Image } from "vant";
import { partnerService } from "../../service/index";

export default {
  components: {
    CellGroup,
    Cell,
    Icon,
    VanImage: Image
  },

  data() {
    return {
      list: [],
      page: 0,
      pageSize: 10,
      loading: false,
      host: location.origin,
      finished: false
    };
  },

  methods: {
    async fetchList() {
      const { page, pageSize } = this;
      const { data } = await partnerService.getRechargeRecord({
        page,
        pageSize
      });
      console.log(data);
      if (!data) return;
      this.page = data.page + 1;

      this.loading = false;
      if (this.page >= data.totalPage) {
        this.finished = true;
      }
      this.list = this.list.concat(data.list);
    },

    getUserAmountRecordDetail(item) {
      this.$router.push({
        name: "record_detail",
        params: {
          serialNum: item.serialNum,
          createTime: item.createTime,
          rank: item.rank,
          amount: item.amount,
          integral: item.integral
        }
      });
    }
  },

  mounted() {
    this.fetchList();
  }
};
</script>

<style lang="less">
.quota {
  label {
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    margin-right: 17px;
    display: inline-block;
    float: right;
    padding-top: 4px;
    font-size: 11px;
  }
  &-month {
    width: 64px;
    height: 25px;
    margin-bottom: 8px;
    margin-left: 15px;
    border-radius: 20px;
    background-color: #fff;
    line-height: 25px;
    text-align: center;
    color: #333;
    display: inline-block;
  }
  .month-detail {
    margin-bottom: 8px;
  }
}
</style>
