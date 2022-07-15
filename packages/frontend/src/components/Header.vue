<template>
  <b-navbar class="index-navbar">
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <span class="logo">DAOWORLD</span>
      </b-navbar-item>
    </template>
    <template #end>
      <b-navbar-item tag="div">
        <b-button type="is-primary" :loading="loading">{{ userText }}</b-button>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: "Header",
  props: {
    msg: String,
  },
  data() {
    return {
      userText: "Connect",
      loading: false,
    };
  },
  mounted() {
    this.initUser();
  },
  methods: {
    async initUser() {
      try {
        this.loading = true;
        this.$daoDao
          .then((daoDao) => {
            return daoDao.getSelf();
          })
          .then((userDao) => {
            this.loading = false;
            console.log("get user info", userDao);
            this.userText = userDao.name;
            this.$store.commit("setUserInfo", userDao);
          })
          .catch((err) => {
            this.loading = false;
            if (err == "NotFound") {
              this.createUser();
            }
          });
      } catch (err) {
        console.log("get err info", err);
        if (err == "NotFound") {
          this.createUser();
        }
      }
    },
    createUser() {
      this.$daoDao
        .then((daoDao) => {
          return daoDao.createUser({
            name: "Default User",
            email: "default@daow.com",
            memo: "",
          });
        })
        .then((_userDao) => {
          return _userDao.getSelf();
        })
        .then((userDao) => {
          console.log("get user info", userDao);
          this.$store.commit("setUserInfo", userDao);
          this.userText = userDao.name;
        });
    },
    goto(urlIndex) {},
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
