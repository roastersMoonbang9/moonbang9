<template>
  <div>
    <head>
      <!-- Icon Font Stylesheet -->
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css"
        rel="stylesheet"
      />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css"
        rel="stylesheet"
      />

    </head>
    <Header />
    <div class="container">
      <router-view :key="$route.fullPath"/>
    </div>
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
