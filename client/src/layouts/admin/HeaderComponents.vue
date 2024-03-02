<template>
<header id="header" class="header fixed-top d-flex align-items-center">
    <div class="d-flex align-items-center justify-content-between">
      <a href="#" class="logo d-flex align-items-center">
        <router-link to="/admin"><img src="../../assets/moon2.png" alt=""></router-link>
        <router-link to="/admin"><span class="d-none d-lg-block">관리자 페이지</span></router-link>
      </a>
    </div>
    <nav class="header-nav ms-auto">
        <a class="nav-item pe-3" href="#" style="font-size: 17px;"><router-link to="/admin">관리자홈 </router-link></a>
        <a class="nav-item pe-3" href="#" style="font-size: 17px;"><router-link to="/"> 쇼핑몰 </router-link></a>
        <a class="nav-item pe-3" href="#" style="font-size: 17px;"> 로그아웃</a>
    </nav>
  </header>
</template>