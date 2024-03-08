<template>
    <!--사이드바 컴포넌트 자리-->
        <mypageSidebarComponents />
        <router-view />
</template>
<script>

import mypageSidebarComponents from '@/layouts/user/mypageSidebarComponents.vue'

export default {
  name: 'mypageView',
  components: {
    mypageSidebarComponents
  }
}
</script>