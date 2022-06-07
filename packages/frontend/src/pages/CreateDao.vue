<template>
  <div>
    <b-steps v-model="activeStep" :animated="isAnimated" :rounded="isRounded" :has-navigation="hasNavigation"
      :label-position="labelPosition" :mobile-mode="mobileMode">
      <b-step-item step="1" label="Project Detail" :clickable="isStepsClickable">
        <step1 ref="step1"></step1>
      </b-step-item>

      <b-step-item step="2" label="Capital Detail" :clickable="isStepsClickable"
        :type="{ 'is-success': isProfileSuccess }">
        <step2 ref="step2"></step2>
      </b-step-item>

      <b-step-item step="3" :visible="showSocial" label="DAO Detail" :clickable="isStepsClickable">
        <step3 ref="step3"></step3>
      </b-step-item>

      <b-step-item step="4" label="Check" :clickable="isStepsClickable">
        <step4 ref="step4"></step4>
      </b-step-item>
      <b-step-item step="5" label="Submit" :clickable="isStepsClickable">
        <h1 class="title has-text-centered">Finish</h1>
        Lorem ipsum dolor sit amet.
      </b-step-item>
      <template #navigation="{ previous, next }">
        <b-button v-if="activeStep > 0" label="上一步" @click.prevent="previous.action" type="is-primary"></b-button>
        <b-button class="next-button" label="Submit" @click.prevent="submit(next)" type="is-primary"></b-button>
      </template>
    </b-steps>

  </div>
</template>

<script>
import step1 from "@/components/fund_project/step1.vue";
import step2 from "@/components/fund_project/step2.vue";
import step3 from "@/components/fund_project/step3.vue";
import step4 from "@/components/fund_project/step4.vue";
import step5 from "@/components/fund_project/step5.vue";
import { DaowActor, IUser, UserErrors } from "@daow/binding";
const daoCid = process.env.VUE_APP_DAO_ID;
const host = process.env.VUE_APP_IC_HOST;
let daoDao, userDao;
export default {
  name: "CreateDAO",
  components: {
    step1, step2, step3, step4, step5
  },
  data() {
    return {
      name:"",
      activeStep: 0,

      showSocial: true,
      isAnimated: true,
      isRounded: true,
      isStepsClickable: true,

      hasNavigation: false,
      customNavigation: false,
      isProfileSuccess: false,

      prevIcon: "chevron-left",
      nextIcon: "chevron-right",
      labelPosition: "bottom",
      mobileMode: "minimalist",
      step1Info:{},
      step2Info:{},
      step3Info:{},
      checkInfo:{}
    };
  },
  mounted() {
    (async function () {
      daoDao = await new DaowActor().create(daoCid, {
        agentOptions: {
          production: false,
          host,
        },
      });
    })();
  },
  methods: {
    create() {
      let that = this;
      (async function () {
        try {
          let result = await daoDao.createProject({ name: that.name });
          console.log(result);
          next.action();
        } catch (ex) {
          console.error(ex);
        }
      })();
    },
    projectDetail() {

    },
    submit(next) {
      console.log("下一步");
      if(this.activeStep == 0){
        let info = this.$refs["step1"].checkInfo();
        if(!info){
           return;
        }
        this.step1Info = info;
      }else if(this.activeStep == 1){
        let info = this.$refs["step2"].checkInfo();
        if(!info){
           return;
        }
        this.step2Info = info;
      }else if(this.activeStep == 2){
        let info = this.$refs["step2"].checkInfo();
        if(!info){
           return;
        }
        this.step3Info = info;
        this.checkInfo = {
          step1Info:this.step1Info,
          step2Info:this.step2Info,
          step3Info:this.step3Info,
        }
      }
      next.action();
    },
  },
};
</script>

<style scoped>
.next-button {
  margin-left: 15px;
}
</style>
