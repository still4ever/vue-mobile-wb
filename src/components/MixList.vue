<template>
  <section class="mix-list">
    <list
      :value="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="load"
    >
      <slot name="content"></slot>
    </list>
  </section>
</template>

<script>
import { List } from "vant";

export default {
  name: "mixList",
  components: {
    List
  },
  props: {
    loading: Boolean,
    finished: Boolean
  },
  methods: {
    load() {
      console.log(555);
      this.$emit("load");
    }
  }
};
</script>

<style lang="less"></style>
