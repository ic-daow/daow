<template>
  <b-navbar class="index-navbar">
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <span class="logo">Dworld</span>
      </b-navbar-item>
    </template>
    <template #end>
      <b-navbar-item href="#" @click="stayTune">Community</b-navbar-item>
      <b-navbar-item href="#" @click="stayTune">Governance</b-navbar-item>
      <b-navbar-item href="#" @click="stayTune">Loan</b-navbar-item>
      <b-navbar-item href="#" @click="stayTune">Hosting</b-navbar-item>
      <b-navbar-item>
        <b-button class="pink-button" :disabled="true">Launch App</b-button>
      </b-navbar-item>
      <b-navbar-item tag="div">
        <b-button class="pink-button" :loading="loading" @click="connect">{{
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

  .navbar-item, .navbar-link{
    color: #fff !important;
  }
  .navbar-item, .navbar-link:hover{
    background-color: transparent !important;
  }
  .logo {
    font-weight: 600;
    color: #fff;
    font-size: 20px;
    letter-spacing: 2px;
    margin-left: 40px;
  }
  .pink-button{
    color: white;
    background-color: rgb(240, 10, 148);
  }
}
</style>
