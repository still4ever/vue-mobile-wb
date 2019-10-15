<template>
  <section class="address-edit">
    <van-address-edit
      :area-list="areaList"
      :show-set-default="isSave"
      show-search-result
      :search-result="searchResult"
      :address-info="addressInfo"
      @save="onSave"
    />
    <van-dialog v-model="show" title="请再次确认" show-cancel-button>
      <div class="item"><span class="label">姓名</span><span>谢安琪</span></div>
      <div class="item">
        <span class="label">地址</span><span>还好还好</span>
      </div>
    </van-dialog>
  </section>
</template>

<script>
import { AddressEdit } from "vant";
import areaList from "../../../assets/data/area";
import { AddressService } from "../../../service/index";

export default {
  name: "UserAddress",
  components: {
    VanAddressEdit: AddressEdit
  },
  data() {
    return {
      searchResult: [],
      areaList,
      isSave: this.$route.name === "userAddressAdd",
      show: false
    };
  },
  computed: {
    addressInfo() {
      if (this.isSave) return {};
      const {
          phone,
          name,
          area,
          address,
          isDefault,
          addressId,
          areaCode
        } = this.$route.params,
        adArr = area.split("/");
      return {
        name,
        tel: phone,
        province: adArr[0],
        city: adArr[1],
        county: adArr[2],
        isDefault,
        addressDetail: address,
        id: addressId,
        areaCode
      };
    }
  },
  methods: {
    onSave(formData) {
      const {
        id,
        name,
        tel,
        province,
        city,
        county,
        isDefault,
        addressDetail,
        areaCode
      } = formData;
      let params = {
        name,
        phone: tel,
        area: `${province}/${city}/${county}`,
        address: addressDetail,
        isDefault: Number(isDefault),
        addressId: id,
        areaCode
      };
      if (this.isSave) delete params.addressId;
      AddressService.saveAddress({ ...params }).then(({ code, msg }) => {
        if (code === 200) {
          this.$toast.success({
            message: "新增成功",
            duration: 500,
            onClose: () => {
              this.$router.go(-1);
            }
          });
        } else {
          this.$toast.success({
            message: msg
          });
        }
      });
    }
  }
};
</script>

<style lang="less">
.address-list {
}
.van-dialog {
  &__content {
    padding: 25px;
    .item:first-of-type {
      margin-bottom: 15px;
    }
    .label {
      color: @grey;
      margin-right: 30px;
    }
  }
}
</style>
