<template>
  <section class="person-info">
    <cell-group class="info-link">
      <cell title="更换头像" is-link @click="onShow">
        <div slot="default"><vant-image :src="user.headUrl" /></div>
      </cell>
      <cell
        title="昵称"
        is-link
        :value="user.nickName"
        to="/user/edit/nickname"
      >
      </cell>
    </cell-group>
    <van-dialog v-model="show" confirmButtonText="取消" title="上传头像">
      <div class="upload">
        <uploader :after-read="afterRead" v-model="file" />
        <p>从手机相册中选择</p>
      </div>
    </van-dialog>
  </section>
</template>

<script>
import { CellGroup, Cell, Icon, Image, Uploader } from "vant";
import { mapState } from "vuex";
import { UserService } from "../../../service/index";

export default {
  components: {
    CellGroup,
    Cell,
    Icon,
    VantImage: Image,
    Uploader
  },
  computed: mapState({
    user: state => state.userInfo
  }),
  data() {
    return {
      show: false,
      file: []
    };
  },
  methods: {
    onShow() {
      this.show = !this.show;
    },

    async afterRead(file) {
      console.log(file, this.file);
      const { data, code } = await UserService.upload({ file: file.file });
      if (code === 200) {
        this.$toast.success({
          message: "上传成功",
          duration: 500,
          onClose: () => {
            this.$store.dispatch("setUserInfo");
            this.file = [];
            this.onShow();
          }
        });
      }
    },

    routePage() {
      this.$router.push({ path: "/user/info/advance" });
    }
  },
  mounted() {}
};
</script>

<style lang="less">
.person-info {
  padding-top: 20px;
  background-color: #f4f4f4;
  .van-cell {
    border-bottom: 1px solid @border-color;
    height: 60px;
  }
  .van-image {
    border-radius: 50%;
    overflow: hidden;
    width: 40px;
    height: 40px;
  }
  .van-dialog {
    &__header {
      font-size: 18px;
      line-height: 3;
      padding-top: 0;
      border-bottom: 1px solid @border-color;
    }
    .upload {
      position: relative;
      p {
        text-align: center;
        margin: 0;
        line-height: 3;
      }
    }
    .van-uploader {
      position: absolute;
      opacity: 0;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      &__wrapper {
        height: 100%;
      }
      &__upload {
        width: 100%;
        height: 100%;
        margin: 0;
      }
    }
    .van-button {
      color: @red;
    }
  }
}
</style>
