<template>
  <div class="daoDetail-page container">


    <section>
        <article class="media">
            <figure class="media-left">
                <p class="image is-64x64">      
                    <img :src="projectInfo.logo" :alt="projectInfo.name" />    
                    <b-skeleton circle width="64px" height="64px" :active="detailLoading"></b-skeleton>                         
                </p>
            </figure>
            <div class="media-content">
                <div>
                  <div class="title">{{ projectInfo.name }}</div>
                  {{ projectInfo.description }}
                </div>
              <b-skeleton height="120px" :active="detailLoading"></b-skeleton>            
            </div>
        </article>
    </section>

    <div class="module">
      <h1 class="title has-text-centered">Project Detail</h1>
      <b-field label="Roadmap">
        <div class="roadmap-box">
          <img :src="projectInfo.roadmap" alt="roadmap" />           
        </div>
      </b-field>

      <b-field label="Links">
        <section>
          <div
            class="link-item"
            v-for="(item, index) in projectInfo.links"
            :key="index"
          >
            {{ item }}
          </div>
        </section>
      </b-field>

      <b-field label="Tokenomics">
        <!-- {{ projectInfo.tokenomics }} -->
        <div
          class="item-info"
          v-for="(val, key) in projectInfo.tokenomics"
          :key="key"
        >
          <span class="info-title">{{ key }}:</span><span>{{ val }}</span>
        </div>
      </b-field>
      <b-field label="Team">
        <div
          class="item-info"
          v-for="(val, key) in projectInfo.team"
          :key="key"
        >
          <template v-if="key != 'picture' && key != 'picture_id'"
            ><span class="info-title">{{ key }}:</span
            ><span>{{ val }}</span></template
          >
          <template v-if="key == 'picture'">
            <span class="info-title">picture:</span>
            <div class="pciture">
              <p class="image">      
                  <img :src="projectInfo.team.picture" alt="team" />                        
              </p>                 
            </div>
          </template>
        </div>
        <!-- {{ projectInfo.team }} -->
      </b-field>
      <b-field label="Trusted by">
        <div
          class="item-info"
          v-for="(val, key) in projectInfo.trust_by"
          :key="key"
        >
          <template v-if="key != 'logo' && key != 'logo_id'"
            ><span class="info-title">{{ key }}:</span
            ><span>{{ val }}</span></template
          >
          <template v-if="key == 'logo'">
            <span class="info-title">Logo:</span>
            <div class="pciture">
              <p class="image is-64x64">      
                  <img :src="projectInfo.trust_by.logo" alt="trust_by" />                        
              </p>              
            </div>
          </template>
        </div>
      </b-field>
    </div>
    <div class="module">
      <h1 class="title has-text-centered">Capital Detail</h1>
      <h1 class="lable-text">Raise Rule</h1>
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
    </div>
    <div class="button-container">
      <b-button class="prev-button" @click="back()" type="is-primary">Back</b-button
      >
      <b-button
        class="next-button"
        @click.prevent="isInvestModalActive = true"
        type="is-primary"
        :disabled="daoInstance ? false : true"
        >Invest</b-button
      >
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
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "DaoDetail",
  data() {
    return {
      id: null,
      projectInfo: {
        capital_detail: {},
        logoShow: "",
        team: {},
        trust_by: {},
      },
      isLoading: false,
      daoInstance: null,
      isInvestModalActive: false,
      investAmount: "",
      detailLoading: true,
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.userInfo,
    }),
    contractAmount(){
       return Number(this.investAmount).toFixed(8).replace(".","");
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
    getProjectInfo() {
      this.detailLoading = true;
      this.$daoDao
        .then((daoDao) => {
          this.daoInstance = daoDao;
          return daoDao.getProject(this.id);
        })
        .then((project) => {
          console.log("project:", project);
          this.projectInfo = project;
          this.formateInfo();
          this.detailLoading = false;
        })
        .catch((err) => {
          console.log(err);
          this.detailLoading = false;
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
    invest() {
      if (this.isLoading || !this.investAmount) {
        return;
      }
      this.isLoading = true;
      const txParas= {
          project_id: this.id,
          amount: this.contractAmount,
          memo: this.userInfo.memo,
          from: this.userInfo.owner,
          to: this.$config.cid,
      }
      console.log("txParas:", txParas)
      this.daoInstance
        .createTransaction(txParas)
        .then((result) => {
          this.isLoading = false;
          console.log(result);
          this.isInvestModalActive = false;
          this.$buefy.dialog.alert("Invest success!");
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
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
  .project-title {
    font-size: 3rem;
    text-align: center;
  }
  .project-desc {
    font-size: 15px;
    text-align: center;
    color: #999;
  }
  margin: 40px 40px 30px 40px;
  .module {
    border: 2px solid #eee;
    background-color: #f1f1f1;
    padding: 30px;
    border-radius: 8px;
    margin-top: 30px;
  }

  .item-info {
    .info-title {
      font-weight: 600;
      margin-right: 10px;
    }
  }

  .pciture {
    width: 480px;
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
