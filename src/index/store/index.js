import Vue from 'vue'
import Vuex from 'vuex'
// import API from '../api/api'
Vue.use(Vuex)

import login from './login'
import videoList from './videoList'
export default new Vuex.Store({
  modules: {
    login,
    videoList
  }
})
