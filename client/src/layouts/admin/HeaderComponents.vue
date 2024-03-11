<template>
<header id="header" class="header fixed-top d-flex align-items-center">
    <div class="d-flex align-items-center justify-content-between">
      <router-link to="/admin/memberList"><img v-bind:src="'../img/moon2.png'" alt="" style="width: 70px;"></router-link>
      <a href="#" class="logo d-flex align-items-center">
        <router-link to="/admin/memberList"><span class="d-none d-lg-block">관리자 페이지</span></router-link>
      </a>
    </div>
    <nav class="header-nav ms-auto">
        <a class="nav-item pe-3" href="#" style="font-size: 17px;"><router-link to="/admin/memberList">관리자홈 </router-link></a>
        <a class="nav-item pe-3" href="#" style="font-size: 17px;"><router-link to="/"> 쇼핑몰 </router-link></a>
        <a class="nav-item pe-3" href="#" style="font-size: 17px;" @click="handleLogout()"> 로그아웃</a>
    </nav>
  </header>
</template>
<script>
  export default {
    methods : {
      handleLogout() {
        this.$store.commit('userStore/logout'); 
        alert("로그아웃 되었습니다.");
        this.$router.push('/login');
      }
    }
  }
</script>