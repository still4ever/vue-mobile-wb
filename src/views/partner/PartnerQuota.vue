<template>
  <section id="partnerQuota" class="partnerQuota">
    <article class="partnerQuota-info">
      <div class="avatar">
        <img src="../../assets/img/vip.jpg" alt="" />
      </div>
      <div class="personName">
          <label>大超</label>
      </div>
    </article>
    <div style="background-color:#FFF;">
        <div class="item gold_quota" @click="getGoldQuotaDetail">
            <div class="gold_item">
                <Icon name="huangjin" class="icon" class-prefix="iconfont" />
                <label class="zh">黄金额度</label>
                <label class="es">GOLD QUOTA</label>
            </div>
            <div class="quota_div">
                <label>￥{{gold_quota}}</label>
                <Icon name="left" class="" class-prefix="iconfont" />
            </div>
        </div>
        <div class="item pt_quota" @click="getPtQuotaDetail">
            <div class="pt_item">
                <Icon name="baijin" class="icon" class-prefix="iconfont" />
                <label class="zh">白金额度</label>
                <label class="es">PLATINUM QUOTA</label>
            </div>
            <div class="quota_div">
                <label>￥{{pt_quota}}</label>
                <Icon name="left" class="" class-prefix="iconfont" />
            </div>
        </div>
        <div class="item diamonds_quota" @click="getDiamondsQuotaDetail">
            <div class="diamonds_item">
                <Icon name="zhuanshi" class="icon" class-prefix="iconfont" />
                <label class="zh">钻石额度</label>
                <label class="es">DIAMOND QUOTA</label>
            </div>
            <div class="quota_div">
                <label>￥{{diamonds_quota}}</label>
                <Icon name="left" class="" class-prefix="iconfont" />
            </div>
        </div>
    </div>
  </section>
</template>

<script>
import { CellGroup, Cell, Icon } from "vant";
import { partnerService } from "../../service/index";

export default {
  components: {
    CellGroup,
    Cell,
    Icon
  },

  data() {
    return {
        list: [],
        gold_quota: '',
        pt_quota: '',
        diamonds_quota: ''
    };
  },

  methods: {
    getGoldQuotaDetail() {
        let rankId = 1;
        if(this.gold_quota == 0 || this.gold_quota == '') {
            return;
        }
        this.$router.push({ path: "/partner/quotaDetail", query: { rankId } });
    },

    getPtQuotaDetail() {
        let rankId = 2;
        if(this.pt_quota == 0 || this.pt_quota == '') {
            return;
        }
        this.$router.push({ path: "/partner/quotaDetail", query: { rankId } });
    },

    getDiamondsQuotaDetail() {
        let rankId = 3;
        if(this.diamonds_quota == 0 || this.diamonds_quota == '') {
            return;
        }
        this.$router.push({ path: "/partner/quotaDetail", query: { rankId } });
    },

    getOverdueQuotaDetail() {
        this.$router.push({ path: "/partner/overdueQuota"});
    },

    async getUserAmountList() {
        const { data } = await partnerService.getUserAmountList();
        if(data.length === 0){
            this.gold_quota = 0;
            this.pt_quota = 0;
            this.diamonds_quota = 0;
            
            return;
        }

        for(var i = 0;i < data.length;i++) {
            if(data[i].rankId == 1){
                this.gold_quota = data[i].amount;
            }else if(data[i].rankId == 2){
                this.pt_quota = data[i].amount;
            }else if(data[i].rankId == 3){
                this.diamonds_quota = data[i].amount;
            }
        }
    }
  },

  mounted() {
    this.getUserAmountList();
  }
};
</script>

<style lang="less">
.partnerQuota {
    background: url("../../assets/img/partner_quota.png") no-repeat;
    background-size: 100%;
    height: 180px;
    background-color: #FFF;
    &-info {
        padding: 26px 0 26px 0;
        background-size: cover;
        display: block;
        padding-right: 0;
        img {
          width: 100%;
        }
        .avatar {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            overflow: hidden;
            margin: 0 auto;
        }
        .personName {
            text-align: center;
            margin-top: 10px;
            label {
                font-size: 18px;
                font-weight: 400;
                color: rgba(255,255,255,1);
                line-height: 21px;
            }
        }
    }
    .item {
        width: 360px;
        height: 118px;
        margin: 0 auto;
        margin-top: 5px;
    }
    .gold_quota {
        margin-top: 0px;
        background: url("../../assets/img/gold_quota.png") no-repeat;
        background-size: 100%;
        .gold_item {
            padding: 20px 30px;
            display: inline-block;
            .icon {
                display: block;
                font-size: 19px;
                color:#FFDC72;
            }
            .zh {
                font-size: 16px;
                font-weight: 500;
                color: rgba(255,255,255,1);
                display: block;
            }
            .es {
                font-size: 12px;
                font-weight: 500;
                color: rgba(255,255,255,1);
                opacity: 0.5;
            }
        }
        .quota_div {
            color: #B0B0B0;
            display: inline-block;
            float: right;
            padding-right: 10px;
            line-height: 118px;
            label {
                font-size: 24px;
                font-weight: 500;
                color: #A02B2B;
                float: left;
                margin-right: 24px;
            }
            i {
                font-size: 13px;
                line-height: 30px;
                opacity: 0.5;
                color: #FFF;
            }
            
        }
    }
    .pt_quota {
        background: url("../../assets/img/pt_quota.png") no-repeat;
        background-size: 100%;
        .pt_item {
            padding: 20px 30px;
            display: inline-block;
            .icon {
                display: block;
                font-size: 19px;
                color:#D7D5FF;
            }
            .zh {
                font-size: 16px;
                font-weight: 500;
                color: rgba(255,255,255,1);
                display: block;
            }
            .es {
                font-size: 12px;
                font-weight: 500;
                color: rgba(255,255,255,1);
                opacity: 0.5;
            }
        }
        .quota_div {
            color: #B0B0B0;
            display: inline-block;
            float: right;
            padding-right: 10px;
            line-height: 118px;
            label {
                font-size: 24px;
                font-weight: 500;
                color: #3B32AD;
                float: left;
                margin-right: 24px;
            }
            i {
                font-size: 13px;
                line-height: 30px;
                opacity: 0.5;
                color: #FFF;
            }
            
        }
    }
    .diamonds_quota {
        background: url("../../assets/img/diamonds_quota.png") no-repeat;
        background-size: 100%;
        .diamonds_item {
            padding: 20px 30px;
            display: inline-block;
            .icon {
                display: block;
                font-size: 19px;
                color:#D0F2FF;
            }
            .zh {
                font-size: 16px;
                font-weight: 500;
                color: rgba(255,255,255,1);
                display: block;
            }
            .es {
                font-size: 12px;
                font-weight: 500;
                color: rgba(255,255,255,1);
                opacity: 0.5;
            }
        }
        .quota_div {
            color: #B0B0B0;
            display: inline-block;
            float: right;
            padding-right: 10px;
            line-height: 118px;
            label {
                font-size: 24px;
                font-weight: 500;
                color: #1C4479;
                float: left;
                margin-right: 24px;
            }
            i {
                font-size: 13px;
                line-height: 30px;
                opacity: 0.5;
                color: #FFF;
            }
            
        }
    }
    .overdue_quota {
        background: url("../../assets/img/overdue.png") no-repeat;
        background-size: 100%;
        .overdue_item {
            padding: 34px 0 0 30px;
            display: inline-block;
            .zh {
                font-size: 16px;
                font-weight: 500;
                color: #B0B0B0;
                display: block;
            }
            .es {
                font-size: 12px;
                font-weight: 500;
                color: #B0B0B0;
                opacity: 0.5;
            }
        }
        .quota_div {
            color: #B0B0B0;
            display: inline-block;
            float: right;
            padding-right: 10px;
            line-height: 118px;
            label {
                font-size: 24px;
                font-weight: 500;
                color: rgba(176,176,176,1);
                float: left;
                margin-right: 24px;
            }
            i {
                font-size: 13px;
                line-height: 30px;
            }
            
        }
    }
}
</style>
