<template>
  <div class="home">
    <Header />

    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/layouts/HeaderComponent.vue'
// import Header from '@/components/HeaderComponent.vue'

import Footer from '@/layouts/FooterComponent.vue'


export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    Header,
    Footer
  }
}
</script>
