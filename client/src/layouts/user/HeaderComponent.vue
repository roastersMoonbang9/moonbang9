<template>
    <header class="header bg-white" >
      <!-- style="height: 150px;" -->
        <div class="container px-lg-3">
          
          <nav class="navbar navbar-expand-lg navbar-light py-3 px-lg-0">
            <!-- <router-link to="/" class="nav-link active">
              <img src="/moonbang9_2.png" style="width: 120px;">
            </router-link> -->
            <button class="navbar-toggler navbar-toggler-end" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              
              <router-link to="/" class="nav-link active"><a class="navbar-brand" href="#">

              <span class="fw-bold text-uppercase text-dark">MOONBANGKU</span></a></router-link>

              <ul class="navbar-nav me-auto">
                <li class="nav-item">
                  <!-- Link--><router-link to="/" class="nav-link active">Home</router-link>
                </li>
                <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" id="pagesDropdown" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">PRODUCT</a>
                  <div class="dropdown-menu mt-3 shadow-sm" aria-labelledby="pagesDropdown">
                    <button class="dropdown-item border-0 transition-link" @click="goToList('A')">다이어리</button>
                    <button class="dropdown-item border-0 transition-link" @click="goToList('B')">노트</button>
                    <button class="dropdown-item border-0 transition-link" @click="goToList('C')">필기류</button>
                    <button class="dropdown-item border-0 transition-link" @click="goToList('D')">사무용품</button>
                    <button class="dropdown-item border-0 transition-link" @click="goToList('E')">데코레이션</button>
                  </div>
                </li>
                
              </ul>
              <ul class="navbar-nav ms-auto">               
                <li v-if="isLogin" class="nav-item"><p class="nav-link" >{{ this.$store.state.userStore.name }}님</p></li>
                <li v-else class="nav-item"><p class="nav-link"></p></li>
                
                <li v-if="mem_status=='1'" class="nav-item"><router-link to="/admin/memberList"><p class="nav-link" >관리자홈</p></router-link></li>
                <li class="nav-item"><a class="nav-link"  @click="goToCart"> <i class="fas fa-dolly-flatbed me-1 text-gray"></i>Cart<small class="text-gray fw-normal"></small></a></li>
                <li v-if="isLogin" class="nav-item"><a class="nav-link" href="/myPage"> <i class="fas fa-user me-1 text-gray fw-normal"></i>마이페이지</a></li> <!--정보수정창으로 넘어감-->
                <li v-else class="nav-item"><a class="nav-link" href="/userJoin"> <i class="fas fa-user me-1 text-gray fw-normal"></i>회원가입</a></li>
                <li v-if="isLogin" class="nav-item"><a class="nav-link" @click="handleLogout"> <i class="fas fa-user me-1 text-gray fw-normal"></i>로그아웃</a></li>
                <li v-else class="nav-item"><a class="nav-link" href="/login"> <i class="fas fa-user me-1 text-gray fw-normal"></i>로그인</a></li>              
              </ul>      
            </div>
          </nav>
        </div>
    </header>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex'; // Vuex store 사용

export default {
  setup() {
    const store = useStore();
    const isLogin = computed(() => store.state.userStore.isLogin);
    const mem_status = computed(() => store.state.userStore.mem_status);
    return {
      isLogin,
      mem_status
    };
  },
   data () {
      return {
        large_code : null,
        small_code : null
      }
    },
    methods : {
      handleLogout() {
        this.$store.commit('userStore/logout'); 
        alert("로그아웃 되었습니다.");
        this.$router.push('/login');
    },
      goToList(large) {
        this.large_code = large;
        this.$router.push({ path : '/product', query : { 'large_code' : this.large_code }})
      },
      goToCart(){
        if(this.isLogin){
          this.$router.push({ path : '/cart'})
        }else{
          Swal.fire("로그인 후 이용해주세요.");
          this.$router.push({ path : '/login'})
        }
      }
    }
}
</script>
