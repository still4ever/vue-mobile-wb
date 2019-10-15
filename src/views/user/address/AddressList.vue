<template>
  <section class="address-list">
    <article
      v-if="list.length > 0"
      class="address-list-item"
      v-for="(item, idx) in list"
      :key="idx"
      @click="onSelectAddress(item)"
    >
      <div class="info">
        <div>{{ item.name }}，{{ item.phone }}</div>
        <div>{{ item.area }}{{ item.address }}</div>
      </div>
      <div class="action">
        <checkbox
          @click="setDefAddr(item)"
          v-model="item.isDefault"
          checked-color="#FF695C"
          >{{ item.isDefault ? "已设为默认地址" : "设为默认" }}</checkbox
        >
        <div class="btn-wrapper">
          <vant-button @click="onEdit(item)">编辑</vant-button>
          <vant-button v-if="!item.isDefault" @click="onDel(item.addressId)"
            >删除</vant-button
          >
        </div>
      </div>
    </article>
    <article v-else class="none-data">
      <Icon
        slot="icon"
        color="#DEDEDE"
        size="75"
        class-prefix="iconfont"
        name="wushouhuodizhisvg"
      />
      <p>没有收货地址收不了快递哦~</p>
    </article>
    <vant-button class="add-addr-btn" type="danger" size="large" @click="onAdd"
      >新增地址</vant-button
    >
  </section>
</template>

<script>
import { Checkbox, Button, Icon } from "vant";
import { AddressService } from "../../../service/index";

export default {
  name: "AddressList",
  components: {
    Checkbox,
    VantButton: Button,
    Icon
  },
  data() {
    return {
      list: []
    };
  },
  methods: {
    onSelectAddress(data) {
      if (this.$route.query.isSelect) {
        this.$store.dispatch("setOrderAddress", data);
        this.$router.go(-1);
      }
    },

    onAdd() {
      this.$router.push({ path: "/user/address/add" });
    },

    onEdit(data) {
      this.$router.push({ name: "userAddressEdit", params: { ...data } });
    },

    onDel(addressId) {
      this.$dialog({
        title: "删除确认",
        message: "确定要删除该收货地址吗？",
        showCancelButton: true
      })
        .then(async () => {
          console.log("确定");
          const { code } = await AddressService.deleteAddress({
            addressId
          });
          if (code === 200) {
            this.$toast.success({
              message: "删除成功",
              duration: 500,
              onClose: () => {
                this.fetchList();
              }
            });
          }
        })
        .catch(() => {
          console.log("取消");
        });
    },

    async setDefAddr(data) {
      const { addressId, isDefault } = data;
      const { code } = await AddressService.setDefAddress({
        addressId,
        isDefault: Number(!isDefault)
      });
      if (code === 200) {
        this.$toast.success({
          message: "设置成功",
          duration: 500,
          onClose: () => {
            this.fetchList();
          }
        });
      }
    },
    async fetchList() {
      const { data } = await AddressService.getAddressList();
      console.log(data);
      this.list = data;
    }
  },
  mounted() {
    this.fetchList();
  }
};
</script>

<style lang="less">
.address-list {
  padding-top: 12px;
  &-item {
    background-color: #fff;
    padding-left: 15px;
    margin-bottom: 12px;
    .info {
      border-bottom: 1px solid @border-color;
      padding: 10px 0;
      line-height: 1.5;
    }
    .action {
      display: flex;
      .btn-wrapper {
        margin-left: auto;
        button {
          border: none;
          color: @grey;
        }
      }
    }
  }
  .none-data {
    margin-top: 120px;
    text-align: center;
    p {
      color: #999;
    }
  }
  .add-addr-btn {
    width: calc(100% - 30px);
    margin: 50px 15px;
  }
}
</style>
