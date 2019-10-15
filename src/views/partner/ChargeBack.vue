<template>
  <section id="chargeback" class="chargeback">
    <div class="item">
        <label class="key">订单号</label>
        <label class="value">{{serialNum}}</label>
    </div>
    <div class="item">
        <label class="key">消费日期</label>
        <label class="value">{{createTime}}</label>
    </div>
    <div class="item">
        <label class="key">消费者名称</label>
        <label  class="value">{{consumer}}</label>
    </div>
    <div class="item">
        <label class="key">扣除额度</label>
        <label class="value">{{deduction}}</label>
    </div>
    <div class="item">
        <label class="key">所得积分</label>
        <label class="value">{{integral}}</label>
    </div>
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
          serialNum: '',
          createTime: '',
          consumer: '',
          deduction: '',
          integral: ''
      }
  },

  methods: {
      setData() {
        let amountRecId = this.$route.query.amountRecId;
        partnerService.getUserAmountRecordDetail({amountRecId}).then(({ code, msg, data }) => {
            if (code === 200) {
                this.serialNum = data.serialNum;
                this.createTime = data.createTime;
                this.consumer = data.consumer;
                this.deduction = data.deduction;
                this.integral = data.integral;
            }else {
                this.$toast.fail({
                    message: msg
                });
            }
        })
    }
  },

  mounted() {
    this.setData();
  }
};
</script>

<style lang="less">
.chargeback {
    background-color: #FFF;
    padding-top: 16px;
    padding-left: 15px;
    padding-bottom: 10px;
    .item {
        margin-bottom: 15px;
    }
    .key {
        color:#757575;
        width: 125px;
        display: inline-block;
    }
    .value {
        color: #333333;
    }
}
</style>
