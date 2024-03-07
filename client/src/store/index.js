// index.js

import { createStore } from 'vuex'
import persistedstate from 'vuex-persistedstate';
import userStore from '@/store/modules/userStore.js'

const store = createStore({

  plugin: [
    persistedstate({
      paths: ['userStore']
    })
  ],
  modules: {
    userStore: userStore
  }
})

export default store;
