<template>
  <section id="overdue_quota" class="overdue_quota">
    <article v-if="list.length > 0" style="margin-bottom: 10px;" class="address-list-item" v-for="(item, idx) in list" :key="idx">
      <!-- <cell-group class="month-detail"> -->
          <cell title="过期退积分" :label=item.createTime is-link :value=item.deduction @click="getUserAmountRecordDetail(item.amountRecId)"></cell>
          <!-- <cell title="过期退积分" is-link value="16800.00"></cell>
          <cell title="过期退积分" is-link value="16800.00"></cell>
          <cell title="过期退积分" is-link value="16800.00"></cell>
          <cell title="过期退积分" is-link value="16800.00"></cell> -->
      <!-- </cell-group> -->
    </article>
  </section>
</template>

<script>
import { CellGroup, Cell } from "vant";
import { partnerService } from "../../service/index";

export default {
  components: {
    CellGroup,
    Cell
  },

  data() {
    return {
      list: [],
      page: 0,
      pageSize: 10,
      loading: false,
      finished: false
    }
  },

  methods: {
    async fetchList() {
      const { page, pageSize } = this;
      const { data } = await partnerService.getUserInvalidAmounRecord({
        page,
        pageSize
      });
      console.log(data);
      if(!data) return;
      this.page = data.page + 1;

      this.loading = false;
      if (this.page >= data.totalPage) {
        this.finished = true;
      }

      this.list = this.list.concat(data.list);
    },

    getUserAmountRecordDetail(amountRecId) {
      this.$router.push({ path: "/partner/chargeback", query: { amountRecId } });
      // partnerService.getUserAmountRecordDetail({amountRecId}).then(({ code, msg, data }) => {
      //     if (code === 200) {
      //         this.$router.push({ path: "/partner/chargeback", params: { data } });
      //     }else {
      //         this.$toast.fail({
      //             message: msg
      //         });
      //     }
      // });
    }
  },

  mounted() {
    this.fetchList();
  }
};  
</script>

<style lang="less">
.overdue_quota {
    padding-top: 12px;
}
</style>
