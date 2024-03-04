<template>
  <div>
  <Header />
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/admin">admin</router-link> |
    <router-link to="/about">About</router-link> | 
    <router-link to="/product">상품목록</router-link> |
    <router-link to="/cart">cart</router-link> |
    <router-link to="/login">로그인 화이팅화이팅!!</router-link> |
    <router-link to="/userJoin">회원가입 힘내힘내!!</router-link>
  </nav>
  <router-view :key="$route.fullPath"/>
  <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
// import Header from '@/components/HeaderComponent.vue'

import Header from '@/layouts/user/HeaderComponent.vue'
import Footer from '@/layouts/user/FooterComponent.vue'


export default {
  name: 'HomeView',
  components: {
    Header,
    Footer
  }
}
</script>
<style>
@import '../../assets/user/style.default.css';

  #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
