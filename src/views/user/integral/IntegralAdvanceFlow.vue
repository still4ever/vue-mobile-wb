<template>
  <section class="express">
    <article class="flow">
      <steps
        direction="vertical"
        :active="num"
        active-icon="passed"
        inactive-icon="circle"
        active-color="#FF695C"
      >
        <step>
          <Icon slot="active-icon" name="passed" />
          <Icon slot="inactive-icon" name="circle" />
          <div class="content">提现申请</div>
          <div class="time">2019-01-03- 08:14</div>
        </step>
        <step>
          <Icon slot="active-icon" name="passed" />
          <Icon slot="inactive-icon" name="circle" />
          <div class="content">人工审核通过</div>
          <div class="time">2019-01-03- 08:14</div>
        </step>
        <step>
          <Icon slot="active-icon" name="passed" />
          <Icon slot="inactive-icon" name="circle" />
          <div class="content">已通过建设银行转账</div>
          <div class="time">2019-01-03- 08:14</div>
        </step>
      </steps>
    </article>
  </section>
</template>
<script>
import { Steps, Step, Icon } from "vant";
export default {
  components: {
    Icon,
    Steps,
    Step
  },
  data() {
    return {
      num: 1
    };
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
    .time {
      color: @grey;
      margin-top: 7px;
    }
    .van-step {
      padding-bottom: 40px;
      &__title {
        font-weight: normal;
        color: @grey;
      }
      .van-icon {
        font-size: 18px;
        color: #cdcdcd;
        background-color: #fff;
      }
      .status {
        margin-bottom: 10px;
      }
      &--process,
      &--finish {
        .van-step__title {
          color: @red!important;
        }
        .van-icon {
          color: @red;
        }
      }
      &--finish {
        .van-step__line {
          background-color: @red;
        }
      }
    }
  }
}
</style>
