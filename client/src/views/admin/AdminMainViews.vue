<template>
    <div class="home">
    <Header />
    <main id="main" class="main">
    <router-view/>
    </main>
    <Sidebar />
    <Footer />

  </div>
    </template>
    
    <script>
    // @ is an alias to /src
  
      import Sidebar from '@/layouts/admin/SidebarComponents.vue'
      import Header from '@/layouts/admin/HeaderComponents.vue'
      import Footer from '@/layouts/admin/FooterComponent.vue';
    
    export default {
      name: 'HomeView',
      components: {
        Header,
        Sidebar,
        Footer
        }
    }
    </script>
  <style>
      @import "../../assets/style.css";
  </style>