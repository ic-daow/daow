<template>
  <div class="step4Page">
    <div class="module">
      <h1 class="title has-text-centered">Project Detail</h1>
      <b-field label="Project Name">
        <span class="has-text-black">
          {{ step2Info.name }}
        </span>
      </b-field>
      <b-field label="About">
        <span class="has-text-black">
          {{ step2Info.description }}
        </span>
      </b-field>
      <b-field label="Logo">
        <span class="has-text-black">
          {{ step2Info.logo_id }}
        </span>
      </b-field>
      <b-field label="Roadmap">
        <span class="has-text-black">
          {{ step2Info.roadmap_id }}
        </span>
      </b-field>

      <b-field label="Links">
        <section>
          <div
            v-if="step2Info.linkUrl && step2Info.linkUrl.website"
            class="link-item"
          >
            <span class="has-text-black">
              Websites: {{ step2Info.linkUrl.website }}
            </span>
          </div>
          <div
            v-if="step2Info.linkUrl && step2Info.linkUrl.twitter"
            class="link-item"
          >
            <span class="has-text-black">
              Twitter: {{ step2Info.linkUrl.twitter }}
            </span>
          </div>
          <div
            v-if="step2Info.linkUrl && step2Info.linkUrl.discord"
            class="link-item"
          >
            <span class="has-text-black">
              Discord: {{ step2Info.linkUrl.discord }}
            </span>
          </div>
          <div
            v-if="step2Info.linkUrl && step2Info.linkUrl.medium"
            class="link-item"
          >
            <span class="has-text-black">
              Midium: {{ step2Info.linkUrl.medium }}
            </span>
          </div>
        </section>
      </b-field>

      <b-field label="Tokenomics">
        <span class="has-text-black">
          {{ step2Info.tokenomics }}
        </span>
      </b-field>
      <b-field label="Team">
        <span class="has-text-black">
          {{ step2Info.team }}
        </span>
        <!-- <b-tag
          v-for="(item, index) in step1Info.team"
          :key="index"
          attached
        >
          {{ item }}
        </b-tag> -->
      </b-field>
      <b-field label="Trusted by">
        <span class="has-text-black">
          {{ step2Info.trust_by }}
        </span>
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
      <h1 class="title has-text-centered has-text-black">Capital Detail</h1>
      <h1 class="lable-text has-text-black">Raise Rule</h1>
      <b-field
        v-if="step3Info.raise"
        custom-class="custormField"
        horizontal
        label="Raise:"
      >
        <span class="has-text-black">
          {{ step3Info.raise.amount }}{{ step3Info.raise.currency }}
        </span>
      </b-field>
      <!-- <b-field class="split" label="Price:" horizontal>
        {{ step2Info.tokenPrice }}{{ step2Info.token1Name }}/{{
          step2Info.token2Name
        }}
      </b-field> -->

      <b-field horizontal label="Price($):">
        <span class="has-text-black">
          {{ step3Info.price_per_icp }}
        </span>
      </b-field>
      <!--
            <b-field label="The token amount I will release:" horizontal>
              {{ step2Info.tokenAmount }}
            </b-field> -->

      <h1 class="lable-text has-text-black">Release Rule</h1>
      <b-field v-if="step3Info.release" horizontal label="Release Method:">
        <span class="has-text-black">
          {{ step3Info.release.method }}
        </span>
      </b-field>
      <b-field
        v-if="step3Info.release"
        class="split"
        horizontal
        label="Release amount per day:"
      >
        <span class="has-text-black">
          {{ step3Info.release.amount_per_day }} / day
        </span>
      </b-field>
      <b-field v-if="step3Info.release" horizontal label="Start Date:">
        <span class="has-text-black">
          {{ step3Info.release.start_date }}
        </span>
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
    checkInfo: Object
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
    }
  },
  mounted: function() {
  },
  methods: {}
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
    margin-top: 30px;
  }
}
</style>
