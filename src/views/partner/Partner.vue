<template>
  <section id="partner" class="partner">
    <article class="partner-info">
      <div class="avatar">
        <img src="../../assets/img/vip.jpg" alt="" />
      </div>
      <div class="info">
        <div class="name">{{ partnerName }}</div>
        <div v-if="!isPartner" class="other">
          <span>{{ partnerTips }}</span>
        </div>
      </div>
      <div class="partner-quota" @click="partnerQuota">
        <Icon name="hehuodefuben" class="partner-icon1" class-prefix="iconfont" />
        <label style="color:#FFF;line-height: 28px;">我的合伙人额度</label>
      </div>
    </article>
    <div class="shopkeeper">
        <h3 style="padding: 10px 0 0 0;">成为店主有哪些好处？</h3>
        <p>
            享受更低的价格。XX店主能在日常售卖的基础上，享受平均16%左右的折扣额度，能省下不少钱呢！<br>
            享受新店主优惠券。现在成为XX店主后，可以立即享受50元XX币奖励哦！<br>
            享受专属营销培训。所有促销活动，店主可以更早知道，而且还有导师手把手教哦！
        </p>
        <h3>如何成为XX店主？</h3>
        <p>
            一下合伙额度任选一种，就可以成为店主啦，还可重复购买哦~
        </p>
    </div>
    <div class="rank">
        <label class="slash">\\</label>
        <label class="title">合伙等级专区</label>
        <label class="slash">//</label>
    </div>
    <div class="card">
        <div class="card-type gold" @click="buyGoldCard()">
          <label style="font-size:18px;font-weight:500;margin-top:36px;">黄金卡</label>
          <label>充值2800</label>
        </div>
        <div class="card-type pt" @click="buyPtCard()">
          <label style="font-size:18px;font-weight:500;margin-top:36px;">白金卡</label>
          <label>充值5600</label>
        </div>
        <div class="card-type diamonds" @click="buyDiamondsCard()">
          <label style="font-size:18px;font-weight:500;margin-top:36px;">钻石卡</label>
          <label>充值8800</label>
        </div>
    </div>
  </section>
</template>

<script>
import { CellGroup, Cell, Icon } from "vant";
import { partnerService } from "../../service/index";
import { debuglog } from 'util';

export default {
  components: {
    CellGroup,
    Cell,
    Icon
  },

  data() {
    return {
      partnerName: '',
      partnerTips: '暂未开通合伙人',
      isPartner: '',
      user: {},
      host: location.origin
    };
  },

  methods: {
    async getPartnerRank() {
      const { data } = await partnerService.getPartnerRank();
      localStorage.setItem('partnerRank', JSON.stringify(data.partnerRank));
      this.isPartner = data.isPartner;
      if(data.user) {
        this.user = data.user;
        this.partnerName = data.user.nickName;
      }else{
        this.partnerName = '非合伙人';
      }
      console.log(data);
    },

    partnerQuota() {
      this.$router.push({ 
        name: 'partner_quota'
      });
    },
    
    buyGoldCard() {
      this.$router.push({ 
        name: 'partnerSettlement',
        params: {
          rankId: 1,
          money: 2800,
          title: '黄金合伙卡',
          thumb: `${this.host}/gold.png`,
          name: this.user.name,
          headUrl: this.user.headUrl,
          idCard: this.user.idCard,
          invitCode: this.user.invitCode,
          nickName: this.user.nickName,
          phone: this.user.phone
        }
      });
    },

    buyPtCard() {
      this.$router.push({ 
        name: 'partnerSettlement',
        params: {
          rankId: 2,
          money: 5600,
          title: '铂金合伙卡',
          thumb: `${this.host}/pt.png`,
          name: this.user.name,
          headUrl: this.user.headUrl,
          idCard: this.user.idCard,
          invitCode: this.user.invitCode,
          nickName: this.user.nickName,
          phone: this.user.phone
        }
      });
    },

    buyDiamondsCard() {
      this.$router.push({ 
        name: 'partnerSettlement',
        params: {
          rankId: 3,
          money: 8800,
          title: '钻石合伙卡',
          thumb: `${this.host}/diamond.png`,
          name: this.user.name,
          headUrl: this.user.headUrl,
          idCard: this.user.idCard,
          invitCode: this.user.invitCode,
          nickName: this.user.nickName,
          phone: this.user.phone
        }
      });
    },
  },

  mounted() {
    this.getPartnerRank();
  }
};
</script>

<style lang="less">
.partner {
    background: url("../../assets/img/partner1.png") no-repeat;
    background-size: 100%;
    &-info {
        padding: 26px 15px;
        background-size: cover;
        display: flex;
        padding-right: 0;
        img {
          width: 100%;
        }
        .avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          overflow: hidden;
        }
        .partner-quota {
          width: 140px;
          height: 28px;
          background: rgba(248,248,248,0.2);
          border-top-left-radius: 14px;
          border-bottom-left-radius: 14px;
          margin-left: 65px;
          margin-top: 10px;
          .partner-icon1 {
            color: #FFF;
            line-height: 28px;
            display: inline-block;
            margin-left: 7px;
            margin-right: 7px;
          }
        }
        .info {
          margin-left: 10px;
          line-height: 1.5;
          color: #fff;
        .name {
            font-size: 16px;
        }
        .other {
            display: inline-flex;
            font-size: 12px;
            align-items: center;
            .copy {
            margin-left: 15px;
            width: 46px;
            height: 20px;
            border-radius: 20px;
            text-align: center;
            line-height: 20px;
            background-color: rgba(255, 255, 255, 0.6);
            }
        }
        }
    }
    .shopkeeper {
        height: 289px;
        background: rgba(255,255,255,1);
        box-shadow: 0px 3px 7px 2px rgba(132,132,132,0.15);
        border-radius: 5px;
        margin: 0 15px 0 15px;
        padding: 0 18px 0 20px;
        padding-bottom: 20px;
        h3 {
            font-size:16px;
            color: #333333;
        }
        p {
            font-size: 14px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(153,153,153,1);
        line-height: 21px;
        }
    }
    .rank {
      text-align: center;
      padding-top: 20px;
      .slash {
        color: #F06E51;
        font-weight: bolder;
        font-size: 16px;
      }
      .title {
        color: #333333;
        padding-left: 10px;
        padding-right: 10px;
        font-size: 16px;
      }
    }
    .card {
      display: flex;
      padding-top: 20px;
      &-type {
        width:110px;
        height:105px;
        margin-right: 5px;
      }
      .gold {
        background: url("../../assets/img/gold_members.png") no-repeat 100%;
        margin-left: 20px;
        label {
          display: block;
          text-align: center;
          color: #5B4206;
        }
      }
      .pt {
        background: url("../../assets/img/pt_members.png") no-repeat 100%;
        label {
          display: block;
          text-align: center;
          color: #35434D;
        }
      }
      .diamonds {
        background: url("../../assets/img/diamonds_members.png") no-repeat 100%;
        label {
          display: block;
          text-align: center;
          color: #483772;
        }
      }
    }
}
</style>
