import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    modal:{
      login:false,
      register:false
    },
    loginData:{
      id:sessionStorage.getItem("id") ? sessionStorage.getItem("id") : false,
      auth:sessionStorage.getItem("auth") ? sessionStorage.getItem("auth") : false,
      name:sessionStorage.getItem("name") ? sessionStorage.getItem("name") : false
    }
  },
  mutations: {
    SET_LOGIN_MODAL(state,data){
      state.modal.register=false;
      state.modal.login = data;
    },
    SET_REGISTER_MODAL(state,data){
      state.modal.login=false;
      state.modal.register = data;
    },
    SET_LOGIN_DATA(state,data){
      state.loginData = data;
    }
  },
  actions: {
  },
  modules: {
  }
})
