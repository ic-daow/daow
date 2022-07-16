<template>
  <div class="daoDetail-page container">

<div class="left-bar">
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48 b-image-wrapper">
            <img :src="projectInfo.logo" :alt="projectInfo.name" />
            <b-skeleton circle width="48px" height="48px" :active="detailLoading"></b-skeleton>
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{ projectInfo.name }}</p>
          <p class="subtitle is-6">@{{projectInfo.team.name}}</p>
        </div>
      </div>

      <div class="content">
        {{ projectInfo.description }}<br/>
        <div v-for="(item, index) in projectInfo.links" :key="index">
          <a
            class="link-item"
            :href="item"
          >
            {{ item }}
          </a>
          <br>
        </div>

      </div>
    </div>
  </div>
  <div style="height:5px"></div>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        Team: {{projectInfo.team.name}}
      </p>
    </header>
    <div class="card-content">
      <div class="content">
        <div class="pciture b-image-wrapper">
          <img :src="projectInfo.team.picture" alt="team" style="width: 100%" />
        </div>
        <div>
          Twitter: <a class="link-item" :href="projectInfo.team.twitter">
           {{projectInfo.team.twitter}}
          </a>
          <br>
        </div>
      </div>
    </div>
  </div>
  <div style="height:5px"></div>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        Tokenomics
      </p>
    </header>
    <div class="card-content">
      <div class="content">
        <div
          class="item-info"
          v-for="(val, key) in projectInfo.tokenomics"
          :key="key"
        >
          <span class="info-title">{{ key }}:</span><span>{{ val }}</span>
        </div>
      </div>
    </div>
  </div>
  <div style="height:5px"></div>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48 b-image-wrapper">
            <img :src="projectInfo.trust_by.logo" :alt="projectInfo.trust_by.name" />
            <b-skeleton circle width="48px" height="48px" :active="detailLoading"></b-skeleton>
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{ projectInfo.trust_by.name }}</p>
          <p class="subtitle is-6">@{{projectInfo.trust_by.link}}</p>
        </div>
      </div>
    </div>
  </div>

</div>
<div class="dao-detail">
    <div class="module">
      <b-field label="Roadmap">
        <div class="roadmap-box b-image-wrapper">
          <img :src="projectInfo.roadmap" alt="roadmap" />
        </div>
      </b-field>
    </div>
    <div class="module">
      <h1 class="title has-text-centered">Capital Detail</h1>
      <b-field
        custom-class="custormField"
        v-if="projectInfo.capital_detail.raise"
        label="Raise:"
        horizontal
      >
        {{ projectInfo.capital_detail.raise.amount
        }}{{ projectInfo.capital_detail.raise.currency }}
      </b-field>
      <!-- <b-field class="split" label="Price:" horizontal>
        {{ step2Info.tokenPrice }}{{ step2Info.token1Name }}/{{
          step2Info.token2Name
        }}
      </b-field> -->

      <b-field label="Price($):" horizontal>
        {{ projectInfo.capital_detail.price_per_icp }}
      </b-field>
      <!--
      <b-field label="The token amount I will release:" horizontal>
        {{ step2Info.tokenAmount }}
      </b-field> -->

      <h1 class="lable-text">Release Rule</h1>
      <b-field
        v-if="projectInfo.capital_detail.release"
        label="Release Method:"
        horizontal
      >
        {{ projectInfo.capital_detail.release.method }}
      </b-field>
      <b-field
        v-if="projectInfo.capital_detail.release"
        class="split"
        label="Release amount per day:"
        horizontal
      >
        {{ projectInfo.capital_detail.release.amount_per_day }} / day
      </b-field>
      <b-field
        v-if="projectInfo.capital_detail.release"
        label="Start Date:"
        horizontal
      >
        {{ projectInfo.capital_detail.release.start_date }}
      </b-field>
      <div class="button-container">
        <!--b-button class="prev-button" @click="back()" type="is-primary">Back</b-button-->
        <b-button
          class="next-button"
          @click.prevent="isInvestModalActive = true"
          type="is-primary"
          :disabled="daoInstance ? false : true"
          >Invest</b-button
        >
      </div>
    </div>

    <div class="module" v-if="projectInfo.actual_raised >= projectInfo.capital_detail.raise.amount * 100000000">
      <h1 class="title has-text-centered">Claim Proposal</h1>
      <div>
        You have raised  <b>{{projectInfo.actual_raised / 100000000 || '0'}}</b> ICP.
      </div>
      <div>
        You can withdraw  <b> {{(projectInfo.actual_raised - projectInfo.claimed) / 100000000}} </b>. ( {{projectInfo.claimed / 100000000}} has been claimed)
      </div>
      <div>
        <b-field label="Withdraw" horizontal>
            <b-input v-model="amount"></b-input>
        </b-field>
      </div>
      <div class="button-container">
        <!--b-button class="prev-button" @click="back()" type="is-primary">Back</b-button-->
        <b-button
          class="next-button"
          @click="withdraw"
          type="is-primary"
          >Submit</b-button
        >
      </div>
    </div>

    <b-modal
      v-model="isInvestModalActive"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-label="Trusted Modal"
      close-button-aria-label="Close"
      aria-modal
    >
      <template>
        <form action="">
          <div class="modal-card" style="width: 400px">
            <header class="modal-card-head">
              <p class="modal-card-title">Invest</p>
              <button
                type="button"
                class="delete"
                @click="isInvestModalActive = false"
              />
            </header>
            <section class="modal-card-body">
              <b-field label="Amount(ICP)">
                <b-input
                  v-model="investAmount"
                  placeholder="write amount here"
                ></b-input>
              </b-field>
            </section>
            <footer class="modal-card-foot">
              <b-button
                @click.prevent="invest()"
                type="is-primary"
                :loading="isLoading"
                >Confirm</b-button
              >
            </footer>
          </div>
        </form>
      </template>
    </b-modal>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import {Principal} from "@dfinity/principal";

export default {
  name: "DaoDetail",
  data() {
    return {
      id: null,
      projectInfo: {
        capital_detail: {
          raise: 0,
        },
        logoShow: "",
        team: {},
        trust_by: {},
      },
      isLoading: false,
      daoInstance: null,
      isInvestModalActive: false,
      investAmount: "",
      detailLoading: true,
      amount: 0,
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.userInfo,
    }),
    contractAmount(){
       return Math.ceil(this.investAmount * 100000000)
    }
  },
  watch: {
    userInfo() {
      this.getProjectInfo();
    },
  },
  mounted(option) {
    console.log(option);
    let query = this.$route.query;
    if (query) {
      this.id = query.id;
    }
    if (this.userInfo) {
      this.getProjectInfo();
    }
  },
  methods: {
    ...mapMutations(['setIsLoading']),
    async withdraw(){
      const dao = await this.$daoDao;
      const params = {
        project_id: parseInt(this.id),
        amount_e8s: this.amount * 100000000,
        recipient_principal: this.projectInfo.owner,
      };
      this.$buefy.dialog.confirm({
          message: 'confirm your claim proposal?',
          onConfirm: async () => {
              try {
                this.setIsLoading(true)
                console.log("createClaimProposal:", params)
                const res = await dao.createClaimProposal(params);
                console.log("createClaimProposal res:", res)
              } catch(e) {
                console.error("withdraw:",e)
              } finally {
                this.setIsLoading(false);
              }
          }
      })
    },
    getProjectInfo() {
      this.detailLoading = true;
      this.setIsLoading(true)
      this.$daoDao
        .then((daoDao) => {
          this.daoInstance = daoDao;
          return daoDao.getProject(this.id);
        })
        .then((project) => {
          console.log("this.projectInfo:", project);
          this.projectInfo = project;
          this.formateInfo();
          this.detailLoading = false;
          this.setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          this.detailLoading = false;
          this.setIsLoading(false);
        });

    },
    formateInfo() {
      this.$picActor
        .then((picActor) => {
          return [
            picActor.getPicture(this.projectInfo.logo_id),
            picActor.getPicture(this.projectInfo.roadmap_id),
            picActor.getPicture(this.projectInfo.team.picture_id),
            picActor.getPicture(this.projectInfo.trust_by.logo_id),
          ];
        })
        .then((results) => Promise.all(results))
        .then(([logoInfo, roadmapInfo, pictureInfo, trustLogoInfo]) => {
          console.log(logoInfo, roadmapInfo, pictureInfo, trustLogoInfo);
          if (logoInfo && logoInfo.data.buffer) {
            this.projectInfo.logo = this.$bufferToImage(logoInfo.data.buffer);
          }
          if (roadmapInfo && roadmapInfo.data.buffer) {
            this.projectInfo.roadmap = this.$bufferToImage(
              roadmapInfo.data.buffer
            );
          }
          if (pictureInfo && pictureInfo.data.buffer) {
            this.projectInfo.team.picture = this.$bufferToImage(
              pictureInfo.data.buffer
            );
          }
          if (trustLogoInfo && trustLogoInfo.data.buffer) {
            this.projectInfo.trust_by.logo = this.$bufferToImage(
              trustLogoInfo.data.buffer
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    back() {
      console.log("submit", this.id)
      this.$router.back();
    },
    async invest() {
      if (this.isLoading || !this.investAmount) {
        return;
      }
      this.isLoading = true;
      const accountId = "ae5b8fade010d8e66619ae9031be11c827eba80fc60d1e73b001138e9ce78882";

      const txParas= {
          project_id: parseInt(this.id),
          amount: this.contractAmount,
          memo: 0,
          from: this.userInfo.owner,
          to: accountId,
      }
      console.log("txParas:", txParas)
      try {
        this.setIsLoading(true)
        console.log('before createTransaction')
        const result = await this.daoInstance.createTransaction(txParas)
        console.log("createTransaction result:", result);
        let params = {
          to: accountId,
          amount: this.contractAmount,
          memo: 0,
        };
        console.log("requestTransfer:", params);
        const tx_res = await window.ic.plug.requestTransfer(params);
        console.log("tx_res:", tx_res);
        params = {
            project_id: parseInt(this.id),
            tx_id: result.id,
            amount: this.contractAmount,
            block_height: Number(tx_res.height),
            memo:  0,
        }
        console.log("modifyTransaction:", params);
        const mResult = await this.daoInstance.modifyTransaction(params)
        console.log("mResult:", mResult);

        const sleep = async (time) =>{
          return new Promise(function(resolve){
            setTimeout(resolve, time);
          });
        }
        let loop = true;
        while(loop) {
          await sleep(1);
          const vResult = await this.daoInstance.verifyTransaction({
              project_id: parseInt(this.id),
              block_height:Number(tx_res.height),
          })
          console.log("vResult:", vResult);
          loop = ! vResult
        }
        this.isLoading = false;
        console.log("createTransaction res",result);
        this.isInvestModalActive = false;
        this.getProjectInfo();
        this.$buefy.dialog.alert("Invest success!");
        // const tx = await this.daoInstance.getTransaction(result.id);
        // console.log("tx res", tx);
      } catch(err) {
          this.isLoading = false;
          console.log(err);
      } finally {
        this.setIsLoading(false);
      }

    },
  },
};
</script>

<style lang="scss" scoped>
.container{
  display: flex;

  .left-bar{
    width: 300px;
  }

  .dao-detail{
    flex: 1;
  }
}
.daoDetail-page {
  .img-box {
    width: 100%;
    height: 300px;
    overflow-y: hidden;
    img {
      width: 100%;
    }
  }
  .roadmap-box {
    width: 100%;
    img {
      width: 100%;
      max-height: 640px;

    }
  }


  margin: 40px 40px 30px 40px;
  .module {
    border: 2px solid #eee;
    background-color: #f1f1f1;
    padding: 30px;
    border-radius: 8px;
    margin: 0 0 10px 10px;
  }

  .item-info {
    .info-title {
      font-weight: 600;
      margin-right: 10px;
    }
  }

  .pciture {
    width: 100%;
    height: auto;
  }
  .button-container {
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
    margin-top: 40px;
    .next-button,
    .prev-button {
      width: 200px;
    }
    .prev-button {
      margin-right: 20px;
    }
  }
  .dialog-content {
    width: 600px;
    height: 400px;
    background-color: #fff;
  }
}
</style>
