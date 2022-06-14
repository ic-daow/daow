<template>
  <div class="step1Page">
    <h1 class="title has-text-centered">Project Detail</h1>
    <section>
      <b-field label="Project Name">
        <b-input v-model="proInfo.name" disabled></b-input>
      </b-field>

      <b-field label="About">
        <b-input maxlength="200" v-model="about" type="textarea"> </b-input>
      </b-field>

      <b-field label="Logo">
        <b-field class="file" :class="isLogoUpload ? '' : 'is-primary'">
          <b-upload v-model="logo" class="file-label" :disabled="isLogoUpload">
            <span class="file-cta">
              <b-icon class="file-icon" icon="upload"></b-icon>
              <span class="file-label">{{
                isLogoUpload ? "File is uploading" : "Click to upload"
              }}</span>
            </span>
            <span class="file-name" v-if="logoId">
              {{ logo.name }}
            </span>
          </b-upload>
        </b-field>
      </b-field>

      <b-field label="Roadmap">
        <b-field class="file" :class="isRoadmapUpload ? '' : 'is-primary'">
          <b-upload
            v-model="Roadmap"
            class="file-label"
            :disabled="isRoadmapUpload"
          >
            <span class="file-cta">
              <b-icon class="file-icon" icon="upload"></b-icon>
              <span class="file-label">{{
                isRoadmapUpload ? "File is uploading" : "Click to upload"
              }}</span>
            </span>
            <span class="file-name" v-if="RoadmapId">
              {{ Roadmap.name }}
            </span>
          </b-upload>
        </b-field>
      </b-field>

      <b-field label="Links">
        <section>
          <div class="link-item">
            <b-checkbox
              class="checkbox"
              v-model="checkboxGroup"
              native-value="Websites"
              style="line-height: 40px; flex: 100px 0 0"
            >
              Websites
            </b-checkbox>
            <b-input
              type="text"
              v-model="linkUrl.website"
              placeholder="write here"
              :disabled="checkboxGroup.indexOf('Websites') >= 0 ? false : true"
            ></b-input>
          </div>
          <div class="link-item">
            <b-checkbox
              class="checkbox"
              v-model="checkboxGroup"
              native-value="Twitter"
              style="line-height: 40px"
            >
              Twitter
            </b-checkbox>
            <b-input
              type="text"
              v-model="linkUrl.twitter"
              placeholder="write here"
              :disabled="checkboxGroup.indexOf('Twitter') >= 0 ? false : true"
            ></b-input>
          </div>
          <div class="link-item">
            <b-checkbox
              class="checkbox"
              v-model="checkboxGroup"
              native-value="Discord"
              style="line-height: 40px"
            >
              Discord
            </b-checkbox>
            <b-input
              type="text"
              v-model="linkUrl.discord"
              placeholder="write here"
              :disabled="checkboxGroup.indexOf('Discord') >= 0 ? false : true"
            ></b-input>
          </div>
          <div class="link-item">
            <b-checkbox
              class="checkbox"
              v-model="checkboxGroup"
              native-value="Midium"
              style="line-height: 40px"
            >
              Midium
            </b-checkbox>
            <b-input
              type="text"
              v-model="linkUrl.medium"
              placeholder="write here"
              :disabled="checkboxGroup.indexOf('Midium') >= 0 ? false : true"
            ></b-input>
          </div>
        </section>
      </b-field>

      <b-field label="Tokenomics">
        <!-- <b-taglist>
          <b-tag
            close-type="is-danger"
            closable
            type="is-primary"
            size="is-medium"
            style="cursor: pointer"
            v-if="TokenomicsInfo.name"
            @close="removeTrusted(index)"
            @click="editTrust(index)"
          >
            {{ TokenomicsInfo.name }}
          </b-tag>
        </b-taglist> -->
        <b-button
          type="is-primary"
          size="is-medium"
          @click="isTokenModalActive = true"
          >{{ TokenomicsInfo ? TokenomicsInfo.symbol : "click to set" }}
        </b-button>
      </b-field>
      <b-field label="Team">
        <b-taglist>
          <b-tag
            v-for="(item, index) in teamList"
            :key="index"
            close-type="is-danger"
            closable
            type="is-primary"
            size="is-medium"
            @close="removeTeam(index)"
            @click="editTeam(index)"
            style="cursor: pointer"
          >
            {{ item.name }}
          </b-tag>
        </b-taglist>
        <b-button
          type="is-primary"
          size="is-medium"
          @click="editTeam(-1)"
          v-if="teamList.length == 0"
          >Add</b-button
        >
        <!-- <b-tag
          style="margin-left: 20px; cursor: pointer"
          type="is-success"
          size="is-medium"
          @click="editTeam(-1)"
          v-if="teamList.length == 0"
          >Add</b-tag
        > -->
      </b-field>
      <b-field label="Trusted by">
        <b-taglist>
          <b-tag
            v-for="(item, index) in TrustedList"
            :key="index"
            close-type="is-danger"
            closable
            type="is-primary"
            size="is-medium"
            style="cursor: pointer"
            @close="removeTrusted(index)"
            @click="editTrust(index)"
          >
            {{ item.name }}
          </b-tag>
        </b-taglist>
        <b-button
          type="is-primary"
          size="is-medium"
          @click="editTrust(-1)"
          v-if="TrustedList.length == 0"
          >Add</b-button
        >
        <!-- <b-tag
          style="margin-left: 20px; cursor: pointer"
          type="is-success"
          size="is-medium"
          @click="editTrust(-1)"
          v-if="TrustedList.length == 0"
          >Add</b-tag
        > -->
      </b-field>
    </section>

    <b-modal
      v-model="isTokenModalActive"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-label="Token Modal"
      close-button-aria-label="Close"
      aria-modal
    >
      <template #default="props">
        <Tokenomics
          @close="props.close"
          @updateTokenomics="updateTokenomics"
        ></Tokenomics>
      </template>
    </b-modal>

    <b-modal
      v-model="isTeamModalActive"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-label="Team Modal"
      close-button-aria-label="Close"
      aria-modal
    >
      <template #default="props">
        <Team
          @close="props.close"
          :infoObject="teamObject"
          :index="teamIndex"
          @updateTeams="updateTeams"
        >
        </Team>
      </template>
    </b-modal>

    <b-modal
      v-model="isTrustedModalActive"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-label="Trusted Modal"
      close-button-aria-label="Close"
      aria-modal
    >
      <template #default="props">
        <Trusted
          @close="props.close"
          :infoObject="trustedObject"
          :index="trustedIndex"
          @updateTrusted="updateTrusted"
        ></Trusted>
      </template>
    </b-modal>
  </div>
</template>

<script>
import Tokenomics from "@/components/fund_project/Tokenomics.vue";
import Team from "@/components/fund_project/team.vue";
import Trusted from "@/components/fund_project/trusted.vue";
import { mapState } from "vuex";
export default {
  name: "step1",
  props: {
    proInfo: Object,
  },
  components: {
    Tokenomics,
    Team,
    Trusted,
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.userInfo,
    }),
  },
  data() {
    return {
      about: "",
      isTokenModalActive: false,
      isTeamModalActive: false,
      isTrustedModalActive: false,

      linkUrl: {
        website: "",
        twitter: "",
        discord: "",
        medium: "",
      },

      Roadmap: null,
      RoadmapId: "",
      isRoadmapUpload: false,
      logo: null,
      logoId: "",
      isLogoUpload: false,
      checkboxGroup: ["Websites"],
      TokenomicsInfo: null,
      teamList: [],
      teamObject: {},
      teamIndex: "",
      TrustedList: [],
      trustedObject: {},
      trustedIndex: "",
    };
  },
  mounted: function () {},
  watch: {
    Roadmap(val) {
      if (val) {
        this.isRoadmapUpload = true;
        this.$uploadPicture(val, "roadmap")
          .then((res) => {
            this.isRoadmapUpload = false;
            console.log(res);
            if (res && res.id) {
              this.RoadmapId = res.id;
            }
          })
          .catch((err) => {
            this.isRoadmapUpload = false;
            console.log(err);
          });
      }
    },
    logo(val) {
      if (val) {
        this.isLogoUpload = true;
        this.$uploadPicture(val, "logo")
          .then((res) => {
            this.isLogoUpload = false;
            console.log(res);
            if (res && res.id) {
              this.logoId = res.id;
            }
          })
          .catch((err) => {
            this.isLogoUpload = false;
            console.log(err);
          });
      }
    },
  },
  methods: {
    updateTokenomics(info) {
      this.TokenomicsInfo = info;
    },
    editTeam(index) {
      if (index >= 0) {
        this.teamIndex = index;
        this.teamObject = this.teamList[index];
      } else {
        this.teamObject = {};
      }
      this.isTeamModalActive = true;
    },
    updateTeams(info) {
      if (info.isEdit) {
        this.teamList[info.index] = info.data;
      } else {
        this.teamList.push(info.data);
      }
    },
    removeTeam(index) {
      this.teamList.splice(index, 1);
    },
    editTrust(index) {
      if (index >= 0) {
        this.trustedIndex = index;
        this.trustedObject = this.TrustedList[index];
      } else {
        this.trustedObject = {};
      }
      this.isTrustedModalActive = true;
    },
    updateTrusted(info) {
      if (info.isEdit) {
        this.TrustedList[info.index] = info.data;
      } else {
        this.TrustedList.push(info.data);
      }
    },
    removeTrusted(index) {
      this.TrustedList.splice(index, 1);
    },
    checkInfo() {
      let links = [];
      if (this.linkUrl.website) {
        links.push(this.linkUrl.website);
      }
      if (this.linkUrl.twitter) {
        links.push(this.linkUrl.twitter);
      }
      if (this.linkUrl.discord) {
        links.push(this.linkUrl.discord);
      }
      if (this.linkUrl.medium) {
        links.push(this.linkUrl.medium);
      }
      if (
        links.length == 0 ||
        !this.logoId ||
        !this.RoadmapId ||
        !this.TokenomicsInfo.symbol ||
        this.teamList.length == 0 ||
        this.TrustedList.length == 0
      ) {
        this.$buefy.dialog.alert("Please fill the field");
        return;
      }
      return {
        id: this.proInfo.id,
        logo_id: this.logoId,
        logo: [],
        name: this.proInfo.name,
        description: this.about,
        linkUrl: this.linkUrl,
        links: links,
        roadmap: [],
        roadmap_id: this.RoadmapId,
        tokenomics: this.TokenomicsInfo,
        team: this.teamList[0],
        trust_by: this.TrustedList[0],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.step1Page {
  margin: 40px 40px 30px 40px;
  border: 2px solid #eee;
  background-color: #f7f7f7;
  padding: 30px;
  border-radius: 8px;
  .title {
    margin-top: 20px;
  }

  .link-item {
    display: flex;
    justify-content: start;
    margin-bottom: 15px;

    .checkbox {
      flex: 100px 0 0;
    }
  }
}
</style>
