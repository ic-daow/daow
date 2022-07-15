<template>
  <div class="createDao-page">
    <b-steps
      v-model="activeStep"
      :animated="isAnimated"
      :rounded="isRounded"
      :has-navigation="hasNavigation"
      :label-position="labelPosition"
      :mobile-mode="mobileMode"
    >
      <b-step-item
        step="1"
        class="step-item"
        label="Project name check"
        :clickable="isStepsClickable"
      >
        <step1 ref="step1"></step1>
      </b-step-item>
      <b-step-item
        step="2"
        class="step-item"
        label="Project Detail"
        :clickable="isStepsClickable"
      >
        <step2 ref="step2" :proInfo="step1Info"></step2>
      </b-step-item>

      <b-step-item
        step="3"
        :visible="showSocial"
        label="Capital Detail"
        :clickable="isStepsClickable"
      >
        <step3 ref="step3"></step3>
      </b-step-item>

      <b-step-item step="4" label="Check" :clickable="isStepsClickable">
        <step4 ref="step4" :checkInfo="checkInfo"></step4>
      </b-step-item>
      <b-step-item step="5" label="Submit" :clickable="isStepsClickable">
        <step5 ref="step5" :id="step1Info.id"></step5>
      </b-step-item>
      <template #navigation="{ previous, next }">
        <div class="button-container">
          <b-button
            class="prev-button"
            v-if="activeStep > 0 && activeStep != 4"
            label="Prev"
            @click.prevent="previous.action"
            type="is-primary"
          ></b-button>
          <b-button
            class="next-button"
            :label="activeStep < 3 ? 'Next' : 'Submit'"
            v-if="activeStep != 4"
            @click.prevent="submit(next)"
            type="is-primary"
            :loading="loading"
          ></b-button>
        </div>
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
import { mapState } from "vuex";
export default {
  name: "CreateDAO",
  components: {
    step1,
    step2,
    step3,
    step4,
    step5,
  },
  data() {
    return {
      name: "",
      activeStep: 0,

      showSocial: true,
      isAnimated: true,
      isRounded: true,
      isStepsClickable: false,

      hasNavigation: false,
      customNavigation: false,
      isProfileSuccess: false,

      prevIcon: "chevron-left",
      nextIcon: "chevron-right",
      labelPosition: "bottom",
      mobileMode: "minimalist",
      loading: false,
      step1Info: {},
      step2Info: {},
      step3Info: {},
      checkInfo: {},
      logo: {},
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.userInfo,
    }),
  },
  mounted() {},
  methods: {
    projectDetail() {},
    submit(next) {
      if (this.activeStep == 0) {
        this.loading = true;
        this.$refs["step1"]
          .checkInfo()
          .then((info) => {
            this.loading = false;
            console.log(info);
            this.step1Info = info;
            next.action();
          })
          .catch((err) => {
            this.loading = false;
            console.log(err);
            if (err == "AlreadyExists") {
              this.$buefy.dialog.alert("ProjectName already Exists");
            }
          });
      } else if (this.activeStep == 1) {
        let info = this.$refs["step2"].checkInfo();
        if (!info) {
          return;
        }
        console.log(info);
        this.step2Info = info;
        next.action();
      } else if (this.activeStep == 2) {
        let info = this.$refs["step3"].checkInfo();
        if (!info) {
          return;
        }
        console.log(info);
        this.step3Info = info;
        this.checkInfo = {
          step1Info: this.step1Info,
          step2Info: this.step2Info,
          step3Info: this.step3Info,
        };
        next.action();
      } else if (this.activeStep == 3) {
        let applyInfo = {
          ...this.step2Info,
          capital_detail: this.step3Info,
          memo: this.userInfo.memo,
          tags: [],
          contact_info: [],
          wallet_addr: this.userInfo.owner,
          owner_info: "",
          owner: this.userInfo.owner,
          actual_raised: 100000,
        };
        applyInfo.logo = [];
        applyInfo.trust_by.logo =[];
        applyInfo.roadmap = [];
        applyInfo.team.picture =[];
        this.loading = true;
        this.$daoDao
          .then((daoDao) => {
            console.log("applyInfo:", applyInfo, applyInfo.capital_detail);
            daoDao.modifyProject(applyInfo).then((res) => {
              console.log(res);
              this.loading = false;
              if (res.success == true) {
                next.action();
              }
            });
          })
          .catch((err) => {
            this.loading = false;
            this.$buefy.dialog.alert(err);
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.createDao-page {
  .button-container {
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
  }
  .next-button,
  .prev-button {
    width: 200px;
  }
  .prev-button {
    margin-right: 20px;
  }
}
</style>
