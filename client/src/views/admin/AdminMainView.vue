<template>
    <div class="home">
        <Header />
        
        <Sidebar />
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
//   import Header from '@/layouts/HeaderComponent.vue'
//   import Footer from '@/layouts/FooterComponent.vue'
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