<template>
  <div class="payCenter" v-html="payData"></div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: mapState({
    payData: state => state.payData
  }),
  mounted() {
    document.forms[0].submit();
  }
};
</script>
