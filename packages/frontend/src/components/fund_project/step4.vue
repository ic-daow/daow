<template>
  <div class="step4Page">
    <div class="module">
      <h1 class="title has-text-centered">Project Detail</h1>
      <b-field label="Project Name">
        {{ step2Info.name }}
      </b-field>
      <b-field label="About">
        {{ step2Info.description }}
      </b-field>
       <b-field label="Logo">
        {{ step2Info.logo_id }}
      </b-field>
      <b-field label="Roadmap">
        {{ step2Info.roadmap_id }}
      </b-field>

      <b-field label="Links">
        <section>
          <div class="link-item" v-if="step2Info.linkUrl && step2Info.linkUrl.website">
            Websites: {{ step2Info.linkUrl.website }}
          </div>
          <div class="link-item" v-if="step2Info.linkUrl && step2Info.linkUrl.twitter">
            Twitter: {{  step2Info.linkUrl.twitter }}
          </div>
          <div class="link-item" v-if="step2Info.linkUrl && step2Info.linkUrl.discord">
            Discord: {{ step2Info.linkUrl.discord }}
          </div>
          <div class="link-item" v-if="step2Info.linkUrl && step2Info.linkUrl.medium">
            Midium: {{ step2Info.linkUrl.medium }}
          </div>
        </section>
      </b-field>

      <b-field label="Tokenomics">
        {{ step2Info.tokenomics}}
      </b-field>
      <b-field label="Team">
        {{step2Info.team}}
        <!-- <b-tag
          v-for="(item, index) in step1Info.team"
          :key="index"
          attached
        >
          {{ item }}
        </b-tag> -->
      </b-field>
      <b-field label="Trusted by">
        {{step2Info.trust_by}}
        <!-- <b-tag
          v-for="(item, index) in step1Info.trust_by"
          :key="index"
          attached
        >
          {{ item }}
        </b-tag> -->
      </b-field>
    </div>
    <div class="module">
      <h1 class="title has-text-centered">Capital Detail</h1>
      <h1 class="lable-text">Raise Rule</h1>
      <b-field custom-class="custormField" v-if="step3Info.raise" label="Raise:" horizontal>
        {{ step3Info.raise.amount }}{{ step3Info.raise.currency }}
      </b-field>
      <!-- <b-field class="split" label="Price:" horizontal>
        {{ step2Info.tokenPrice }}{{ step2Info.token1Name }}/{{
          step2Info.token2Name
        }}
      </b-field> -->

      <b-field label="Price($):" horizontal>
        {{ step3Info.price_per_icp }}
      </b-field>
<!-- 
      <b-field label="The token amount I will release:" horizontal>
        {{ step2Info.tokenAmount }}
      </b-field> -->

      <h1 class="lable-text">Release Rule</h1>
      <b-field v-if="step3Info.release" label="Release Method:" horizontal>
        {{ step3Info.release.method }}
      </b-field>
      <b-field v-if="step3Info.release" class="split" label="Release amount per day:" horizontal>
        {{ step3Info.release.amount_per_day }}  / day
      </b-field>
      <b-field v-if="step3Info.release" label="Start Date:" horizontal>
        {{ step3Info.release.start_date }}
      </b-field>
    </div>

    <!-- <div class="module">
      <h1 class="title has-text-centered">Dao Detail</h1>
      <b-field
        v-for="(item, index) in step3Info"
        :key="index"
        :label="'Dao Member' + (index + 1)"
        horizontal
      >
        {{ item }}
      </b-field>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "step4",
  props: {
    checkInfo: Object,
  },
  data() {
    return {
      step1Info: {},
      step2Info: {},
      step3Info: {}
    };
  },
  watch: {
    checkInfo(info) {
      this.step1Info = info.step1Info;
      this.step2Info = info.step2Info;
      this.step3Info = info.step3Info;
    },
  },
  mounted: function () {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.step4Page {
  margin: 40px 40px 30px 40px;
  .module {
    border: 2px solid #eee;
    background-color: #f1f1f1;
    padding: 30px;
    border-radius: 8px;
    margin-top:30px;
  }
}
</style>
