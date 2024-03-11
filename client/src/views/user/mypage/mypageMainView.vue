<template>
  <!--사이드바 컴포넌트 자리-->
  <div class="twse">
    <mypageSidebarComponents />
    <div class="twse2">
    <router-view />
    </div>
  </div>
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

<style>
.twse{
  height: 1600px;
  display: flex;
}
.twse2{
  width: 100%;
}
</style>