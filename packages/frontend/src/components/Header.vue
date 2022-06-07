<template>
  <b-navbar class="index-navbar">
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img
          src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
          alt="Bulma"
        />
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item href="#"> Home </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ path: '/IDO' }">
        IDO
      </b-navbar-item>
      <b-navbar-dropdown label="DAO">
        <b-navbar-item href="#"> 托管DAO </b-navbar-item>
        <b-navbar-item href="#"> 自治DAO </b-navbar-item>
      </b-navbar-dropdown>
      <b-navbar-item href="#"> 白皮书 </b-navbar-item>
      <b-navbar-item href="#"> 审计 </b-navbar-item>
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-primary">
            <strong>{{userText}}</strong>
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import { DaowActor, IUser, UserErrors } from "@daow/binding";
const daoCid = process.env.VUE_APP_DAO_ID;
const host = process.env.VUE_APP_IC_HOST;
let daoDao, userDao;
export default {
  name: "Header",
  props: {
    msg: String,
  },
  data(){
	  return {
		  userText:'Connect'
	  }
  },
  mounted: function () {
	  let that=this;
    (async function () {
      console.log("check user");
      daoDao = await new DaowActor().create(daoCid, {
        agentOptions: {
          production: false,
          host,
        },
      });
	  console.log("connect server");
      try {
        userDao = await daoDao.getSelf();
		console.log("get user info",userDao);
		that.userText=userDao.name;
      } catch (err) {
		  console.log("get err info",err);
        if (err === UserErrors.NotFound) {
          await daoDao.createUser({
            name: "张三",
            email: "zhangsan@dao.com",
            memo: "",
          });
          userDao = await daoDao.getSelf();
          console.log(userDao);
        }
      }
    })();
  },
  methods: {
    goto(urlIndex) {},
  },
};
</script>

<style>
.index-navbar {
  margin-bottom: 2rem;
}
</style>
