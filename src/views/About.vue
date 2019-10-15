<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="onAdd">+</button>
    <div v-for="item in arr">{{ item.a }}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      arr: [{ a: 1 }, { a: 2 }, { a: 3 }]
    };
  },
  // computed: {
  //   arr() {
  //     return [1, 2, 3];
  //   }
  // },
  methods: {
    onAdd() {
      this.arr.unshift({ a: 0 });
    }
  }
};
</script>
