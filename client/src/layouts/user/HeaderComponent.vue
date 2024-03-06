<template>
    <header class="header bg-white" height="150px">
        <div class="container px-lg-3">
          <nav class="navbar navbar-expand-lg navbar-light py-3 px-lg-0">
            <router-link to="/" class="nav-link active"><img src="/moonbang9_2.png" style="width: 120px;"></router-link>
            <button class="navbar-toggler navbar-toggler-end" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto">
                <li class="nav-item">
                  <!-- Link--><router-link to="/" class="nav-link active">Home</router-link>
                </li>
                <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" id="pagesDropdown" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">다이어리</a>
                  <div class="dropdown-menu mt-3 shadow-sm" aria-labelledby="pagesDropdown">
                    <button class="dropdown-item border-0 transition-link" @click="goToList('A', 'A')">다이어리</button>
                    <button class="dropdown-item border-0 transition-link" @click="goToList('A', 'B')">플래너</button>
                    <button class="dropdown-item border-0 transition-link" @click="goToList('A', 'C')">달력</button>
                  </div>
                </li>
                <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" id="pagesDropdown" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">노트</a>
                  <div class="dropdown-menu mt-3 shadow-sm" aria-labelledby="pagesDropdown">
                    <button class="dropdown-item border-0 transition-link" @click="goToList('B', 'A')">베이직노트</button>
                    <button class="dropdown-item border-0 transition-link" @click="goToList('B', 'B')">양장노트</button>
                    <button class="dropdown-item border-0 transition-link" @click="goToList('B', 'C')">스프링노트</button>
                    <button class="dropdown-item border-0 transition-link" @click="goToList('B', 'D')">수첩</button>
                    <button class="dropdown-item border-0 transition-link" @click="goToList('B', 'E')">메모지</button>
                  </div>
                </li>
                <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" id="pagesDropdown" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">필기류</a>
                  <div class="dropdown-menu mt-3 shadow-sm" aria-labelledby="pagesDropdown">
                    <button class="dropdown-item border-0 transition-link" @click="goToList('C', 'A')">연필</button>
                    <button class="dropdown-item border-0 transition-link" @click="goToList('C', 'B')">펜</button>
                    <button class="dropdown-item border-0 transition-link" @click="goToList('C', 'C')">형광펜</button>
                    <button class="dropdown-item border-0 transition-link" @click="goToList('C', 'D')">지우개</button>
                  </div>
                </li>
                <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" id="pagesDropdown" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">사무용품</a>
                  <div class="dropdown-menu mt-3 shadow-sm" aria-labelledby="pagesDropdown">
                    <button class="dropdown-item border-0 transition-link" @click="goToList('D', 'A')">복사용지</button>
                    <button class="dropdown-item border-0 transition-link" @click="goToList('D', 'B')">필통</button>
                    <button class="dropdown-item border-0 transition-link" @click="goToList('D', 'C')">가위</button>
                    <button class="dropdown-item border-0 transition-link" @click="goToList('D', 'D')">계산기</button>
                    <button class="dropdown-item border-0 transition-link" @click="goToList('D', 'E')">풀</button>
                  </div>
                </li>
                <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" id="pagesDropdown" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">데코레이션</a>
                  <div class="dropdown-menu mt-3 shadow-sm" aria-labelledby="pagesDropdown">
                    <button class="dropdown-item border-0 transition-link" @click="goToList('E', 'A')">스티커</button>
                    <button class="dropdown-item border-0 transition-link" @click="goToList('E', 'B')">스탬프</button>
                    <button class="dropdown-item border-0 transition-link" @click="goToList('E', 'C')">테이프</button>
                    <button class="dropdown-item border-0 transition-link" @click="goToList('E', 'D')">포스터</button>
                  </div>
                </li>
              </ul>
              <ul class="navbar-nav ms-auto">               
                <li class="nav-item"><a class="nav-link" href="cart.html"> <i class="fas fa-dolly-flatbed me-1 text-gray"></i>Cart<small class="text-gray fw-normal">(2)</small></a></li>
                <li class="nav-item"><a class="nav-link" href="#!"> <i class="far fa-heart me-1"></i><small class="text-gray fw-normal"> (0)</small></a></li>
                <li v-if="isLogin" class="nav-item"><a class="nav-link" href="/"> <i class="fas fa-user me-1 text-gray fw-normal"></i>마이페이지</a></li>
                <li v-else class="nav-item"><a class="nav-link" href="/userJoin"> <i class="fas fa-user me-1 text-gray fw-normal"></i>회원가입</a></li>
                <li v-if="isLogin" class="nav-item"><a class="nav-link" href="/logout"><i class="fas fa-user me-1 text-gray fw-normal"></i>로그아웃</a></li>
                <li v-else class="nav-item"><a class="nav-link" href="/login"><i class="fas fa-user me-1 text-gray fw-normal"></i>로그인</a></li>                
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
    const isLogin = computed(() => store.state.isLogin);

    return {
      isLogin
    };
  },
   data () {
      return {
        large_code : null,
        small_code : null
      }
    },
    methods : {
      goToList(large, small) {
        this.large_code = large;
        this.small_code = small;
        this.$router.push({ path : '/product', query : { 'large_code' : this.large_code , 'small_code' : this.small_code }})
      }
    }
}
</script>
