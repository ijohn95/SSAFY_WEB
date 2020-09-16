import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginData: sessionStorage.getItem("id") ? sessionStorage.getItem("id") : false
  },
  mutations: {
    // state를 변경할 때 mutation 을 활용
    SET_LOGIN_DATA(state,data){
      state.loginData = data;
    }
  },
  actions: {
  },
  modules: {
  }
})
