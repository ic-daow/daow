<template>
  <div class="daoDetail-page container">

<div class="left-bar">
  <div class="card">
    <div class="card-content">
    	<div class="content">
        {{  }}<br/>
      	</div>
    </div>
  </div>
</div>

<div class="dao-detail">

    <div class="module">
      <h1 class="title has-text-centered">Claim</h1>
      <div>
        Congratulations! You have raised  <b>120</b> ICP.
      </div>
      <div>
        You can withdraw  <b>120</b> ICP.
      </div>
      <div>
        <b-field label="Withdraw" horizontal>

			<div class="block">
				<b-radio v-model="voteOption"
					name="voteOption"
					native-value="yes">
					yes
				</b-radio>
				<b-radio v-model="voteOption"
					name="voteOption"
					native-value="no">
					no
				</b-radio>
			</div>

        </b-field>      
      </div>            
      <div class="button-container">
        <b-button class="prev-button" @click="back()" type="is-primary">Back</b-button>
        <b-button
          class="next-button"
          @click="withdraw"
          type="is-primary"
          >Withdraw</b-button
        >
      </div>      
    </div>
</div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "DaoDetail",
  data() {
    return {
      id: null,
      proposalInfo: {
      },
      isLoading: false,
      daoInstance: null,
      investAmount: "",
      detailLoading: true,
      amount: 0,
	  voteOption: '',
    };
  },
  computed: {
	...mapMutations(['setIsLoading']),	  
    ...mapState({
      userInfo: (state) => state.userInfo,
    }),
    contractAmount(){
       return Number(this.investAmount).toFixed(8).replace(".","");
    }
  },
  watch: {
    userInfo() {
      this.getProposal();
    },
  },
  mounted(option) {
    console.log(option);
    let query = this.$route.query;
    if (query) {
      this.id = query.id;
	  console.log("id:", this.id);
    }
    if (this.userInfo) {
      this.getProposal();
    }
  },
  methods: {
    async vote() {
      const dao = await this.$daoDao;
      const params = {
        proposal_id: parseInt(this.id),
        vote: this.voteOption,
      };
      try {
        console.log("voteClaimProposal:", params)
        const res = await dao.voteClaimProposal(params);
        console.log("voteClaimProposal res:", res)
      } catch(e) {
        console.error("vote:",e)
      }
    },

    getProposal() {
      this.detailLoading = true;
      this.$daoDao
        .then((daoDao) => {
          this.daoInstance = daoDao;
		  console.log("getClaimProposal:", this.id);
          return daoDao.getClaimProposal({
			  id: this.id
		  });
        })
        .then((proposal) => {
          console.log("proposal:", proposal);
          this.proposalInfo = proposal;
          this.detailLoading = false;
        })
        .catch((err) => {
          console.log(err);
          this.detailLoading = false;
        });        
    },

    back() {
      this.$router.back();
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
