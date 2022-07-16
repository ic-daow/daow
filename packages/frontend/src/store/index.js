import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {},
    isLoading: false,
    isCreateUserActive: false,
  },
  getters: {},
  mutations: {
    setUserInfo(state, userInfo) {
      console.log("userInfo:", userInfo);
      state.userInfo = userInfo;
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    setIsCreateUserActive(state, active) {
      state.isCreateUserActive = active;
    },
  },
  actions: {},
});
