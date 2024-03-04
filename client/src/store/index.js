// index.js

import { createStore } from 'vuex'
import persistedstate from 'vuex-persistedstate';

const store = createStore({
  state() {
    return {
      id: "",
      isLogin: false,
      mem_no:'',
      name:''

    }
  },
  mutations: {
    user(state, data) {
      state.id = data.id;
      state.isLogin = data.isLogin;
      state.mem_no = data.mem_no;
      state.name = data.name;
    },
        
  },

  plugin: [
    persistedstate({
      paths: ['user']
    })
  ],

  actions: {
  },
  modules: {
  }
})

export default store;
