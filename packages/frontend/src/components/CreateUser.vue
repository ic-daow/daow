<template>
  <b-modal
    v-model="isCreateUserActive"
    has-modal-card
    trap-focus
    :destroy-on-hide="false"
  >
    <form action="#">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Register</p>
          <button type="button" class="delete" @click="close" />
        </header>
        <section class="modal-card-body">
          <b-field label="Name">
            <b-input
              type="text"
              v-model="formProps.name"
              placeholder="Your name"
              required
            >
            </b-input>
          </b-field>
          <b-field label="Email">
            <b-input
              type="email"
              v-model="formProps.email"
              placeholder="Your email"
              required
            >
            </b-input>
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <b-button
            label="Register"
            type="is-primary"
            :loading="loading"
            @click="create"
          />
        </footer>
      </div>
    </form>
  </b-modal>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CreateUser",
  data() {
    return {
      loading: false,
      formProps: {
        name: "",
        email: "",
      },
    };
  },
  computed: {
    ...mapState({
      isCreateUserActive: (state) => state.isCreateUserActive,
    }),
  },
  watch: {
    isCreateUserActive() {
      this.formProps.name = "";
      this.formProps.email = "";
    },
  },
  methods: {
    async create() {
      if (this.loading) return;
      this.loading = true;
      try {
        const dao = await this.$daoDao;
        await dao.createUser({
          name: this.formProps.name || "Default User",
          email: this.formProps.email || "default@daow.com",
          memo: "",
        });
        const self = await dao.getSelf();
        console.log("user info", self);
        this.$store.commit("setUserInfo", self);
        this.$store.commit("setIsCreateUserActive", false);
      } catch (e) {
        console.log("create error", e);
        this.$buefy.toast.open({
          duration: 5000,
          message: `Create Error ${e}`,
          position: "is-top",
          type: "is-danger",
        });
      } finally {
        this.loading = false;
      }
    },
    close() {
      this.$store.commit("setIsCreateUserActive", false);
    },
  },
};
</script>

<style scoped></style>
