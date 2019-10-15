<template>
  <section class="edit-nickname">
    <field v-model="nickName" placeholder="请输入昵称">
      <van-button slot="button" size="small" type="danger" @click="onSubmit"
        >确定</van-button
      >
    </field>
    <div class="tip">
      4-20个字符，可由中英文、数字、“-”组成，一个汉字为两个字符
    </div>
  </section>
</template>

<script>
import { Field, Button } from "vant";
import { mapState } from "vuex";
import { UserService } from "../../../service/index";

export default {
  components: {
    Field,
    VanButton: Button
  },
  computed: mapState({
    user: state => state.userInfo
  }),
  data() {
    return {
      nickName: ""
    };
  },
  methods: {
    async onSubmit() {
      const { data, code } = await UserService.updateNickName({
        nickName: this.nickName
      });
      if (code === 200) {
        this.$toast.success({
          message: "修改成功",
          duration: 500,
          onClose: () => {
            this.$store.dispatch("setUserInfo");
            this.$router.go(-1);
          }
        });
      }
    },

    routePage() {
      this.$router.push({ path: "/user/info/advance" });
    }
  },
  mounted() {
    this.nickName = this.user.nickName;
  }
};
</script>

<style lang="less">
.edit-nickname {
  padding-top: 20px;
  .van-field {
  }
  .tip {
    font-size: 12px;
    padding: 12px;
    color: @grey;
  }
}
</style>
