<template>
  <div class="container">
    <div class="is-primary index-banner">
      <div class="banner-button-box">
        <div class="banner-title">Invest in the future you believe in</div>
        <b-button class="banner-button-button pink-button" @click="goto(1)" type="is-link"
          >Create DAO</b-button
        >
        <b-button class="banner-button-button pink-button" :disabled="true"
          >DAOW</b-button
        >
      </div>
    </div>
    <div class="container is-fluid">
      <div class="columns index-list is-multiline">
        <div
          class="column is-one-third"
          v-for="(item, index) in projectList"
          :key="index"
        >
          <div class="card" @click="godetail(item.id)">
            <div class="card-image">
              <figure class="image is-4by3 b-image-wrapper">
                <img :src="item.logo" :alt="item.name" />
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4">
                    <a href="javascript:;" >{{
                      item.name
                    }}</a>
                  </p>
                  <p class="subtitle is-6">{{ item.description }}</p>
                </div>
              </div>
              <div class="content"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-notification
      style="min-height: 100px"
      v-if="projectList.length == 0"
      :closable="false"
    >
      <b-loading
        :is-full-page="false"
        v-model="isLoading"
        :can-cancel="true"
      ></b-loading>
    </b-notification>
    <create-user />
  </div>
</template>

<script>
import { mapState } from "vuex";
import CreateUser from "@/components/CreateUser";

export default {
  name: "Index",
  data() {
    return {
      projectList: [],
      isLoading: true,
    };
  },
  components: {
    CreateUser
  },
  mounted() {
    if(this.userInfo){
      this.getListProject();
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.userInfo,
    }),
  },
  watch: {
    userInfo() {
      this.getListProject();
    },
  },
  methods: {
    getListProject() {
      this.$daoDao
        .then((daoDao) => {
          return daoDao.getListProject({ status: "Enable" });
        })
        .then((projectset) => {
          console.log(projectset);
          this.isLoading = false;
          this.projectList = projectset.data;
          this.formateInfo();
        })
        .catch((err) => {
          this.isLoading = false;
          console.error(err);
        });
    },
    formateInfo() {
      this.$picActor.then((picActor) => {
        this.projectList.forEach((item) => {
          picActor
            .getPicture(item.logo_id)
            .then((logoInfo) => {
              if (logoInfo && logoInfo.data.buffer) {
                console.log(logoInfo);
                item.logo = this.$bufferToImage(logoInfo.data.buffer);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        });
      });
    },
    goto(urlIndex) {
      switch (urlIndex) {
        case 1:
          this.$router.push({ path: "/createDao" });
          break;
        default:
          break;
      }
    },
    godetail(id) {
      this.$router.push({ path: "/DAODetail", query:{id: id} });
    },
  },
};
</script>

<style scoped>
.banner-button-box {
  position: absolute;
  left: 4rem;
  padding-top: 4rem;
  /* top: 4rem; */
  text-align: left;
  background-color: rgba(0,0,0,0.5);
  width: 100%;
  height: 100%;
}

.banner-button-button {
  margin-left: 0.5rem;
}
.pink-button{
  color: white;
  background-color: rgb(240, 10, 148);
}

.banner-button-box .index-list {
  margin: 0 2rem;
}
.banner-title {
  font-weight: bold;
  text-align: left;
  font-size: 2rem;
  line-height: 4rem;
  margin-bottom: 1rem;
}
.banner-info {
  font-weight: bold;
  text-align: left;
  font-size: 1rem;
  line-height: 4rem;
  margin-bottom: 1rem;
  width: 40rem;
  margin-top: 1rem;
}
.index-banner {
  height: 30rem;
  position: relative;
  background: url(https://assets.republic.com/assets/index/header/default/header-background-325ecafcd1d310a91d9280a0443a45527c0a83d68fe6b8cba46023e1c02b0d75.svg)
    no-repeat;
    background-position: 80% 100%;
}
</style>
