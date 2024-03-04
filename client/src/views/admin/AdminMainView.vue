<template>
  <div class="home">
  <nav>
    <router-link to="/admin/review">리뷰</router-link> |
    <router-link to="/admin/delivery">배송</router-link> |
    <router-link to="/admin/notice">test</router-link> |
    <router-link to="/admin/notice/event">이벤트</router-link> |
    <router-link to="/admin">admin</router-link>
  </nav>
  <Header />
  <router-view/>
  <Sidebar />
</div>
  </template>
  
  <script>
  // @ is an alias to /src

    import Sidebar from '@/layouts/admin/SidebarComponent.vue'
    import Header from '@/layouts/admin/HeaderComponent.vue'
  
  export default {
    name: 'HomeView',
    components: {
        Header,
        Sidebar
    }
  }
  </script>
<style>
    @import "../../assets/admin/style.css";
    @import "../../assets/admin/bootstrap.min.css";
</style>