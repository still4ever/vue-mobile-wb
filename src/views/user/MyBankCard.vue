<template>
  <section class="myBankCard">
    <article v-if="list.length > 0" style="margin-bottom: 10px;" class="address-list-item" v-for="(item, idx) in list" :key="idx">
      <van-swipe-cell>
        <div class="myBankCard-item">
          <div class="name">
            <Icon class="icon-zfb" slot="icon" color="#FF5E5B" class-prefix="iconfont" name="hehuo"/>
            <div class="bankCard-type">
              <div class="card-name">{{ item.name }}</div>
              <div class="card-type">储蓄卡</div>
            </div>
          </div>
          <div class="bankCard-number">
            <label class="">{{ item.number }}</label>
          </div>
        </div>
        <template slot="right">
          <van-button square class="delete-btn" type="danger" text="删除" @click="onDelete(item.bankId)"/>
        </template>
      </van-swipe-cell>
    </article>
    <van-button class="addCard-btn" icon="plus" size="large" @click="onAdd">添加银行卡</van-button>
    <!-- <van-button :style="{ display: deleteBank }" class="addCard-btn" icon="delete" type="primary" @click="onDelete()">解除绑定</van-button> -->
  </section>
</template>

<script>
import { CellGroup, Field, Button, Icon, SwipeCell, Cell  } from "vant";
import { bankCardService } from "../../service/index";

export default {
  components: {
    VanCellGroup: CellGroup,
    VanField: Field,
    Icon,
    VanButton: Button,
    VanSwipeCell: SwipeCell,
    VanCell: Cell
  },

  data() {
    return {
      list: [],
      // addBank: "none",
      // deleteBank: "none"
    };
  },

  methods: {
    async fetchList() {
      const { data } = await bankCardService.getUserBankList();
      console.log(data);
      this.list = data;

      if (data && data.length > 0) {
        this.addBank = "none";
        this.deleteBank = "";
      } else {
        this.addBank = "";
        this.deleteBank = "none";
      }
    },

    async onAdd() {
      bankCardService.getPassword().then(({ code, msg, data }) => {
        if (code === 200) {
          let type = "bank";
          if (data.isHas == false) {
            this.$router.push({
              path: "/user/bankCard/setPaw",
              query: { type }
            });
          } else {
            this.$router.push({ path: "/user/bankCard/submitBankCrad" });
          }
        } else if (code === 10020) {
          this.$toast.success({
            message: msg
          });
        }
      });
    },

    async onDelete(bankId) {
      let params = {
        bankId: bankId
      }
      bankCardService.deleteUserBank(params).then(({ code, msg }) => {
        if (code === 200) {
          this.$toast.success({
            message: "删除成功",
            duration: 500,
            onClose: () => {
              this.fetchList();
            }
          });
        } else {
          this.$toast.success({
            message: msg
          });
        }
      });
    }
  },
  mounted() {
    this.fetchList();
  }
};
</script>

<style lang="less">
.myBankCard {
  padding-top: 15px;
  padding-left: 15px;
  padding-right: 15px;

  &-item {
    background-color: #0e7ccd;
    height: 89px;
    border-radius: 4px;
    .name {
      height: 51px;
      padding-left: 15px;
      img {
        height: 36px;
        width: 36px;
        margin-top: 15px;
        margin-left: 15px;
      }
      .bankCard-type {
        display: inline-block;
        margin-top: 15px;
        .card-name {
          color: rgba(253, 253, 253, 1);
          margin-left: 6px;
        }
        .card-type {
          color: rgba(253, 253, 253, 1);
          margin-left: 6px;
          opacity: 0.8;
        }
      }
      .icon-zfb {
        font-size: 36px;
      }
    }
    .bankCard-number {
      width: 247px;
      height: 14px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(253, 253, 253, 1);
      padding-left: 57px;
      margin-top: 5px;
    }
  }
  .addCard-btn {
    color: #ff695c;
    background-color: rgba(255, 255, 255, 1);
    border-color: rgba(255, 255, 255, 1);
    height: 50px;
    margin-top: 3px;
  }
  .delete-btn {
      height: 89px;
      border: none;
      border-radius: 4px;
      margin-left: 5px;
      padding:0 12px;
  }
}
</style>
