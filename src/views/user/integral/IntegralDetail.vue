<template>
  <section id="integral-detail" class="integral-detail">
    <header>
<!--      <span class="title">{{ isDisable ? "冻结积分" : "可用积分" }}</span>-->

<!--      <span class="num" :class="{ disable: !isDisable }"-->
<!--        >{{ !isDisable ? "" : "+" }}{{ data.integral }}</span-->
<!--      >-->
      <span class="title">积分</span>
      <span class="num disable">{{ data.integral }}</span>
    </header>
    <article>
      <div class="item">
        <span class="label">获得方式</span><span>{{ data.typeStr }}</span>
      </div>
      <div class="item">
        <span class="label">时间</span><span>{{ data.createTime }}</span>
      </div>
      <div class="item">
        <span class="label">流水单号</span><span>{{ data.serialNum }}</span>
      </div>
      <div class="item">
        <span class="label">备注</span><span>{{ data.remark }}</span>
      </div>
      <div class="item">
        <span class="label">积分来源</span><span>{{ data.source }}</span>
      </div>
    </article>
  </section>
</template>

<script>
import { Tab, Tabs, Cell } from "vant";
import { mapState } from "vuex";

export default {
  name: "Order",
  components: {
    Tab,
    Tabs,
    VanCell: Cell
  },
  computed: mapState({
    data: state => state.integralDetail,
    isDisable() {
      return !(this.data.category === 10);
    }
  })
};
</script>

<style lang="less">
.integral-detail {
  background-color: #fff;
  padding: 0 15px;
  header {
    padding: 30px 0;
    display: flex;
    flex-direction: column;
    line-height: 1.5;
    align-items: center;
    .title {
      font-size: 16px;
    }
    .num {
      font-size: 24px;
      color: @red;
      &.disable {
        color: @text-color;
      }
    }
    border-bottom: 1px solid @border-color;
  }
  article {
    padding: 15px 0;
    line-height: 2;
    .label {
      display: inline-flex;
      color: @grey;
      width: 70px;
      margin-right: 30px;
    }
  }
}
</style>
