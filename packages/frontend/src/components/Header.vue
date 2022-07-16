<template>
  <b-navbar class="index-navbar">
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <span class="logo">DAOWORLD</span>
      </b-navbar-item>
    </template>
    <template #end>
      <b-navbar-item href="#" @click="stayTune">Community</b-navbar-item>
      <b-navbar-item href="#" @click="stayTune">Governance</b-navbar-item>
      <b-navbar-item href="#" @click="stayTune">Loan</b-navbar-item>
      <b-navbar-item href="#" @click="stayTune">Hosting</b-navbar-item>
      <b-navbar-item tag="div">
        <b-button type="is-primary" :loading="loading" @click="connect">{{
          userInfo.name || "Connect"
        }}</b-button>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import { mapState } from "vuex";
import { UserErrors } from "@daow/binding";

export default {
  name: "Header",
  props: {
    msg: String,
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.userInfo,
    }),
  },
  mounted() {
    if (localStorage.getItem("connected") === "1") {
      this.connect();
    }
  },
  methods: {
    async connect() {
      if (this.loading) return;
      this.loading = true;
      try {
        const dao = await this.$daoDao;
        const self = await dao.getSelf();
        console.log("get user info", self);
        this.$store.commit("setUserInfo", self);
        localStorage.setItem("connected", "1");
      } catch (e) {
        if (e === UserErrors.NotFound) {
          this.$store.commit("setIsCreateUserActive", true);
        }
        console.log("connect error", e);
      } finally {
        this.loading = false;
      }
    },
    goto(urlIndex) {},
    stayTune() {
      this.$buefy.toast.open("Stay tuned");
    },
  },
};
</script>

<style lang="scss" scoped>
.index-navbar {
  margin-bottom: 2rem;
  .logo {
    font-weight: 600;
    color: #7957d5;
    font-size: 20px;
  }
}
</style>
