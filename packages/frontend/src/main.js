import Vue from "vue";
import App from "./App.vue";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import VueCountdown from '@chenfengyuan/vue-countdown'
import router from "@/route";
import store from "@/store/index";
import { library } from "@fortawesome/fontawesome-svg-core";
// internal icons
import {
  faCheck,
  faCheckCircle,
  faInfoCircle,
  faExclamationTriangle,
  faExclamationCircle,
  faArrowUp,
  faAngleRight,
  faAngleLeft,
  faAngleDown,
  faTruckLoading,
  faBell,
  faGlasses,
  faEye,
  faEyeSlash,
  faCaretDown,
  faCaretUp,
  faUpload,
  fas,
  faHome,
  faAdd,
  faCode,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faCheck,
  faCheckCircle,
  faInfoCircle,
  faExclamationTriangle,
  faExclamationCircle,
  faArrowUp,
  faAngleRight,
  faAngleLeft,
  faAngleDown,
  faTruckLoading,
  faBell,
  faGlasses,
  faEye,
  faEyeSlash,
  faCaretDown,
  faCaretUp,
  faUpload,
  fas,
  faHome,
  faAdd,
  faCode
);
Vue.component("vue-fontawesome", FontAwesomeIcon);

Vue.use(Buefy, {
  defaultIconComponent: "vue-fontawesome",
  defaultIconPack: "fas",
});
import { DaowActor, PictureActor } from "@daow/binding";
import $config from "./config.js";
Vue.$config = $config;
Vue.prototype.$config = $config;
Vue.component(VueCountdown.name, VueCountdown)

let initDao = async function () {
  const production = process.env.NODE_ENV === "production";
  let daoDao = new DaowActor().create($config.cid, {
    agentOptions: {
      production: production,
      host: $config.host,
      whitelist: [$config.cid],
    },
    agentType: production ? "plug" : "anonymous",
  });

  Vue.prototype.$daoDao = daoDao;
  Vue.$daoDao = daoDao;

  let picActor = new PictureActor().create($config.pid, {
    agentOptions: {
      production: production,
      host: $config.host,
      whitelist: [$config.cid],
    },
    agentType: production ? "plug" : "anonymous",
  });
  Vue.prototype.$picActor = picActor;
  Vue.$picActor = picActor;
};
initDao();

function uploadPicture(file, desc) {
  return new Promise((resolve, reject) => {
    const { name, type } = file;
    Vue.$picActor
      .then((actor) => {
        return actor.createPicture({
          name,
          description: desc,
          owner: store.state.userInfo.owner || "test",
          picture: { type, buffer: file },
        });
      })
      .then(resolve)
      .catch(reject);
  });
}
Vue.prototype.$uploadPicture = uploadPicture;
Vue.$uploadPicture = uploadPicture;

// ipt.addEventListener("change", async function (event) {
// 	let urls = await fileChange(event);
// 	console.log(urls);
// });
function bufferToImage(buffer) {
  let bytes = new Uint8Array(buffer);
  let data = "";
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    data += String.fromCharCode(bytes[i]);
  }
  return "data:image/png;base64," + window.btoa(data);
}

Vue.prototype.$bufferToImage = bufferToImage;
Vue.$bufferToImage = bufferToImage;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
