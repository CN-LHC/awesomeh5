import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store/index'
import requests from '../api/request'   

Vue.config.productionTip = false;

import API from "@/api/api";
Vue.prototype.API = API;

import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");

Vue.prototype.$http = requests.requests;
Vue.prototype.$moment = moment;

//创建全局 event bus
var EventBus = new Vue();
Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return EventBus;
    }
  }
});

//自定义皮肤
import "./theme/index.css";

new Vue({
  router,
  store,
  // mixins: [inEffect],
  render: h => h(App)
}).$mount("#app");