<template>
  <div class="container">
    <div class="is-primary index-banner">
      <div class="banner-button-box">
        <div class="banner-info">Invest in the future you believe in</div>
        <b-button class="banner-button-button" @click="goto(1)" type="is-link"
          >一键发DAO</b-button
        >
        <b-button class="banner-button-button" @click="goto(2)" type="is-light"
          >IDO.DAO</b-button
        >
      </div>
    </div>
    <div class="container is-fluid">
      <div class="columns index-list is-multiline">
        <div
          class="column is-one-third"
          v-for="(item, index) in itemlist"
          :key="index"
        >
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img :src="item.pic" :alt="item.title" />
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4"><a href="http://" @click="godetail(item.id)">{{ item.title }}</a></p>
                  <p class="subtitle is-6">{{ item.desc }}</p>
                </div>
              </div>
              <div class="content"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DaowActor, IUser, UserErrors } from "@daow/binding";
const daoCid = process.env.VUE_APP_DAO_ID;
const host = process.env.VUE_APP_IC_HOST;
let daoDao, userDao;
export default {
  name: "Index",
  data() {
    return {
      itemlist: [
        {
          id:"asdfasdf",
          title: "Ludus",
          desc: "Web-based tools for the performing arts trusted by 1,000+ organizations",
          pic: "https://uploads.republic.com/p/offerings/card_images/default/000/001/323/1323-1640013134-a7fe1c297ba5d1e1458c202c159f6473cc4bcdb1.jpeg",
        },
         {
          id:"asdfasdf",
          title: "Ludus",
          desc: "Web-based tools for the performing arts trusted by 1,000+ organizations",
          pic: "https://uploads.republic.com/p/offerings/card_images/default/000/001/323/1323-1640013134-a7fe1c297ba5d1e1458c202c159f6473cc4bcdb1.jpeg",
        },
         {
          id:"asdfasdf",
          title: "Ludus",
          desc: "Web-based tools for the performing arts trusted by 1,000+ organizations",
          pic: "https://uploads.republic.com/p/offerings/card_images/default/000/001/323/1323-1640013134-a7fe1c297ba5d1e1458c202c159f6473cc4bcdb1.jpeg",
        },
         {
          id:"asdfasdf",
          title: "Ludus",
          desc: "Web-based tools for the performing arts trusted by 1,000+ organizations",
          pic: "https://uploads.republic.com/p/offerings/card_images/default/000/001/323/1323-1640013134-a7fe1c297ba5d1e1458c202c159f6473cc4bcdb1.jpeg",
        },
         {
          id:"asdfasdf",
          title: "Ludus",
          desc: "Web-based tools for the performing arts trusted by 1,000+ organizations",
          pic: "https://uploads.republic.com/p/offerings/card_images/default/000/001/323/1323-1640013134-a7fe1c297ba5d1e1458c202c159f6473cc4bcdb1.jpeg",
        },
         {
          id:"asdfasdf",
          title: "Ludus",
          desc: "Web-based tools for the performing arts trusted by 1,000+ organizations",
          pic: "https://uploads.republic.com/p/offerings/card_images/default/000/001/323/1323-1640013134-a7fe1c297ba5d1e1458c202c159f6473cc4bcdb1.jpeg",
        }
      ],
    };
  },
  components: {},
  mounted() {
    (async function () {
      daoDao = await new DaowActor().create(daoCid, {
        agentOptions: {
          production: false,
          host,
        },
      });
      let projectset = await daoDao.getListProject({ status: "Enable" });
      console.log(projectset);
    })();
  },
  methods: {
    goto(urlIndex) {
      switch (urlIndex) {
        case 1:
          this.$router.push({ path: "/createDao" });
          break;
        default:
          break;
      }
    },
    godetail(id){
      this.$router.push({ path: "/DAODetail" });
    }
  },
};
</script>

<style scoped>
.banner-button-box {
  position: absolute;
  left: 4rem;
  top: 4rem;
  text-align: left;
}

.banner-button-button {
  margin-left: 0.5rem;
}

.banner-button-box .index-list {
  margin: 0 2rem;
}
.banner-info {
  font-weight: bold;
  text-align: left;
  font-size: 4rem;
  line-height: 4rem;
  margin-bottom: 1rem;
  width: 40rem;
}
.index-banner {
  height: 34rem;
  position: relative;
  background: url(https://assets.republic.com/assets/index/header/default/header-background-325ecafcd1d310a91d9280a0443a45527c0a83d68fe6b8cba46023e1c02b0d75.svg)
    no-repeat;
}
</style>
